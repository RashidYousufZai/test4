import React from "react";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ width, height, img, text, style, border, id, title }) => {
  const navigate = useNavigate();
  // let title = text?.split(" ").join("-");

  console.log(title, id);
  return (
    <div
      className="image-box"
      style={{ width, height, borderRadius: border, cursor: "pointer"}}
      onClick={() => navigate(`/details/${title}?id=${id}`)}
    >
      <img src={img} alt="" style={{ borderRadius: border, objectFit: "fill" }} />
      <div className="image-text-box">
        <div style={style}>{text}</div>
      </div>
    </div>
  );
};

export default ImageCard;
