import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Col, Input, Modal, Row, message } from "antd";
import axios from "axios";
import { API_URL } from "../../../../API";

const { TextArea } = Input;

const VisualStories = () => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [images, setImages] = useState([]);

  const showVerifyModal = () => {
    setIsVerifyModalOpen(true);
    document.getElementById("preview").innerHTML = story;
  };

  const handleVerifyCancel = () => {
    setIsVerifyModalOpen(false);
  };

  const onUpload = async () => {
    try {
      // Step 1: Upload Images
      const imageResponses = await Promise.all(
        images.map(async (image) => {
          let formData = new FormData();
          formData.append("file", image, image.name);

          return await axios.post(`${API_URL}/image`, formData);
        })
      );
      const storyResponse = await axios.post(`${API_URL}/story`, {
        title,
        images: imageResponses.map((response) => response.data.image),
      });

      message.success("Your story was successfully uploaded");
    } catch (error) {
      message.error("Your story was not successfully uploaded");
    }
  };

  return (
    <>
      <h1
        style={{
          color: "rgba(0,0,0,0.8)",
          marginBottom: 10,
          textAlign: "left",
          fontFamily: "Poppins",
        }}
      >
        Visual Stories
      </h1>
      <Row gutter={24}>
        <Col span={24}>
          <Card style={{ minHeight: "80vh", height: "100%" }}>
            <Row gutter={24}>
              <Col span={6}>
                <Input
                  type="file"
                  name="file"
                  id="file-name"
                  onChange={(e) => {
                    setImages([...images, ...e.target.files]);
                  }}
                  style={{ display: "none" }}
                  hidden={true}
                  multiple // Allow multiple file selection
                />
                <div
                  onClick={() => {
                    document.getElementById("file-name").click();
                  }}
                  style={{
                    width: "auto",
                    height: "200px",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    marginBottom: 10,
                  }}
                >
                  {images.length === 0 ? (
                    <div
                      style={{
                        height: "100%",
                        fontSize: "25px",
                        fontWeight: "600",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      Upload image(s) here
                    </div>
                  ) : (
                    images.map((image, index) => (
                      <img
                        key={index}
                        style={{
                          width: "auto",
                          height: "100%",
                          borderRadius: "10px",
                          marginRight: "5px",
                        }}
                        src={URL.createObjectURL(image)}
                      />
                    ))
                  )}
                </div>
              </Col>
              <Col span={18}>
                <Row gutter={20}>
                  <Col span={12}>
                    <Input
                      placeholder="Story"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div style={{ marginBottom: "20px" }}></div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={6}>
                <Button onClick={showVerifyModal} type="primary">
                  Preview
                </Button>
              </Col>
            </Row>
            <div id="dd"></div>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Article Modal"
        visible={isVerifyModalOpen}
        onOk={onUpload}
        onCancel={handleVerifyCancel}
        okText="Upload"
      >
        <h3 style={{ fontSize: 20, fontWeight: "600", color: "#2e2e2e" }}>
          Headline:
        </h3>
        <div style={{ fontSize: 16, fontWeight: "400", color: "#5e5e5e" }}>
          {title}
        </div>
        <div id="preview" style={{ marginLeft: 20 }}></div>
      </Modal>
    </>
  );
};

export default VisualStories;
