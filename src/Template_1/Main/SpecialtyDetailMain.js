


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
import { Carousel } from 'react-carousel-minimal';
const Layout = ({ data }) => {
    // const theme = useContext(Content);
    const MainData = data.data;
 const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
    console.log(MainData);
    return (
        <Container className="main-news-details">
           
            <Row >
                <div className="d-flex justify-content-center" style={{
                    padding: "0 20px"
                }}>
                    {
                        MainData.images.length === 1 ?
                            (
                                <figure className="main-news-img"
                                    style={{
                                        textAlign: "center",
                                        maxWidth: "850px",
                                        maxHeight: "500px",
                                        margin: "40px auto",
                                        display:"inline-table"
                                    }}>
                                    <img src={MainData.images[0].image} alt="" className="img-fluid"></img>
                                </figure>
                            )
                            :
                                (<Carousel
                                    data={MainData.images}
                                    time={2000}
                                    width="850px"
                                    height="500px"
                                    captionStyle={captionStyle}
                                    radius="10px"
                                    slideNumber={true}
                                    slideNumberStyle={slideNumberStyle}
                                    captionPosition="bottom"
                                    automatic={true}
                                    dots={true}
                                    pauseIconColor="white"
                                    pauseIconSize="40px"
                                    slideBackgroundColor="darkgrey"
                                    slideImageFit="cover"
                                    thumbnails={true}
                                    thumbnailWidth="100px"
                                    style={{
                                    textAlign: "center",
                                    maxWidth: "850px",
                                    maxHeight: "500px",
                                    margin: "40px auto",
                                    display:"inline-table"
                                    }}
                                />
                            )
                    }
                   
                    </div>
            </Row>
            <Row className="news-detail-title">
                <h2 className="display-5 fw-bold">{MainData.title}</h2>
            </Row>
            <hr />
            <Row className="news-detail-content mb-4 mt-4">
                <p className="text-muted">簡介</p>
                <p className="">{MainData.content}</p>
            </Row>
            
        </Container>
    );
}
export default Layout;