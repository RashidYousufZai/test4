import { Button, Card, Col, Input, Row, Table, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../API";
import { Tag } from "antd";

const SocialMediaLink = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [platform, setPlatform] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/sociallink`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  
  const onUpload = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/sociallink`, { link, platform });
      message.success("Link uploaded successfully");
      setLink(""); 
      fetchData(); 
      setPlatform("");
    } catch (error) {
      console.error("Error uploading link:", error);
      message.error("Failed to upload link");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (socialMediaId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      // Make a PATCH request to update the status
      await axios.put(`${API_URL}/socialmedia/update/${socialMediaId}`, {
        status: newStatus,
      });

      // If successful, show success message and update data
      message.success("Status updated successfully");

      // Assuming fetchData is a function to update the data after status change
      fetchData();
    } catch (error) {
      // If there is an error, log and show an error message
      console.error("Error updating status:", error);
      message.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "slugName",
      key: "slugName",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (_, { link }) => (
        <a href={link} target="_blank">
          {link}
        </a>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, userData) => (
        <>
          <Tag color={userData.status === "active" ? "cyan" : "red"}>
            {userData.status === "active" ? "Active" : "Inactive"}
          </Tag>
          <Button
            type="link"
            onClick={() => handleToggleStatus(userData?._id, userData?.status)}
            style={{ padding: "auto 0px", margin: "10px 0px" }}
          >
            Change Status
          </Button>
        </>
      ),
    },
  ];
  console.log(userData);

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
        Flash News
      </h1>
      <Card style={{ width: "100%", height: "100%" }}>
      <Col span={12}>
        <Select
          placeholder="Social media"
          onChange={(value) => setPlatform(value)}
          value={platform}
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
          options={[
            {
              value: "Twitter",
              label: "Twitter",
            },
            {
              value: "Instagram",
              label: "Instagram",
            },
          ]}
        />
      </Col>
        <Row gutter={6}>
          <Col span={6}>
            <Input
              placeholder="Enter Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Button
              style={{ width: "100%" }}
              loading={loading}
              type="primary"
              onClick={onUpload}
            >
              Upload{" "}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={userData} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SocialMediaLink;
