import React, { Children } from "react";
import "../styles/modal.scss";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={onClose} />

      <div className="modalne">
        <div className="content">
          <div>
            {" "}
            <AiOutlineCloseCircle className="icon" onClick={onClose} />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
