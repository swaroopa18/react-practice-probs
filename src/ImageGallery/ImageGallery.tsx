import React, { useState } from "react";
import "./ImageGallery.css";
import Modal from "./Modal";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Track the currently selected image

  const openModal = (index: number) => {
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setCurrentIndex(null);
  };

  const onLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === null ? 0 : prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const onRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === null ? 0 : prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-gallery">
      {images.map((image: string, index: number) => (
        <img
          key={index}
          src={image}
          alt={`Gallery ${index}`}
          className="gallery-image"
          onClick={() => openModal(index)}
        />
      ))}

      {currentIndex !== null && (
        <Modal
          image={images[currentIndex]}
          onClose={closeModal}
          onLeft={onLeft}
          onRight={onRight}
        />
      )}
    </div>
  );
};

export default ImageGallery;
