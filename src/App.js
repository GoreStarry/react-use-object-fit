import React, { useRef, useState, useCallback, useEffect } from "react";
import useObjectFit from "./useObjectFit";
import ImageUploading from "react-images-uploading";

function App() {
  const [images, setImages] = useState([]);
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
    type: "cover",
    imgUrl: images[0]?.data_url,
    container: { width: 60, height: 100 },
  });

  const onChangeCoverImg = useCallback((imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  }, []);

  return (
    <div className="App">
      {`${width}, ${height}, ${ratio}, ${offsetX}, ${offsetY}, ${imgWidth} ,${imgHeight}, ${containerWidth}, ${containerHeight}`}

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
            {imageList[0] && (
              <button onClick={onImageRemoveAll}>Remove all images</button>
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
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
