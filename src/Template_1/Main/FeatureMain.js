


import { Navbar, Container, NavDropdown, Nav,Row,Col } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import './Main.scss';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
const Layout = ({ data }) => {
    // const theme = useContext(Content);
    const MainData = data.data;
    const list = data.data.list;
    // console.log(theme.history.location.pathname);
    return (
        <Container className="main-feature ">
            {
                // console.log(list.length)
                list.map((item, i) => {
                    console.log(i);
                   return (i % 2 == 0) ? (
                        <Row className="main-feature-row animate__animated animate__backInRight">
                            <Col md={{span:6,order: 1}} xs={{span:12,order: 2}}  className="d-flex justify-content-center align-items-center  z-2">
                                <div className="main-feature-text-content ">
                                    <h2 className="text-center">{item.title}</h2>
                                    <p>{item.content}</p>
                            </div>
                            </Col>
                            <Col md={{span:6,order: 2}} xs={{span:12,order: 1}}  className="d-flex justify-content-center align-items-center z-2 order-xs-1">
                                <figure className="main-feature-img">
                                    <img src={item.image} alt="" className="img-fluid"></img>
                                </figure>
                            </Col>
                        </Row>
                    ) : (
                        <Row className="main-feature-row animate__animated animate__backInLeft">
                            <Col md={{span:6,order: 1}}  xs={{span:12,order: 1}}  className="d-flex justify-content-center align-items-center z-2 ">
                                <figure className="main-feature-img">
                                    <img src={item.image} alt="" className="img-fluid"></img>
                                </figure>
                            </Col>
                            <Col md={{span:6,order: 2}} xs={{span:12,order: 2}}  className="d-flex justify-content-center align-items-center  z-2">
                                <div className="main-feature-text-content ">
                                    <h2 className="text-center">{item.title}</h2>
                                   <p>{item.content}</p>
                                </div>
                            </Col>
                        </Row>
                    )
                })
            }
        </Container>
    );
}
export default Layout;