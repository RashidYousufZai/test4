import React, { useEffect } from "react";
import "./style/index.css";
import img7 from "../../assets/Rectangle 67.png";
import RelatedNewsCard from "../../Components/DetailsPage";
import { FaUser } from "react-icons/fa6";
import { AiOutlineCalendar } from "react-icons/ai";
import { TiHeartOutline } from "react-icons/ti";
import { RiMessage2Fill } from "react-icons/ri";
import { GrShareOption } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import DetailsNewsCard from "../../Components/DetailsPage/NewsCard";
import DetailsVideoCard from "../../Components/DetailsPage/VideoCard";
import AdCard from "../../Components/Global/AdCard";
import { useLocation } from "react-router-dom";
import { WhatsappShareButton } from "react-share";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../API";

const LivePage = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [Data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    axios.get(`${API_URL}/live`).then((data) => {
      console.log(data?.data);
      setData(data?.data?.reverse()[0]);
    });
  }, []);
  return (
    <div className="detail-page-top-container container2 container3">
      <div className="container-detail-page-left-side">
        <h1 className="details-page-main-heading">
          {Data?.title
            ? Data?.title
            : "100 Hours On, Forces Locked In Jungle Warfare With Terrorists InKashmir"}
        </h1>
        <div className="details-page-top-items">
          <div className="details-page-top-item1">
            <FaUser style={{ marginRight: "10px" }} />
            India
          </div>
          <div className="details-page-top-item2">
            <AiOutlineCalendar size={22} style={{ marginRight: "10px" }} />
            12|08|2023 12:15
          </div>
          <div className="details-page-top-item3">
            <TiHeartOutline style={{ marginRight: "18px" }} />
            <RiMessage2Fill style={{ marginRight: "18px" }} />
            <GrShareOption style={{ marginRight: "18px" }} />
            <WhatsappShareButton url={window.location.href}>
              <BsWhatsapp style={{ marginRight: "18px" }} />
            </WhatsappShareButton>
          </div>
        </div>
        {/* <video className="details-page-main-video" controls>
          <source src={videoPlayer} type="video/mp4" />
          
        </video> */}
        <iframe
          className="details-page-main-video"
          style={{ height: 400 }}
          src={Data?.link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div className="details-main-text-area">
          <div className="details-main-related-new-area-heading">
            Loksatya Articles
          </div>
          <Row gutter={6} style={{ marginTop: "20px" }}>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="details-main-text-area">
          <div className="details-main-related-new-area-heading">
            Loksatya Special
          </div>
          <Row gutter={6} style={{ marginTop: "20px" }}>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="new-detail-area-side-news">
                <div>
                  Rohit Sharma on Friday equalled Virat Kohli in the list of an
                  unwanted record with his two-ball zero against Bangladesh.
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="details-main-related-new-area">
          <div className="details-main-related-new-area-heading">{t("rn")}</div>
          <div className="details-main-related-new-area-cards">
            <DetailsNewsCard />
            <DetailsNewsCard />
            <DetailsNewsCard />
          </div>
        </div>
      </div>
      <div className="container-detail-page-rigth-side">
        <div className="details-page-latest-news">
          <div className="details-main-related-new-area-heading">{t("ln")}</div>
          <div className="details-page-video-cards">
            <DetailsVideoCard />
            <DetailsVideoCard />
            <DetailsVideoCard />
          </div>
        </div>
        <div className="video-page-news-cards">
          <div
            className="item-page-main-area-2-header-strip"
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            <div style={{ marginLeft: 10 }}>{t("rn")}</div>
          </div>
          <RelatedNewsCard />
          <RelatedNewsCard />
          <RelatedNewsCard />
          <RelatedNewsCard />
        </div>
      </div>
    </div>
  );
};

export default LivePage;
