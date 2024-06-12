import React, { useEffect, useRef, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: Props) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setIsFadingOut(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      onClose();
      setIsFadingOut(false);
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeydown);
    } else {
      window.removeEventListener("keydown", handleKeydown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <ModalStyle
      className={isFadingOut ? "fade-out" : "fade-in"}
      onClick={handleOverlayClick}
      onAnimationEnd={handleAnimationEnd}>
      <div className="modal-body" ref={modalRef}>
        <div className="modal-contents">{children}</div>
        <button onClick={handleClose} className="modal-close">
          <FaPlus />
        </button>
      </div>
    </ModalStyle>,
    document.body
  );
}
const ModalStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    // translate는 부모 요소의 50%만큼 이동하고 자신의 50%만큼 이동한다.
    transform: translate(-50%, -50%);
    padding: 54px 32px 32px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    background-color: #fff;
    max-width: 80%;
  }
  .modal-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    font-size: 24px;
    color: #333;
    background-color: #fff;
    border: none;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
    }
  }
`;

export default Modal;
