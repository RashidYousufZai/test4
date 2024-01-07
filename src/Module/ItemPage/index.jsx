import React, { useContext, useEffect } from "react";
import "./style/index.css";
import ItemPageCard1 from "../../Components/ItemPage/ItemPageCard1";
import { useTranslation } from "react-i18next";
import ItemPageNewsCard from "../../Components/ItemPage/ItemPageNewsCard";
import ImageCard from "../../Components/MainPage/ImageCard";
import img7 from "../../assets/Rectangle 67.png";
import img6 from "../../assets/Group 50.png";
import SubNewsCard from "../../Components/ItemPage/SubNewsCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Empty, Skeleton, Space } from "antd";
import { Loading } from "../../Context";
import axios from "axios";
import { API_URL } from "../../../API";

const ItemPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { search } = useLocation();
  const [Data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isChange, setIsChange] = useState(true);
  const { loading, setLoading, effect } = useContext(Loading);
  const query = new URLSearchParams(search);
  const navigation = useNavigate();
  console.log(query.get("item"));
  useEffect(() => {
    setIsLoad(true);
    setTimeout(() => {
      axios
        .get(
          `${API_URL}/article?category=${query.get(
            "item"
          )}&pagenation&subCategory=${query.get("sub") ? query.get("sub") : ""}`
        )
        .then((data) => {
          setData(data.data);
          setIsLoad(false);
        })
        .catch(() => {
          setIsLoad(false);
        });
    }, 2000);
  }, [effect]);

  return (
    <>
      <div className="container2 container3">
        <div className="item-page-heading">
          {query?.get("item")}
          {query?.get("sub") && (
            <span style={{ fontSize: 16 }}>/{query?.get("sub")}</span>
          )}
        </div>
        <div className="item-page-main-area">
          <div className="item-page-main-area-1">
            {isLoad ? (
              <>
                <div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Skeleton.Image
                      style={{ height: "180px", width: "260px" }}
                      active={true}
                    />
                    <Skeleton style={{ marginLeft: 10 }} active={isLoad} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Skeleton.Image
                      style={{ height: "180px", width: "260px" }}
                      active={true}
                    />
                    <Skeleton style={{ marginLeft: 10 }} active={isLoad} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Skeleton.Image
                      style={{ height: "180px", width: "260px" }}
                      active={true}
                    />
                    <Skeleton style={{ marginLeft: 10 }} active={isLoad} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Skeleton.Image
                      style={{ height: "180px", width: "260px" }}
                      active={true}
                    />
                    <Skeleton style={{ marginLeft: 10 }} active={isLoad} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Skeleton.Image
                      style={{ height: "180px", width: "260px" }}
                      active={true}
                    />
                    <Skeleton style={{ marginLeft: 10 }} active={isLoad} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Skeleton.Image
                      style={{ height: "180px", width: "260px" }}
                      active={true}
                    />
                    <Skeleton style={{ marginLeft: 10 }} active={isLoad} />
                  </div>
                </div>
              </>
            ) : Data.length > 0 ? (
              Data?.map((item) => {
                let date = new Date(item.date);
                date = JSON.stringify(date).split("T")[0].split('"')[1];
                let title = item.title.split(" ").join("-");
                return (
                  <ItemPageCard1
                    onPress={() => {
                      navigation(`/details/${title}?id=${item._id}`);
                    }}
                    title={item?.title}
                    discription={stripHtmlTags(item?.discription)}
                    image={item?.image}
                    date={date}
                  />
                );
              })
            ) : (
              <div style={{ marginTop: 50 }}>
                <Empty />
              </div>
            )}
          </div>
          <div className="item-page-main-area-2">
            <div className="item-page-main-area-2-header-strip">
              <div style={{ marginLeft: 10 }}>{t("rn")}</div>
            </div>
            <div className="item-page-main-area-2-news-cards">
              <ItemPageNewsCard />
              <ItemPageNewsCard />
              <ItemPageNewsCard />
              <ItemPageNewsCard />
            </div>
            <div className="itempage-main-sub-news-area">
              <SubNewsCard />
              <SubNewsCard />
              <SubNewsCard isVideo={true} />
              <SubNewsCard />
              <SubNewsCard />
            </div>
          </div>
        </div>
      </div>
      <div className="visual-stories-main-container container container3">
        {/* <div className="main-page-technology-heading">{t("vs")}</div>
        <div className="visual-stories-main-container2 container3">
          <div className="visual-stories-main-container-part1">
            <div
              style={{
                margin: "0 7px",
              }}
              className="visual-stories-main-container-main-area"
            >
              <ImageCard
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  height: "60px",
                }}
                height="270px"
                width="250px"
                border="10px"
                img={img6}
                text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preord..."
              />
            </div>
            <div
              style={{
                margin: "0 7px",
              }}
              className="visual-stories-main-container-main-area"
            >
              <ImageCard
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  height: "60px",
                }}
                height="270px"
                width="250px"
                border="10px"
                img={img6}
                text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preord..."
              />
            </div>
            <div
              style={{
                margin: "0 7px",
              }}
              className="visual-stories-main-container-main-area"
            >
              <ImageCard
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  height: "60px",
                }}
                height="270px"
                width="250px"
                border="10px"
                img={img6}
                text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preord..."
              />
            </div>
          </div>
          <div
            className="visual-stories-main-container-part2"
            style={{ width: "500px" }}
          >
            <img src={img7} alt="" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ItemPage;
