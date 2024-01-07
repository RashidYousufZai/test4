import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  message,
} from "antd";
import axios from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import JoditEditor from "jodit-react";
import { OnEdit as onEditContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../API";
const BreakingNews = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [type, setType] = useState("img");
  const [Topic, setTopic] = useState(null);
  const [desc, setdesc] = useState("");
  const [reported, setreported] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [comment, setComment] = useState(false);
  const [role, setRole] = useState("");
  const [subCategoryData, setSubCategoryData] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [usercategoryData, setuserCategoryData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [userCategoryOptions, setUserCategoryOptions] = useState([]);
  const [admincategoryData, setadminCategoryData] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [publish, setpublish] = useState("");
  const [Language, setLanguage] = useState("English");
  const [newType, setNewType] = useState("breakingNews");
  const [keyword, setkeyword] = useState([]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [dataImage, setdataImage] = useState(null);
  const options = [];
  const { onEdit, setOnEdit, id } = useContext(onEditContext);
  const [Update, setUpdate] = useState(false);
  const navigation = useNavigate();

  const handleCategoryChange = (selectedCategory) => {
    // Fetch subcategories based on the selected category
    axios.get(`${API_URL}/subcategory?category=${selectedCategory}`).then((content) => {
      let arr = [];
      for (let i = 0; i < content.data.length; i++) {
        const element = content.data[i];
        arr.push({
          key: element._id,
          label: element.text,
        });
      }
      setCategoryOptions(arr);
    });
  };
  

  const onTitleInput = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    // Update slug in real-time
    setSlug(newTitle.toLowerCase().replace(/\s+/g, "-"));
  };

  const onChange = (checked) => {
    setComment(checked);
  };

  const onSlugChange = (event) => {
    // Set a flag to indicate that slug was manually edited
    setIsSlugManuallyEdited(true);
    setSlug(event.target.value);
  };

  useEffect(() => {
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
        console.log(user);
        setpublish(user.data[0].email);
        // setCategoryData(user.data[0].acsses);
        console.log(user?.data[0]?.acsses);
        setRole(user.data[0].role);
        setUserCategoryOptions(user?.data[0]?.selectedKeywords || []);
        console.log(userCategoryOptions);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get(`${API_URL}/subcategory?category=${Topic}`).then((content) => {
      let arr = [];
      for (let i = 0; i < content.data.length; i++) {
        const element = content.data[i];
        arr.push({
          key: element._id,
          value: element.text,
          label: element.text,
        });
      }
      setCategoryOptions(arr);
    });
    console.log(categoryData);
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
        setpublish(data?.publishBy), setreported(data?.reportedBy);
        setNewType(data?.newsType);
      });
    }
  }, [onEdit]);

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const showVerifyModal = () => {
    setIsVerifyModalOpen(true);
    document.getElementById("perview").innerHTML = desc;
  };
  const handleVerifyCancel = () => {
    setIsVerifyModalOpen(false);
  };
  const editor = useRef(null);
  console.log(desc);
  const onUpload = () => {
    // console.log(
    //   { title: title,
    //     discription: desc,
    //     topic: Topic,
    //     keyWord: keyword,}
    // )
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
          comment: comment,
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
          setpublish("");
          setreported("");
          setNewType("");
        })
        .catch(() => {
          message.error("Your article was not successfully Uploaded");
        });
      setIsVerifyModalOpen(false);
    });
  };
  const onEditHandle = async () => {
    if (Update) {
      let formdata = new FormData();
      formdata.append("file", img, img.name);
      console.log(formdata);

      axios.post(`${API_URL}/image`, formdata).then(async (image) => {
        setdataImage(image.data.image);
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
            setpublish("");
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
        {onEdit ? "Edit Article" : "Breaking News"}
      </h1>
      <Row gutter={24}>
        <Col span={24}>
          <Card style={{ minHeight: "80vh", height: "100%" }}>
            <Row gutter={24}>
              {/* First column - 25% width */}
              <Col span={6}>
                <Input
                  type="file"
                  name="file"
                  id="file-name"
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
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
                    backgroundColor: "rgba(0,0,0,0.1)",
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
                      Upload image here
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
              {/* Second column - 25% width */}
              {onEdit ? (
                <Col span={6}>
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
              ) : (
                <></>
              )}

              {/* Third and Fourth columns - 75% width */}
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
                  {/* Third column - 50% width */}
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
                      value={Topic || undefined}
                      placeholder="Category"
                      onChange={(e) => {
                        setTopic(e);
                        handleCategoryChange(e); // Call the function to fetch subcategories
                      }}
                      style={{ width: "100%" }}
                      options={
                        role === "admin"
                          ? categoryData.map((category) => ({
                              value: category?.value,
                              label: category?.label,
                            }))
                          : userCategoryOptions.map((category) => ({
                              value: category.value,
                              label: category.value,
                            }))
                      }
                    />
                  </Col>
                  {console.log(categoryData)}

                  {console.log(categoryData, userCategoryOptions)}

                  <Col span={12}>
                    <Select
                      placeholder="Sub Category"
                      onChange={(value) => setSubcategory(value)}
                      value={subCategory ? subCategory : null}
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                      }}
                      options={categoryOptions.map((option) => ({
                        value: option.value,
                        label: option.label,
                      }))}
                    />
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
            </Row>

            <Row gutter={20}>
              <Col span={24} style={{ marginTop: "20px" }}>
                <JoditEditor
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
                  options={options}
                />
                <div style={{ marginBottom: "20px" }}></div>
              </Col>
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
                <Input
                  placeholder="Publish By"
                  value={publish}
                  onChange={(e) => setpublish(e.target.value)}
                />
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
          {keyword.map((e, index) => {
            return <div key={index}>{e},</div>;
          })}
        </div>
      </Modal>
    </>
  );
};

export default BreakingNews;
