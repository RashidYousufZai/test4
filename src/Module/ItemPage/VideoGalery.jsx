import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../API";

const VideoGallery = () => {
  const [videoGalleries, setVideoGalleries] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/videogalery`)
      .then((response) => {
        setVideoGalleries(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching galleries:", error);
      });
  }, []);

  const handleVideoClick = (galleryId, videoIndex) => {
    // Navigate to the gallery page for the selected video
    navigation(`/gallery/${galleryId}/video/${videoIndex}`);
  };

  return (
    <div className="container" style={{display: "flex"}}>
      {videoGalleries.map((gallery, galleryIndex) => (
        <div key={galleryIndex} style={{width: "400px", height: "400px", marginLeft: "10px"}}>
          <h2>{gallery.title}</h2>
          {gallery.images && Array.isArray(gallery.images) && (
            <div>
              {gallery.images.map((videoUrl, videoIndex) => (
                <div key={videoIndex}>
                  <video
                    className="video-card-img"
                    width={320}
                    height={240}
                    controls
                    onClick={() => handleVideoClick(gallery._id, videoIndex)}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
