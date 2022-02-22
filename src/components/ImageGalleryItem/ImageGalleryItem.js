import React from "react";

import s from "./ImageGalleryItem.module.css"

function ImageGalleryItem({id, tags, url, toggleModal, getItemId}) {
  return <li className={s.card} onClick={() => {
    toggleModal();
    getItemId(id);
  }} id={id}>
  <img src={url} alt={tags} width="300"/>
</li>
}

export default ImageGalleryItem;