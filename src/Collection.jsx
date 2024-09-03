import React, { useState } from "react";

export function Collection({ name, images }) {
    const [activeImage, setActiveImage] = useState(0);
    
    return (
      <div className="collection">
        <img className="collection__big" src={images[activeImage]} alt="Item" />
        <div className="collection__bottom">
          {images
          .map((element, index) => {
            if(index!==activeImage){
              return <img className="collection__mini" src={element} alt="Item" key={index} onClick={() => setActiveImage(index)}/>
            }
            
          })}
          {/* <img className="collection__mini" src={images[1]} alt="Item" />
          <img className="collection__mini" src={images[2]} alt="Item" />
          <img className="collection__mini" src={images[3]} alt="Item" /> */}
        </div>
        <h4>{name}</h4>
      </div>
    );
  }