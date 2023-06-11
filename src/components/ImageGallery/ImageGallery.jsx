import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.css';

const ImageGallery = ({ images, handleOpenModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
