import { useState, useEffect } from "react";
import { Layout } from "antd";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "../../../Components/AdminComponets/SideBar";
import AdminTable from "../pages/Table";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import CreateUser from "../pages/CreateUser";
import TopStories from "../pages/TopStories";
import BreakingNews from "../pages/BreakingNews";
import Report from "../Report";
import TagsAndCategory from "../pages/TagsAndCategory";
import Ads from "../pages/Ads";
import Comments from "../pages/Comments";
import Live from "../pages/Live";
import Poll from "../pages/Poll";
import { API_URL } from "../../../../API";
import FlashNews from "../pages/FlashNews";
import VisualStories from "../pages/VisualStories";
import PhotoGalery from "../pages/PhotoGalery";
import VideoGalery from "../pages/VideoGalery";
import SocialMediaLink from "../pages/SocialMediaLink";

const { Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  height: "100%",
  minHeight: "100vh",
  color: "#fff",
  padding: "20px",
};

const siderStyle = {
  minHeight: "100vh",
  height: "100%",
  position: "fixed",
  zIndex: 1,
  overflowY: "auto",
};

const siderStyle2 = {
  minHeight: "100vh",
  height: "100%",
};

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [access, setAccess] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/user?id=${localStorage.getItem("id")}`)
      .then((user) => {
        if (user.data[0].role === "admin") {
          setAccess(user?.data[0]?.acsses);
          // setAccess([
          //   "users",
          //   "upload",
          //   "topstories",
          //   "breakingnews",
          //   "report",
          //   "content",
          //   "live",
          //   "ads",
          //   "comment",
          //   "poll",
          //   "creatuser",
          //   "dashboard",
          // ]);
        } else {
          setAccess(user?.data[0]?.acsses);
        }
      });
  }, [location]);

  return (
    <Layout>
      <Sider style={siderStyle}>
        <SideBar />
      </Sider>
      <Sider style={siderStyle2}></Sider>
      <Content style={contentStyle}>
        <Routes>
          <Route
            path="dashboard/upload"
            element={
              // Only allow access if the query parameter "edit" is set to "true"
              location.search.includes("edit=true") ? (
                <Upload />
              ) : (
                <div style={{ color: "black" }}>No Access</div>
              )
            }
          />
          <Route path={"dashboard"} element={<Dashboard />} />
          {access.map((path) => {
            switch (path) {
              case "users":
                return (
                  <Route key={path} path={path} element={<AdminTable />} />
                );
              case "upload":
                return <Route key={path} path={path} element={<Upload />} />;
              case "topstories":
                return (
                  <Route key={path} path={path} element={<TopStories />} />
                );
              case "breakingnews":
                return (
                  <Route key={path} path={path} element={<BreakingNews />} />
                );
              case "photogalery":
                return (
                  <Route key={path} path={path} element={<PhotoGalery />} />
                );
              case "videogalery":
                return (
                  <Route key={path} path={path} element={<VideoGalery />} />
                );
              case "report":
                return <Route key={path} path={path} element={<Report />} />;
              case "content":
                return (
                  <Route key={path} path={path} element={<TagsAndCategory />} />
                );
              case "live":
                return <Route key={path} path={path} element={<Live />} />;
              case "stories":
                return (
                  <Route key={path} path={path} element={<VisualStories />} />
                );
              case "ads":
                return <Route key={path} path={path} element={<Ads />} />;
              case "comment":
                return <Route key={path} path={path} element={<Comments />} />;
              case "poll":
                return <Route key={path} path={path} element={<Poll />} />;
              case "flashnews":
                return <Route key={path} path={path} element={<FlashNews />} />;
              case "sociallink":
                return (
                  <Route key={path} path={path} element={<SocialMediaLink />} />
                );
              case "creatuser":
                return (
                  <Route key={path} path={path} element={<CreateUser />} />
                );
              default:
                return null; // Handle unknown paths if necessary
            }
          })}
          <Route
            path="*"
            element={<div style={{ color: "black" }}>No Access</div>}
          />
        </Routes>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
