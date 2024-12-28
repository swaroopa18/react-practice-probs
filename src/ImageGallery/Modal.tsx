import React from 'react'
import "./ImageGallery.css";
import { useEffect } from "react";

interface ModalProps {
  image: string;
  onClose: () => void;
  onLeft: () => void;
  onRight: () => void;
}
const Modal: React.FC<ModalProps> = ({ image, onClose, onLeft, onRight }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(); // Close modal on ESC
      }
      if (event.key === "ArrowLeft") {
        onLeft(); // Navigate left
      }
      if (event.key === "ArrowRight") {
        onRight(); // Navigate right
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onLeft, onRight]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="nav-button prev-button" onClick={onLeft}>
          &lt;
        </button>
        <button className="nav-button next-button" onClick={onRight}>
          &gt;
        </button>
        <img src={image} alt="Selected" className="modal-image" />
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
