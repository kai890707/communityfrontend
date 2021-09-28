import React, {useState, useEffect} from 'react';
import {
    Container,
    Row,
    Col,
    FloatingLabel,
    Form,
    Button,
    Collapse,
    Nav,
    OverlayTrigger,
    Popover 
} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
  useLocation,
    useParams
} from "react-router-dom";
import './Layout.scss';
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe} from '../Api/Api';
const Layout = () => {
    const [openArticle,
        setOpenArticle] = useState(false);
    const [openPage,
        setOpenPage] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const handleLogout = () => {
            setAuthToken("");
            // if (location.pathname !== "/") {
              history.push("/");
            // }
          };
    return (
        <div className="col-auto col-md-1 col-xl-1 px-sm-2 px-0 sidebar-bg-color shadow-sm">
         
            <div
                className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <div
                 
                    className="d-flex align-items-center  pb-3 mb-md-0 me-md-auto text-white text-decoration-none w-100 text-center">
                    <span className="fs-6 d-none d-sm-inline  pt-3 text-white fw-bold">社區後臺管理</span>
                </div>
                <ul
                    className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu">
                    <li className="nav-item mt-2 mb-2">
                        <a href="/backend" className="nav-link align-middle px-0 option-text"title="首頁">
                            <i className="fs-6  far fa-home "></i>
                            <span className="fs-6 ms-2 d-none d-sm-inline ">首頁</span>
                        </a>
                    </li>
                    <li className=" mt-2 mb-2">
                        <Nav.Link
                           
                            className="align-middle px-0 option-text"
                            onClick={() => setOpenArticle(!openArticle)}
                            aria-controls="example-collapse-article"
                            aria-expanded={openArticle} title="社區公告">
                            <i className="fs-6 fas fa-bullhorn"></i>
                            <span className="fs-6  ms-2 d-none d-sm-inline">社區公告</span>
                        </Nav.Link>
                        <Collapse in={openArticle}>
                            <div id="example-collapse-article">
                                <ul className=" nav flex-column ms-1 " id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100 ">
                                        <Link to="announcementList" className="nav-link px-0 option-text"  title="社區公告列表">
                                            <i className="fas fa-list-ul sidebar-suboption-fs"></i>
                                            <span className="d-none d-sm-inline sidebar-suboption-fs ms-2">公告列表</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="addAnnouncement" className="nav-link px-0 option-text" title="新增社區公告">
                                            <i className="fas fa-plus-circle sidebar-suboption-fs"></i>
                                            <span className="d-none d-sm-inline sidebar-suboption-fs ms-2">新增公告</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Collapse>
                    </li>
                  
                    <li className=" mt-2 mb-2">
                        <Nav.Link
                            className="align-middle px-0 option-text"
                            onClick={() => setOpenPage(!openPage)}
                            aria-controls="example-collapse-text"
                            aria-expanded={openPage}
                            title="頁面管理">
                            
                            <i className="fs-6  fas fa-paste"></i>
                            <span className="fs-6  ms-2 d-none d-sm-inline">頁面管理</span>
                        </Nav.Link>
                        <Collapse in={openPage}>
                            <div id="example-collapse-text">
                                <ul className=" nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0 option-text"  title="地方特色頁面管理">
                                            <i className="far fa-lightbulb fs-6"></i>
                                            <span className="sidebar-suboption-fs d-none d-sm-inline ms-2">地方特色</span>
                                        </a>
                                    </li>
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0 option-text"  title="地方特產文章管理">
                                            <i className="far fa-apple-crate sidebar-suboption-fs"></i>
                                            <span className="sidebar-suboption-fs d-none d-sm-inline  ms-2">地方特產</span>
                                        </a>
                                    </li>
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0 option-text"  title="地方景點文章管理">
                                            <i className="fas fa-map-marker-alt sidebar-suboption-fs"></i>
                                            <span className=" sidebar-suboption-fs d-none d-sm-inline ms-2">地方景點</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Collapse>
                    </li>

                    <li className=" mt-2 mb-2 ">
                        <Link to="/config" className="nav-link px-0 align-middle option-text"  title="網站設定">
                            <i className="fs-6 far fa-browser"></i>
                            <span className="fs-6 ms-2 d-none d-sm-inline">網站設定</span>
                        </Link>
                    </li>
                     <li className=" mt-2 mb-2 ">
                        <Link to="accountConfig" className="nav-link px-0 align-middle option-text" title="帳號設定">
                            <i className="fs-6  fas fa-cogs"></i>
                            <span className="fs-6  ms-2 d-none d-sm-inline">帳號設定</span>
                        </Link>
                    </li>
                    <li className=" mt-2 mb-2 ">
                        <Link to="" onClick={handleLogout} className="nav-link px-0 align-middle option-text" title="登出">
                            <i className="fs-6  fas fa-sign-out-alt"></i>
                            <span className="fs-6  ms-2 d-none d-sm-inline">登出</span>
                    </Link>
                    </li>
                </ul>
                <hr/>
                {/* <div className="w-100 d-flex justify-content-center">
                     <Link to="" className="nav-link px-0 align-middle option-text" title="登出">
                            <i className="fs-4  fas fa-sign-out-alt"></i>
                            <span className="fs-4  ms-2 d-none d-sm-inline">登出</span>
                    </Link>
                </div> */}
            </div>
        </div>
      
    );
}
export default Layout;