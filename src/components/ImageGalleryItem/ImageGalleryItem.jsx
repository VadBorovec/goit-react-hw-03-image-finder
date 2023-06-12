import React from 'react';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ image, handleOpenModal }) => {
  const { largeImageURL, tags, webformatURL } = image;

  return (
    <li
      className="ImageGalleryItem"
      onClick={() => handleOpenModal(largeImageURL, tags)}
    >
      <img className="ImageGalleryItem-image" src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
