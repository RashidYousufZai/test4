import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../API";

const PhotoGallery = () => {
  const [photoGalleries, setPhotoGalleries] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/galery`)
      .then((response) => {
        setPhotoGalleries(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching galleries:", error);
      });
  }, []);

  const handleImageClick = (galleryId, imageIndex) => {
    // Navigate to the gallery page for the selected image
    navigation(`/gallery/${galleryId}/image/${imageIndex}`);
  };

  return (
    <div className="container">
      {photoGalleries.map((gallery, galleryIndex) => (
        <div key={galleryIndex}>
          <h2>{gallery.title}</h2>
          <Image.PreviewGroup>
            {gallery.images.map((image, imageIndex) => (
              <Image
                key={imageIndex}
                width={200}
                src={image}
                // onClick={() => handleImageClick(gallery._id, imageIndex)}
              />
            ))}
          </Image.PreviewGroup>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;


{/* <div className="main-page-videos-conatiner container2 container3">
          <div className="main-page-video-heading">{t("v")}</div>
          <div className="video-cards">
            <div className="video-card-box-1">
              <VideoCard data={video && video[0]} />
              <VideoCard data={video && video[1]} />
            </div>
            <div className="divider-box">
              <div className="divider"></div>
            </div>
            <div className="video-box">
              <VideoCard height={400} width={500} data={video && video[3]} />
              {/* <div className="video-items-box">
                <FaRegCirclePlay size={50} color="red" style={{ zIndex: 1 }} />
                <div className="video-text-box">
                  <div>
                    War Of Words Between Babar, Shaheen After Pakistan's Asia
                    Cup Exit: Report
                  </div>
                </div>
              </div> 
            </div>
            <div className="divider-box">
              <div className="divider"></div>
            </div>
            <div className="video-card-box-1">
              <VideoCard data={video && video[4]} />
              <VideoCard data={video && video[5]} />
            </div>
          </div>
        </div> */}