import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import axios from "axios";
import React, { useState, useRef, useMemo, useContext, useEffect } from "react";
import JoditEditor from "jodit-react";
import { OnEdit as onEditContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../API";
const { TextArea } = Input;
const Upload = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [Topic, setTopic] = useState(null);
  const [desc, setdesc] = useState("");
  const [reported, setreported] = useState("");
  const [publish, setpublish] = useState("");
  const [type, setType] = useState("img");
  const [Language, setLanguage] = useState("English");
  const [newType, setNewType] = useState("upload");
  const [keyword, setkeyword] = useState([]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [dataImage, setdataImage] = useState(null);
  const [options, setOptions] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryData, setSubCategoryData] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [role, setRole] = useState("");
  const [usercategoryData, setuserCategoryData] = useState([]);
  const [admincategoryData, setadminCategoryData] = useState([]);
  const { onEdit, setOnEdit, id } = useContext(onEditContext);
  const [Update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(false);
  const navigation = useNavigate();
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onTitleInput = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    // Update slug in real-time
    setSlug(newTitle.toLowerCase().replace(/\s+/g, "-"));
  };

  const onSlugChange = (event) => {
    // Set a flag to indicate that slug was manually edited
    setIsSlugManuallyEdited(true);
    setSlug(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setOptions([...options, { value: name, label: name, key: name }]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const categoryOptions = categoryData.map((items) => ({
    label: items.text,
    value: items.text,
  }));
  console.log(categoryOptions);

  const userCategoryOptions = usercategoryData.map((item) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    setSlug(slug);
    console.log(id, "id");
    console.log(onEdit, "onEdit");
    if (onEdit) {
      axios.get(`${API_URL}/article?id=${id}`).then((item) => {
        let data = item.data[0];
        console.log(data);
        setTitle(data.title);
        setTopic(data.topic);
        setdesc(data.discription);
        setkeyword(data.keyWord);
        setdataImage(data.image);
        setLanguage(data?.language);
        setpublish(data?.publishBy);
        setreported(data?.reportedBy);
        setNewType(data?.newsType);
        setType(data?.type);
      });
    }
    axios
      .get(`${API_URL}/content?type=tag`)
      .then((content) => {
        let arr = [];
        for (let i = 0; i < content.data.length; i++) {
          const element = content.data[i];
          arr.push({
            key: element._id,
            value: element.text,
            label: element.text,
          });
        }
        setOptions(arr);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${API_URL}/content?type=category`)
      .then((content) => {
        let arr = [];
        for (let i = 0; i < content.data.length; i++) {
          const element = content.data[i];
          arr.push({
            key: element._id,
            value: element.text,
            label: element.text,
          });
        }
        setCategoryData(arr);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${API_URL}/user?id=${localStorage.getItem("id")}`)
      .then((user) => {
        console.log(user)
        setpublish(user.data[0].email);
        setRole(user.data[0].role);
        setuserCategoryData(user.data[0].selectedKeywords || []);
        console.log(usercategoryData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [onEdit, useState]);

  useEffect(() => {
    axios
      .get(`${API_URL}/subcategory?category=${Topic}`)
      .then((content) => {
        let arr = [];
        for (let i = 0; i < content.data.length; i++) {
          const element = content.data[i];
          arr.push({
            key: element._id,
            value: element.text,
            label: element.text,
          });
        }
        setSubCategoryData(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Topic]);

  const showVerifyModal = () => {
    setIsVerifyModalOpen(true);
    document.getElementById("perview").innerHTML = desc;
  };
  const handleVerifyCancel = () => {
    setIsVerifyModalOpen(false);
  };
  const editor = useRef(null);
  const onUpload = () => {
    // console.log(
    //   { title: title,
    //     discription: desc,
    //     topic: Topic,
    //     keyWord: keyword,}
    // )
    setLoading(true);
    let formdata = new FormData();
    formdata.append("file", img, img.name);
    console.log(formdata);

    axios.post(`${API_URL}/image`, formdata).then(async (image) => {
      console.log(image);
      await axios
        .post(`${API_URL}/article/${localStorage.getItem("id")}`, {
          title: title,
          discription: desc,
          topic: Topic,
          keyWord: keyword,
          language: Language,
          reportedBy: reported,
          publishBy: publish,
          newsType: newType,
          image: image.data.image,
          type: type,
          subCategory: subCategory,
          slug: slug,
        })
        .then((data) => {
          console.log(data.data);
          console.log(
            {
              title: title,
              discription: desc,
              topic: Topic,
              keyWord: keyword,
              language: Language,
              reportedBy: reported,
              publishBy: publish,
              newsType: newType,
              image: image.data.image,
              subCategory: subCategory,
              comment: comment,
            },
            "dddata"
          );
          message.success("Your article was successfully Uploaded");
          setTitle("");
          setTopic("");
          setdesc("");
          setkeyword([]);
          setImg(null);
          setLanguage("");
          // setpublish("");
          setreported("");
          setNewType("");
          setType("");
          setLoading(false);
          setSubCategory("");
        })
        .catch(() => {
          message.error("Your article was not successfully Uploaded");
          setLoading(false);
        });
      setIsVerifyModalOpen(false);
    });
  };
  const onChange = (checked) => {
    setComment(checked);
  };
  const onEditHandle = async () => {
    if (Update) {
      let formdata = new FormData();
      formdata.append("file", img, img.name);
      console.log(formdata);

      axios.post(`${API_URL}/image`, formdata).then(async (image) => {
        setdataImage(image.data.image);
        console.log(image.data.image);
        await axios
          .put(`${API_URL}/article/${id}`, {
            title: title,
            discription: desc,
            topic: Topic,
            keyWord: keyword,
            language: Language,
            reportedBy: reported,
            publishBy: publish,
            newsType: newType,
            image: await image.data.image,
            type: type,
            subCategory: subCategory,
          })
          .then((data) => {
            console.log(data.data);
            message.success("Your article was successfully Edit");
            setTitle("");
            setTopic("");
            setdesc("");
            setkeyword([]);
            setImg(null);
            setLanguage("");
            // setpublish("");
            setreported("");
            setNewType("");
            navigation("/dashboard/dashboard");
            setUpdate(false);
            setOnEdit(false);
          })
          .catch(() => {
            message.error("Your article was not successfully Edit");
          });
      });
    } else {
      axios
        .put(`${API_URL}/article/${id}`, {
          title: title,
          discription: desc,
          topic: Topic,
          keyWord: keyword,
          image: dataImage,
        })
        .then((data) => {
          console.log(data.data);
          message.success("Your article was successfully Edit");
          setTitle("");
          setTopic("");
          setdesc("");
          setkeyword([]);
          setImg(null);
          setOnEdit(false);
          navigation("/dashboard/dashboard");
        })
        .catch(() => {
          message.error("Your article was not successfully Edit");
        });
    }

    setIsVerifyModalOpen(false);
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
        {onEdit ? "Edit Article" : "Upload"}
      </h1>
      <Row gutter={24}>
        <Col span={24}>
          <Card style={{ minHeight: "80vh", height: "100%" }}>
            {onEdit && (
              <Row gutter={24}>
                <Col span={6}>
                  <Input
                    type="file"
                    name="file"
                    id="file-name"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    style={{ display: "none", overflow: "hidden" }}
                    hidden={true}
                  />
                  <div
                    onClick={() => {
                      document.getElementById("file-name").click();
                      setUpdate(true);
                    }}
                    style={{
                      width: "auto",
                      height: "200px",
                      backgroundColor: "rgba(0,0,0,0.1",
                      borderRadius: "10px",
                      marginBottom: 10,
                      overflow: "hidden",
                    }}
                  >
                    {img == null ? (
                      <div
                        style={{
                          height: "100%",
                          fontSize: "25px",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "rgba(0,0,0,0.5)",
                          overflow: "hidden",
                        }}
                      >
                        Upload Image or Video here
                      </div>
                    ) : (
                      <img
                        style={{
                          width: "auto",
                          height: "200px",
                          borderRadius: "10px",
                        }}
                        src={URL.createObjectURL(img)}
                      />
                    )}
                  </div>
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={12}>
                      <Select
                        placeholder="Select Language"
                        onChange={(e) => setType(e)}
                        defaultValue="img"
                        value={type}
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                        }}
                        options={[
                          { value: "img", label: "Image" },
                          { value: "vid", label: "Video" },
                        ]}
                      />
                    </Col>
                    <Col span={12}>
                      <Select
                        placeholder="Select Language"
                        onChange={(e) => setLanguage(e)}
                        value={Language}
                        style={{
                          width: "100%",
                          marginBottom: "20px",
                        }}
                        options={[
                          { value: "English", label: "English" },
                          { value: "Urdu", label: "Urdu" },
                          { value: "Hindi", label: "Hindi" },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Col span={24}>
                    <Input
                      placeholder="Headline"
                      value={title}
                      onInput={onTitleInput}
                    />
                    <div style={{ marginBottom: "20px" }}></div>
                  </Col>
                  <Row>
                    <Col span={12}>
                      <Select
                        value={Topic ? Topic : null}
                        placeholder="Category"
                        onChange={(e) => setTopic(e)}
                        style={{ width: "100%" }}
                        options={
                          role === "admin" ? categoryData : userCategoryOptions
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <Select
                        placeholder="Sub Category"
                        value={subCategory ? subCategory : null}
                        onChange={(e) => setSubCategory(e)}
                        style={{ width: "100%" }}
                        options={subCategoryData}
                      />
                      <div style={{ marginBottom: "20px" }}></div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}

            {/* {onEdit ? (
              <>
                <Col span={8}>
                  <img
                    style={{
                      width: "auto",
                      height: "200px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    src={dataImage}
                  />
                </Col>
              </>
            ) : (
              <></>
            )} */}
            <Row gutter={24}>
              {!onEdit && (
                <Col span={6}>
                  <Input
                    type="file"
                    name="file"
                    id="file-name"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    style={{ display: "none", overflow: "hidden" }}
                    hidden={true}
                  />
                  <div
                    onClick={() => {
                      document.getElementById("file-name").click();
                      setUpdate(true);
                    }}
                    style={{
                      width: "auto",
                      height: "200px",
                      backgroundColor: "rgba(0,0,0,0.1",
                      borderRadius: "10px",
                      marginBottom: 10,
                      overflow: "hidden",
                    }}
                  >
                    {img == null ? (
                      <div
                        style={{
                          height: "100%",
                          fontSize: "25px",
                          fontWeight: "600",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "rgba(0,0,0,0.5)",
                          overflow: "hidden",
                        }}
                      >
                        Upload Image or Video here
                      </div>
                    ) : (
                      <img
                        style={{
                          width: "auto",
                          height: "200px",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                        src={URL.createObjectURL(img)}
                      />
                    )}
                  </div>
                </Col>
              )}
              {!onEdit && (
                <Col span={18}>
                  <Row gutter={20}>
                    <Col span={12}>
                      <Select
                        // onChange={(e) => setValue(e)}
                        placeholder="Select Language"
                        onChange={(e) => setType(e)}
                        defaultValue="img"
                        value={type}
                        style={{
                          width: "100%",
                          // height: 50,
                          marginBottom: "20px",
                        }}
                        options={[
                          {
                            value: "img",
                            label: "Image",
                          },
                          {
                            value: "vid",
                            label: "Video",
                          },
                        ]}
                      />
                    </Col>
                    <Col span={12}>
                      <Select
                        // onChange={(e) => setValue(e)}
                        placeholder="Select Language"
                        onChange={(e) => setLanguage(e)}
                        value={Language}
                        style={{
                          width: "100%",
                          // height: 50,
                          marginBottom: "20px",
                        }}
                        options={[
                          {
                            value: "English",
                            label: "English",
                          },
                          {
                            value: "Urdu",
                            label: "Urdu",
                          },
                          {
                            value: "Hindi",
                            label: "Hindi",
                          },
                        ]}
                      />
                    </Col>
                    <Col span={24}>
                      <Input
                        placeholder="Headline"
                        value={title}
                        onInput={onTitleInput}
                      />
                      <div style={{ marginBottom: "20px" }}></div>
                    </Col>
                    <Col span={12}>
                      <Select
                        value={Topic ? Topic : null}
                        placeholder="Category"
                        onChange={(e) => setTopic(e)}
                        style={{
                          width: "100%",
                        }}
                        options={
                          role === "admin" ? categoryData : userCategoryOptions
                        }
                      />
                    </Col>
                    {console.log(categoryData,userCategoryOptions)}
                    <Col span={12}>
                      <Select
                        placeholder="Sub Category"
                        value={subCategory ? subCategory : null}
                        onChange={(e) => setSubCategory(e)}
                        style={{
                          width: "100%",
                        }}
                        // dropdownRender={}
                        options={subCategoryData}
                      />
                      <div style={{ marginBottom: "20px" }}></div>
                    </Col>
                    {/* <Col span={12}>
                    <Input
                      placeholder="Topic"
                      value={Topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </Col> */}
                  </Row>
                </Col>
              )}
              {!onEdit && (
                <Row gutter={12}>
                  {/* <Col span={12}>
                    <Select
                      // onChange={(e) => setValue(e)}
                      placeholder="Select Language"
                      onChange={(e) => setLanguage(e)}
                      value={Language}
                      style={{
                        width: "100%",
                        // height: 50,
                        marginBottom: "20px",
                      }}
                      options={[
                        {
                          value: "English",
                          label: "English",
                        },
                        {
                          value: "Urdu",
                          label: "Urdu",
                        },
                        {
                          value: "Hindi",
                          label: "Hindi",
                        },
                      ]}
                    />
                  </Col> */}
                </Row>
              )}
              {/* {onEdit && (
                <>
                  <Col span={12}>
                    <Select
                      // onChange={(e) => setValue(e)}
                      placeholder="Select Language"
                      onChange={(e) => setType(e)}
                      defaultValue="img"
                      value={type}
                      style={{
                        width: "100%",
                        // height: 50,
                        marginBottom: "20px",
                      }}
                      options={[
                        {
                          value: "img",
                          label: "Image",
                        },
                        {
                          value: "vid",
                          label: "Video",
                        },
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <Select
                      // onChange={(e) => setValue(e)}
                      placeholder="Select Language"
                      onChange={(e) => setLanguage(e)}
                      value={Language}
                      style={{
                        width: "100%",
                        // height: 50,
                        marginBottom: "20px",
                      }}
                      options={[
                        {
                          value: "English",
                          label: "English",
                        },
                        {
                          value: "Urdu",
                          label: "Urdu",
                        },
                        {
                          value: "Hindi",
                          label: "Hindi",
                        },
                      ]}
                    />
                  </Col>

                  <Col span={12}>
                    <Input
                      placeholder="Headline"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div style={{ marginBottom: "20px" }}></div>
                  </Col>

                  {/* <Col span={12}>
                    <Select
                      value={Topic ? Topic : null}
                      placeholder="Category"
                      onChange={(e) => setTopic(e)}
                      style={{
                        width: "100%",
                      }}
                      options={
                        role === "admin" ? categoryOptions : userCategoryOptions
                      }
                    />
                  </Col> */}
              {/* </>
              )} */}

              <Col span={24} style={{ marginTop: "20px" }}>
                <JoditEditor
                  // config={{}}
                  ref={editor}
                  value={desc}
                  tabIndex={1}
                  onChange={(newContent) => setdesc(newContent)}
                />
                <div style={{ marginBottom: "20px" }}></div>
              </Col>
              <Col span={6}>
                <Select
                  mode="multiple"
                  placeholder="Tags"
                  value={keyword}
                  onChange={(e) => setkeyword(e)}
                  style={{
                    width: "100%",
                  }}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Input
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type="primary" onClick={addItem}>
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  // dropdownRender={}
                  options={options}
                />
                <div style={{ marginBottom: "20px" }}></div>
              </Col>
              {/* <Col span={6}>
                <Select
                  placeholder="Sub Category"
                  value={subCategory ? subCategory : null}
                  onChange={(e) => setSubCategory(e)}
                  style={{
                    width: "100%",
                  }}
                  // dropdownRender={}
                  options={subCategoryData}
                />
                <div style={{ marginBottom: "20px" }}></div>
              </Col> */}
              <Col span={6}>
                <Select
                  placeholder="Reported By"
                  value={reported ? reported : null}
                  onChange={(e) => setreported(e)}
                  style={{
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "LOKSATYA.AGENCIES",
                      label: "LOKSATYA.AGENCIES",
                    },
                    {
                      value: "PTI",
                      label: "PTI",
                    },
                    {
                      value: "UNIVARTI",
                      label: "UNIVARTI",
                    },
                    {
                      value: "BHASHA",
                      label: "BHASHA",
                    },
                  ]}
                />
                <div style={{ marginBottom: "20px" }}></div>
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Slug"
                  value={slug}
                  onChange={onSlugChange}
                />
                <div style={{ marginBottom: "20px" }}></div>
              </Col>
              <Col span={6}>
                <Input readOnly placeholder="Publish By" value={publish} />
                <div style={{ marginBottom: "20px" }}></div>
              </Col>
              <Col span={6}>
                Comment
                <Switch
                  size="small"
                  style={{ marginLeft: 5 }}
                  defaultChecked={false}
                  onChange={onChange}
                />
              </Col>
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
        confirmLoading={loading}
        title="Article Modal"
        open={isVerifyModalOpen}
        onOk={onEdit ? onEditHandle : onUpload}
        onCancel={handleVerifyCancel}
        style={{
          overflow: "auto",
          height: 500,
        }}
        okText={onEdit ? "Save" : "Upload"}
      >
        <h3 style={{ fontSize: 20, fontWeight: "600", color: "#2e2e2e" }}>
          Headline:
        </h3>
        <div style={{ fontSize: 16, fontWeight: "400", color: "#5e5e5e" }}>
          {title}
        </div>
        <hr />
        <h3 style={{ fontSize: 20, fontWeight: "600", color: "#2e2e2e" }}>
          News:
        </h3>
        <div id="perview" style={{ marginLeft: 20 }}></div>
        <hr />
        <h3 style={{ fontSize: 20, fontWeight: "600", color: "#2e2e2e" }}>
          Topic:
        </h3>
        <div style={{ fontSize: 16, fontWeight: "400", color: "#5e5e5e" }}>
          {Topic}
        </div>
        <hr />
        <h3 style={{ fontSize: 20, fontWeight: "600", color: "#2e2e2e" }}>
          Language:
        </h3>
        <div style={{ fontSize: 16, fontWeight: "400", color: "#5e5e5e" }}>
          {Language}
        </div>
        <hr />
        <h3 style={{ fontSize: 20, fontWeight: "600", color: "#2e2e2e" }}>
          keyWord:
        </h3>
        <div
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: "#5e5e5e",
            flexDirection: "row",
          }}
        >
          {keyword.map((e) => {
            return <div>{e},</div>;
          })}
        </div>
      </Modal>
    </>
  );
};

export default Upload;
