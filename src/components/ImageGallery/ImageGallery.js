import React from "react";

import ImageGalleryItem from "../ImageGalleryItem";

import s from "./ImageGallery.module.css"

function ImageGallery({images, toggleModal, getItemId}) {
    return <ul className={s.gallery}>
        {images.map(img => <ImageGalleryItem id={img.id} key={img.id} tags={img.tags} url={img.webformatURL} toggleModal={toggleModal} getItemId={getItemId} />)}
        
</ul>
}

export default ImageGallery;