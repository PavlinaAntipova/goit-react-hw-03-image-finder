import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';


import s from "./Modal.module.css"

const modalRoot = document.querySelector("#modal-root");


class Modal extends Component {

  componentDidMount() {
    window.addEventListener("keydown", this.onEsc);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEsc);
    window.removeEventListener('scroll', this.onScroll);
  }

  onEsc = (e) => {
    if (e.code === "Escape") {
      this.props.toggleModal();
}
  }

  onScroll = () => {
window.scrollTo(0,0);
  }

  onOverlay = (e) => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
   }


  render() {
    console.log(this.props.children);
    return createPortal(<div className={s.overlay} onClick={this.onOverlay}>
      <div className={s.modal}>
        {this.props.children}
      </div>
    </div>, modalRoot);
  }
  
}

export default Modal;

Modal.propTypes = {
  toggleModal: PropTypes.func,
  children: PropTypes.object
}

