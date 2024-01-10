import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import axios from "axios";
import { OnEdit } from "../../Context";
import { API_URL } from "../../../API";
import { RiAdminFill } from "react-icons/ri";
import { BiRadioCircleMarked } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegWindowRestore } from "react-icons/fa";
import { LiaAdSolid } from "react-icons/lia";
import { AiOutlineComment } from "react-icons/ai";
import { CgPoll } from "react-icons/cg";
import { MdUploadFile, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { RiLiveLine } from "react-icons/ri";

// Placeholder components for each route
const YourDashboardIconComponent = () => (
  <>
    <MdOutlineArticle size={25} style={{ margin: "5px" }} />
  </>
);
const YourUsersIconComponent = () => (
  <>
    <MdOutlineCreateNewFolder size={25} style={{ margin: "5px" }} />
  </>
);
const YourTopStoriesIconComponent = () => (
  <>
    <FaRegWindowRestore size={20} style={{ margin: "5px" }} />
  </>
);
const YourBreakingNewsIconComponent = () => (
  <>
    <FaRegNewspaper size={20} style={{ margin: "5px" }} />
  </>
);
const YourUploadIconComponent = () => (
  <>
    <MdUploadFile size={25} style={{ margin: "5px" }} />
  </>
);
const YourCreateUserIconComponent = () => (
  <>
    <MdOutlineCreateNewFolder size={25} style={{ margin: "5px" }} />
  </>
);
const YourContentIconComponent = () => (
  <>
    <MdOutlineCreateNewFolder size={25} style={{ margin: "5px" }} />
  </>
);
const YourAdsIconComponent = () => (
  <>
    <LiaAdSolid size={25} style={{ margin: "5px" }} />
  </>
);
const YourCommentIconComponent = () => (
  <>
    <AiOutlineComment size={25} style={{ margin: "5px" }} />
  </>
);
const YourLiveIconComponent = () => (
  <>
    <RiLiveLine size={25} style={{ margin: "5px" }} />
  </>
);
const YourPollIconComponent = () => (
  <>
    <CgPoll size={25} style={{ margin: "5px" }} />
  </>
);

const SideBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("");
  const [access, setAccess] = useState([]);
  const { setOnEdit } = useContext(OnEdit);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_URL}/user?id=${localStorage.getItem("id")}`)
      .then((user) => {
        console.log(user.data, "d");
        setRole(user.data[0].role);
        setAccess(user?.data[0]?.acsses);
        if (user.data[0].role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [location]);

  const routeLabels = {
    dashboard: "Articles",
    users: "Users",
    topstories: "Top Stories",
    breakingnews: "Breaking News",
    upload: "Upload",
    creatuser: "Create User",
    content: "Tags&Category",
    ads: "Advertisement",
    comment: "Comments",
    live: "Live",
    poll: "Poll",
    flashnews: "Flash News",
    sociallink: "Social Link",
    stories: "Visual Stories",
  };

  const desiredOrder = [
    "dashboard",
    "users",
    "topstories",
    "breakingnews",
    "upload",
    "creatuser",
    "flashnews",
    "sociallink",
    "content",
    "ads",
    "comment",
    "live",
    "poll",
    "stories",
  ];

  const sortedAccess = access.filter((route) => desiredOrder.includes(route));

  const renderMenuItem = (key, route, to, icon) => {
    const handleClick = () => {
      if (route === "topstories" || route === "breakingnews" || route === "upload") {
        window.location.reload(true);
      }
    };
    return (
      <Menu.Item key={key} icon={icon} onClick={handleClick}>
        <Link
          style={{
            textTransform: "uppercase",
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "Poppins",
          }}
          to={to}
        >
          {routeLabels[route] || route}
        </Link>
      </Menu.Item>
    );
  };

  return (
    <Menu theme="dark" mode="inline">
      {sortedAccess.map((route, index) => {
        let icon;
        switch (route) {
          case "dashboard":
            icon = <YourDashboardIconComponent />;
            break;
          case "users":
            icon = <YourUsersIconComponent />;
            break;
          case "topstories":
            icon = <YourTopStoriesIconComponent />;
            break;
          case "breakingnews":
            icon = <YourBreakingNewsIconComponent />;
            break;
          case "upload":
            icon = <YourUploadIconComponent />;
            break;
          case "creatuser":
            icon = <YourCreateUserIconComponent />;
            break;
          case "flashnews":
            icon = <YourCreateUserIconComponent />;
            break;
          case "sociallink":
              icon = <YourCreateUserIconComponent />;
              break;
          case "content":
            icon = <YourContentIconComponent />;
            break;
          case "ads":
            icon = <YourAdsIconComponent />;
            break;
          case "comment":
            icon = <YourCommentIconComponent />;
            break;
          case "live":
            icon = <YourLiveIconComponent />;
            break;
          case "poll":
            icon = <YourPollIconComponent />;
            break;
          default:
            icon = <BiRadioCircleMarked size={25} />;
            break;
        }

        return renderMenuItem(index, route, `/dashboard/${route}`, icon);
      })}

      <Menu.Item
        style={{
          position: "absolute",
          bottom: 40,
        }}
        onClick={() => {
          localStorage.clear();
        }}
        key="four"
        icon={<CiLogout size={25} />}
      >
        <Link
          style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
          to="/"
        >
          LogOut
        </Link>
      </Menu.Item>
      <Menu.Item
        style={{
          position: "absolute",
          bottom: 0,
        }}
        key="ten"
        icon={<RiAdminFill size={22} />}
      >
        <div
          style={{
            textTransform: "uppercase",
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "Poppins",
          }}
        >
          {role}
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;
