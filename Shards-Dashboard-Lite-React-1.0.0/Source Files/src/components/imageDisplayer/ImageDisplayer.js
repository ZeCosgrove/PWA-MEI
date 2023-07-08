import React from "react";

const ImageDisplayer = ({ imageData, height }) => {
  const base64String = Buffer.from(imageData).toString("base64");
  const imageUrl = `data:image/bmp;base64,${base64String}`;

  return (
    <div>
      <img src={imageUrl} alt="Image" height={`${height}px`} />
    </div>
  );
};

export default ImageDisplayer;
