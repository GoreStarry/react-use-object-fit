import { useRef, useState, useEffect, useCallback } from "react";

/**
 * @param {object} {
 *   type, // "cover", "contain"
 *   imgUrl,
 *   container: {
 *      ref, // get container size by React ref
 *      dom, // get container size by Dom elm
 *      width, // directly give container size
 *      height
 *   },
 * }
 * @return {object} {
 *    width, // object fit width
 *    height, // object fit hight
 *    offsetX, // object fit offsetX
 *    offsetY, // object fit offsetY
 *    imgWidth,
 *    imgHeight,
 *    imgRatio, // origin image imgRatio
 *    containerWidth,
 *    containerHeight,
 * }
 */
const useObjectFit = ({
  type,
  imgUrl,
  container: { ref, dom, width: containerWidth, height: containerHeight },
}) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    imgWidth: 0,
    imgHeight: 0,
    imgRatio: 0,
    containerWidth: 0,
    containerHeight: 0,
  });

  const refResizeGetCallback = useRef();
  const refIsImgLoad = useRef();
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const get = useCallback(() => {
    const targetContainer = ref?.current || dom;

    const targetWidth = containerWidth || targetContainer?.clientWidth;
    const targetHeight = containerHeight || targetContainer?.clientHeight;
    const targetRatio = targetWidth / targetHeight;

    const { width: imgWidth, height: imgHeight } = imgSize;

    const imgRatio = imgWidth / imgHeight;

    let width,
      height,
      offsetX = 0,
      offsetY = 0;

    if (type === "cover") {
      if (imgRatio >= targetRatio) {
        const scale = targetHeight / imgHeight;

        width = imgWidth * scale;
        offsetX = (targetWidth - width) / 2;
        height = targetHeight;
      } else {
        const scale = targetWidth / imgWidth;
        width = targetWidth;
        height = imgHeight * scale;
        offsetY = (targetHeight - height) / 2;
      }
    } else if (type === "contain") {
      if (imgRatio >= targetRatio) {
        const scale = targetWidth / imgWidth;
        width = targetWidth;
        height = imgHeight * scale;

        offsetY = (targetHeight - height) / 2;
      } else {
        const scale = targetHeight / imgHeight;
        height = targetHeight;
        width = imgWidth * scale;
        offsetX = (targetWidth - width) / 2;
      }
    }

    setSize({
      width,
      height,
      imgRatio,
      offsetX,
      offsetY,
      imgWidth,
      imgHeight,
      containerWidth: targetWidth,
      containerHeight: targetHeight,
    });
  }, [type, ref, dom, containerWidth, containerHeight, imgSize]);

  useEffect(() => {
    if (!refIsImgLoad.current) return;

    get();

    const targetContainer = ref?.current || dom;
    if (refResizeGetCallback.current) {
      window.removeEventListener("resize", refResizeGetCallback.current);
    }

    if (window && targetContainer) {
      window.addEventListener("resize", get);
    }
    refResizeGetCallback.current = get;
    return () => {
      window.removeEventListener("resize", refResizeGetCallback.current);
    };
  }, [get]);

  useEffect(() => {
    if (!imgUrl) return;
    refIsImgLoad.current = false;
    const img = document.createElement("img");

    img.addEventListener("load", (e) => {
      refIsImgLoad.current = true;
      const { naturalWidth, naturalHeight } = e.target;
      setImgSize({ width: naturalWidth, height: naturalHeight });
    });
    img.src = imgUrl;
  }, [imgUrl]);

  return size;
};

export default useObjectFit;
