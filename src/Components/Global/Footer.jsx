import React, { useContext, useEffect, useState } from "react";
import "./style/index.css";
import logo from "../../assets/footer.svg";
import Accordin from "./Accordin";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_URL } from "../../../API";
import { Loading } from "../../Context";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const { loading, setLoading, setEffect, effect } = useContext(Loading);
  const [itsItem, setItsItem] = useState([]);
  const [CategoryOptions, setCategoryOptions] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const Navigation = useNavigate();

  console.log(CategoryData, CategoryOptions)

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
  }, []);

  // useEffect(() => {
  //   axios.get(`${API_URL}/subcategory?category=${selectedCategory}`).then((content) => {
  //     let arr = [];
  //     for (let i = 0; i < content.data.length; i++) {
  //       const element = content.data[i];
  //       arr.push({
  //         key: element._id,
  //         label: element.text,
  //       });
  //     }
  //     setCategoryOptions(arr);
  //   });
  // }, [])

  useEffect(() => {
    axios
      .get(`${API_URL}/content?type=category`)
      .then((data) => {
        let arr = [];

        for (
          let index = 0;
          index < (data.data.length <= 5 ? Number(data.data.length) : 5);
          index++
        ) {
          const element = data.data[index];

          arr.push(element);
        }
        setItsItem(arr);
        
      })
      .catch((err) => {
      });
  }, []);
  return (
    !loading && (
      <div className="footer-main-container">
        <div className="footer-area-main-accordin">
          <Accordin
            title="technology"
            items={[
              "something new",
              "gadget",
              "artificial intelligent",
              "future tech",
              "upcoming tech",
            ]}
          />
          <Accordin
            title="business"
            items={["start-up", "employees", "success", "videos", "videos"]}
          />
          <Accordin
            title="travel"
            items={["culture", "hotel", "food & stay", "stay", "videos"]}
          />
          <Accordin
            title="sports"
            items={["gadget", "gadget", "gadget", "gadget", "gadget"]}
          />
          <Accordin
            title="states"
            items={["gadget", "gadget", "gadget", "gadget", "gadget"]}
          />
          <Accordin
            title="entertainment"
            items={["gadget", "gadget", "gadget", "gadget", "gadget"]}
          />
          <Accordin
            title="special"
            items={["gadget", "gadget", "gadget", "gadget", "gadget"]}
          />
          <Accordin
            title="whether"
            items={["gadget", "gadget", "gadget", "gadget", "gadget"]}
          />
          <Accordin
            title="extra"
            items={["gadget", "gadget", "gadget", "gadget", "gadget"]}
          />
          <Accordin
            title="foreign"
            items={["gadget", "gadget", "gadget", "gadget", "gadget"]}
          />
        </div>
        <div className="footer-checkup-main-conatiner">
          <div className="footer-main">
            {itsItem.map((item) => {
              let arr = [];
              axios
                .get(`${API_URL}/subcategory?category=${item.text}`)
                .then((data) => {
                  for (let i = 0; i < 5; i++) {
                    const element = data.data[i];
                    arr.push(element);
                  }
                });
              return (
                <div className="footer-item-box" key={item._id}>
                  <div
                    className="footer-heading"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Navigation(`/itempage?item=${item.text}`);
                      setEffect(!effect);
                    }}
                  >
                    {item?.text}
                  </div>
                  <div className="footer-items">
                    <div>{arr[0]?.text}</div>
                    <div>{arr[1]?.text}</div>
                    <div>{arr[2]?.text}</div>
                    <div>{arr[3]?.text}</div>
                    <div>{arr[4]?.text}</div>
                  </div>
                </div>
              );
            })}
            {/* <div className="footer-item-box">
            <div className="footer-heading">business</div>
            <div className="footer-items">
              <div>start-up</div>
              <div>employees </div>
              <div>success </div>
              <div>videos </div>
              <div>videos </div>
            </div>
          </div>
          <div className="footer-item-box">
            <div className="footer-heading">travel</div>
            <div className="footer-items">
              <div>culture</div>
              <div>hotel </div>
              <div>food & stay </div>
              <div>stay </div>
              <div>videos </div>
            </div>
          </div>
          <div className="footer-item-box">
            <div className="footer-heading">sports</div>
            <div className="footer-items">
              <div>cricket</div>
              <div>tennis </div>
              <div>football </div>
              <div>racing </div>
              <div>esports </div>
            </div>
          </div>
          <div className="footer-item-box">
            <div className="footer-heading">states</div>
            <div className="footer-items">
              <div>bihar</div>
              <div>uttar pradesh </div>
              <div>haryana </div>
              <div>delhi </div>
              <div>Uttarakhand </div>
            </div>
          </div> */}
          </div>
          <div className="footer-main">
            <div className="footer-item-box">
              <div className="footer-heading">{CategoryData[5]?.label}</div>
              {/* <div className="footer-items">
                <div>{CategoryData[1]?.label}</div>
                <div>{CategoryData[2]?.label} </div>
                <div>{CategoryData[3]?.label} </div>
                <div>{CategoryData[4]?.label} </div>
                <div>{CategoryData[5]?.label} </div>
              </div> */}
            </div>
            <div className="footer-item-box">
              <div className="footer-heading">{CategoryData[6]?.label}</div>
              {/* <div className="footer-items">
                <div>with us</div>
                <div>on earth </div>
                <div>independence </div>
                <div>inside asia </div>
                <div>return back </div>
              </div> */}
            </div>
            <div className="footer-item-box">
              <div className="footer-heading">{CategoryData[7]?.label}</div>
              {/* <div className="footer-items">
                <div>environment</div>
                <div>wind tracker </div>
                <div>wildlife </div>
                <div>earth quick </div>
                <div>videos </div>
              </div> */}
            </div>
            <div className="footer-item-box">
              <div className="footer-heading">{CategoryData[8]?.label}</div>
              {/* <div className="footer-items">
                <div>designs</div>
                <div>membership </div>
                <div>investment </div>
                <div>bulletin </div>
                <div>support us </div>
              </div> */}
            </div>
            <div className="footer-item-box">
              <div className="footer-heading">{CategoryData[9]?.label}</div>
              {/* <div className="footer-items">
                <div>america</div>
                <div>russia </div>
                <div>bhutan</div>
                <div>japan </div>
                <div>nepal </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="footer-line"></div>
        <div className="footer-middle-container">
          <div className="footer-middle-area">
            <div className="footer-img">
              <img src={logo} alt="" className="footer-img" />
            </div>
            <div className="footer-middle-right">
              <div className="footer-middle-right-heading">{t("list")}</div>
              <div className="footer-middle-right-text">
                Stay updated with our weekly newsletter, delivered to your
                inbox. Don't miss out on any updates, stories or events around
                the world.
              </div>
              <div
                style={{
                  display: "flex",
                }}
                className="footer-last-bottom"
              >
                <input
                  type="text"
                  className="footer-input"
                  placeholder="name@email.com"
                />
                <div className="footer-input-button">Subscribe Now</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-line"></div>
        <div className="footer-bottom">
          <div className="footer-bottom-text">copyright @2023 lokshatya</div>
          <div className="footer-bottom-text">all rights reserve</div>
        </div>
      </div>
    )
  );
};

export default Footer;
