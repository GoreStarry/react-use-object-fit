import React, { useRef, useState, useCallback, useEffect } from "react";
import useObjectFit from "./useObjectFit";
import ImageUploading from "react-images-uploading";

function App({ type, containerWidth: boxWidth, containerHeight: boxHeight }) {
  const [images, setImages] = useState([]);
  const refContainer = useRef();
  const {
    width,
    height,
    ratio,
    offsetX,
    offsetY,
    imgWidth,
    imgHeight,
    containerWidth,
    containerHeight,
  } = useObjectFit({
    type,
    imgUrl: images[0]?.data_url,
    container: {
      width: boxWidth,
      height: boxHeight,
      // ref: refContainer,
    },
  });

  const onChangeCoverImg = useCallback((imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  }, []);

  return (
    <div className="App" style={{ whiteSpace: "pre-wrap" }}>
      {`object-fit width: ${width}\nobject-fit height: ${height}\nimage ratio: ${ratio}\noffsetX: ${offsetX}\noffsetY: ${offsetY}\norigin image width: ${imgWidth} \norigin image height: ${imgHeight}\ncontainer width: ${containerWidth}\ncontainer height: ${containerHeight}`}

      <ImageUploading
        // multiple
        value={images}
        onChange={onChangeCoverImg}
        maxNumber={69}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg", "png", "webp", "heic"]}
        // maxFileSize={3000000}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            {errors && (
              <div>
                {errors.maxNumber && (
                  <span>Number of selected images exceed maxNumber</span>
                )}
                {errors.acceptType && (
                  <span>Your selected file type is not allow</span>
                )}
                {errors.maxFileSize && (
                  <span>Selected file size exceed 3MB</span>
                )}
                {errors.resolution && (
                  <span>
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
            )}

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <label htmlFor="">Container：</label>
                <div
                  ref={refContainer}
                  style={{
                    width: boxWidth,
                    height: boxHeight,
                    overflow: "hidden",
                    border: "3px dashed green",
                    margin: "1rem",
                  }}
                >
                  <img
                    src={image.data_url}
                    style={{
                      width: width,
                      height: height,
                      transform: `translate(${offsetX}px, ${offsetY}px)`,
                    }}
                  />
                </div>
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default App;
