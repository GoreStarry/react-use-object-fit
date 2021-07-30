import { useState, useEffect } from "react";

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
 *    ratio, // origin image ratio
 *    imgWidth,
 *    imgHeight,
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
    ratio: 0,
    offsetX: 0,
    offsetY: 0,
    imgWidth: 0,
    imgHeight: 0,
    containerWidth: 0,
    containerHeight: 0,
  });

  useEffect(() => {
    const targetContainer = ref?.current || dom;
    const targetWidth = containerWidth || targetContainer?.clientWidth;
    const targetHeight = containerHeight || targetContainer?.clientHeight;
    const targetRatio = targetWidth / targetHeight;

    if (!imgUrl) return;
    const img = document.createElement("img");
    img.addEventListener("load", (e) => {
      const { naturalHeight, naturalWidth } = e.target;
      console.log(naturalWidth, naturalHeight);
      const ratio = naturalWidth / naturalHeight;
      let width,
        height,
        offsetX = 0,
        offsetY = 0;

      if (type === "cover") {
        if (ratio >= targetRatio) {
          const scale = containerHeight / naturalHeight;
          width = naturalWidth * scale;
          offsetX = (containerWidth - width) / 2;
          height = containerHeight;
        } else {
          const scale = containerWidth / naturalWidth;
          width = containerWidth;
          height = naturalHeight * scale;
          offsetY = (containerHeight - height) / 2;
        }
      } else if (type === "contain") {
        if (ratio >= targetRatio) {
          const scale = containerWidth / naturalWidth;
          width = containerWidth;
          height = naturalHeight * scale;

          offsetY = (containerHeight - height) / 2;
        } else {
          const scale = containerHeight / naturalHeight;
          height = containerHeight;
          width = naturalWidth * scale;
          offsetX = (containerWidth - width) / 2;
        }
      }

      setSize({
        width,
        height,
        ratio,
        offsetX,
        offsetY,
        imgWidth: naturalWidth,
        imgHeight: naturalHeight,
        containerWidth,
        containerHeight,
      });
    });
    img.src = imgUrl;
  }, [type, imgUrl, ref, dom, containerWidth, containerHeight]);

  return size;
};

export default useObjectFit;
