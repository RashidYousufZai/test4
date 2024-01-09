import React, { useEffect } from "react";
import "./style/index.css";
import DetailImg from "../../assets/detailsPage.png";
import RelatedNewsCard from "../../Components/DetailsPage";
import { FaUser } from "react-icons/fa6";
import { AiOutlineCalendar, AiFillHeart } from "react-icons/ai";
import { TiHeartOutline } from "react-icons/ti";
import { RiMessage2Fill } from "react-icons/ri";
import { GrShareOption } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import DetailsNewsCard from "../../Components/DetailsPage/NewsCard";
import DetailsVideoCard from "../../Components/DetailsPage/VideoCard";
import AdCard from "../../Components/Global/AdCard";
import { TwitterEmbed, InstagramEmbed } from "react-social-media-embed";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  WhatsappShareButton,
} from "react-share";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Col, Input, Modal, Row, Spin, message } from "antd";
import { Loading } from "../../Context";
import { useContext } from "react";
import { API_URL } from "../../../API";
import StoriesCard from "../../Components/MainPage/StoriesCard";
const { TextArea } = Input;
const DetailsPage = () => {
  const { pathname, search } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [data, setData] = useState(null);
  const [article, setArticle] = useState(null);
  

  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [userData, setUserData] = useState([]);
  const [breakingNews, setbreakingNews] = useState([]);
  const [socialedia, setsocialedia] = useState([]);
  const [ArticleData, setArticleData] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { loading, setLoading, effect } = useContext(Loading);
  const query = new URLSearchParams(search);
  console.log(query.get("id"));

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/sociallink`);
      setsocialedia(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(socialedia);

  useEffect(() => {
    axios.get(`${API_URL}/article`).then((article) => {
      setArticleData(article?.data);
      console.log(ArticleData);
    });
  }, [axios]);
  console.log(ArticleData);
  
  

  useEffect(() => {
    console.log("heee");
    axios
      .get(`${API_URL}/article?id=${query.get("id")}`)
      .then(async (article) => {
        setArticle(article);
        // let title = article.data[0].title.split(" ").join("-");
        console.log(article.data[0], "art");
        setLoading(false);
        setData(article.data[0]);
        // navigation(`/details/${title}`);
        document.getElementById("parar").innerHTML =
          article?.data[0].discription;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `${API_URL}/article?pagenation=true&limit=6&type=img&newsType=${article?.data[0]?.newsType}&status=online`
      )
      .then((data) => {
        setbreakingNews(data?.data);
        console.log(data);
      })
      .catch(() => {});
  }, [])
  console.log(breakingNews);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/comment?id=${query.get("id")}`).then((res) => {
      console.log(res.data);
      setData2(res.data);
    });
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const onAdd = () => {
    setLoading2(true);
    console.log(
      { email: Email, name, message: comment, postId: data._id },
      "dd"
    );
    axios
      .post(`${API_URL}/comment`, {
        email: Email,
        name,
        message: comment,
        postId: data._id,
      })
      .then((users) => {
        setUserData(users.data.data);
        message.success("Successfully Added");
        handleCancel();
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Successfully Not Added");
        setLoading2(false);
        message.success("Successfully Added");
      });
  };
  console.log(data?.publishBy);
  return (
    <>
      <div className="detail-page-top-container container2 container3">
        <div className="container-detail-page-left-side">
          <h1 className="details-page-main-heading">{data?.title}</h1>
          <div className="details-page-top-items">
            <div className="details-page-top-item1">
              <FaUser style={{ marginRight: "10px" }} />
              {data?.publishBy
                ? data?.publishBy.replace(/\d+/g, "").split("@")[0]
                : "Admin"}

              {/* {data?.publishBy} */}
              {console.log(data?.publishBy)}
            </div>
            <div className="details-page-top-item2">
              <AiOutlineCalendar size={22} style={{ marginRight: "10px" }} />
              12|08|2023 12:15
            </div>
            <div className="details-page-top-item3">
              {isFav ? (
                <>
                  <AiFillHeart
                    style={{ marginRight: "18px" }}
                    color="red"
                    onClick={() => setIsFav(!isFav)}
                  />
                </>
              ) : (
                <TiHeartOutline
                  style={{ marginRight: "18px" }}
                  onClick={() => setIsFav(!isFav)}
                />
              )}
              <RiMessage2Fill style={{ marginRight: "18px" }} />
              <div style={{ position: "relative" }}>
                <GrShareOption
                  style={{ marginRight: "18px", cursor: "pointer" }}
                  onClick={() => setIsOpen(!isOpen)}
                />
                <div
                  style={{
                    position: "absolute",
                    height: "30px",
                    width: "100px",
                    backgroundColor: "#5a5a5a",
                    borderRadius: 100,
                    bottom: -40,
                    left: -20,
                    alignItems: "center",
                    justifyContent: "space-around",
                    display: isOpen ? "flex" : "none",
                    paddingTop: 10,
                  }}
                >
                  <FacebookMessengerShareButton url={window.location.href}>
                    <FacebookIcon size={25} />
                  </FacebookMessengerShareButton>
                  <EmailShareButton url={window.location.href}>
                    <EmailIcon size={25} />
                  </EmailShareButton>
                </div>
              </div>
              <WhatsappShareButton url={window.location.href}>
                <BsWhatsapp style={{ marginRight: "18px" }} />
              </WhatsappShareButton>
            </div>
          </div>
          <img
            src={data ? data?.image : DetailImg}
            alt=""
            className="details-page-main-img"
          />
          <div className="details-main-text-area">
            <div className="details-main-text-area-heading">{data?.title}</div>
            <div className="deatils-main-para-area" id="parar"></div>
          </div>
          <div className="details-main-related-new-area">
            <div className="details-main-related-new-area-heading">
              {t("rn")}
            </div>
            <div
              className="details-main-related-new-area-cards"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {socialedia
                  .filter((item) => item.status === "active")
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item?._id}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginRight: 5,
                      }}
                    >
                      {item?.platform === "Instagram" ? (
                        <InstagramEmbed url={item?.link} width={328}  height={310}/>
                      ) : (
                        <TwitterEmbed url={item?.link} width={325} height={310}/>
                      )}
                    </div>
                  ))}
              </div>

              {/* <DetailsNewsCard />
              <DetailsNewsCard />
              <DetailsNewsCard /> */}
            </div>
          </div>
          <div className="detalis-page-commment-area1">
            <div className="details-main-related-new-area-heading">
              <span>{t("to")} :</span> {data?.topic}
            </div>
            {data?.comment ? (
              <div className="details-comment-area">
                <div
                  className="comment-button"
                  style={{ cursor: "pointer" }}
                  onClick={showModal}
                >
                  <FaRegComment style={{ marginRight: "10px" }} /> Comment
                </div>
              </div>
            ) : (
              <></>
            )}
            {data2.map(({ name, message }) => {
              return (
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "25px",
                        fontFamily: "Poppins",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        padding: "10px 20px",
                        display: "flex",
                        height: 30,
                      }}
                    >
                      {data2 && name[0].toUpperCase()}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontFamily: "Poppins",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      padding: "5px 10px",
                      width: "200px",
                      display: "flex",
                      marginLeft: 10,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontFamily: "Poppins",
                          fontWeight: "600",
                        }}
                      >
                        {data2 && name.toUpperCase()}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontFamily: "Poppins",
                        }}
                      >
                        {data2 && message}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container-detail-page-rigth-side">
          <div className="details-page-related-news">
            <div className="details-page-related-news-heading">{t("rn")}</div>
          </div>
          <div className="detail-page-relate-new-cards">
            {/* <RelatedNewsCard /> */}
            {/* <RelatedNewsCard />
            <RelatedNewsCard />
            <RelatedNewsCard />
            <RelatedNewsCard />
            <RelatedNewsCard /> */}
            {breakingNews?.map((data, index) => {
                let title = data.title?.split(" ").join("-");

                if (title) {
                  return (
                    <StoriesCard
                      data={data}
                      key={index}
                      OnPress={() =>
                        navigation(`/details/${title}?id=${data?._id}`)
                      }
                      image={data?.image}
                      text={data?.title}
                    />
                  );
                } else {
                  console.error("Title is undefined or null for data:", data);
                  return null;
                }
              })}
            
          </div>
          <div className="details-page-latest-news">
            <div className="details-main-related-new-area-heading">
              {t("ln")}
            </div>
            <div className="details-page-video-cards">
              <DetailsVideoCard />
              <DetailsVideoCard />
            </div>
          </div>
          <div className="details-main-ad-cards">
            <AdCard />
            <AdCard />
          </div>
        </div>
        <div className="detalis-page-commment-area2">
          <div className="details-main-related-new-area-heading">
            <span>{t("to")} :</span> Terror Attack
          </div>
          {data?.comment ? (
            <div className="details-comment-area">
              <div
                className="comment-button"
                style={{ cursor: "pointer" }}
                onClick={showModal}
              >
                <FaRegComment style={{ marginRight: "10px" }} /> Comment
              </div>
            </div>
          ) : (
            <></>
          )}
          <div>
            <div>{data2 && data2[0]?.name}</div>
          </div>
        </div>
      </div>
      <Modal
        title="Comment"
        open={isModalOpen}
        onOk={onAdd}
        onCancel={() => (loading2 ? () => {} : handleCancel())}
        okText="Let`s Comment"
        confirmLoading={loading2}
      >
        <Row gutter={12} style={{ marginTop: "10px" }}>
          <Col span={12}>
            <Input
              size="large"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col span={12}>
            <Input
              size="large"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col span={24} style={{ marginTop: "20px" }}>
            <TextArea
              style={{ resize: "none" }}
              rows={5}
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DetailsPage;
