import React, {useState,useContext} from 'react';
import { Content } from '../Layout';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import './Main.scss';
// 
const Layout = () => {
    const theme = useContext(Content);
    const MainData = theme.pageName.Main;
    const News = theme.pageName.Main.data.news;
    const aboutUs = theme.pageName.Main.data.aboutUs;
    console.log("main",News);
    return (
        <>
        <section id="main-new" className="main-news border-bottom">
            <Container>
                
                <Row>
                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                        <h2 className="display-5 fw-bold main-news-title ">社區消息</h2>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                        <hr className="title-hr text-center" />
                        </Col>
                    </Row>
                     <Container>
                        <Row className="mt-5">
                            {
                                News.map((news) => {
                                    return (
                                <div className="col-lg-4 mb-4 d-flex align-items-stretch" key={news.id}>
                                    <div className="card  shadow-sm">
                                    <img src={news.images} className="card-img-top card-img-height" alt="Card Image" />
                                    <div className="card-body d-flex flex-column">
                                        <h4 className="card-title fw-bold">{news.title}</h4>
                                        <p className="card-text mb-4 card-text-overflow"> {news.content}</p>
                                        <a href="#" className="btn btn-primary mt-auto align-self-start btn-gotoNews">前往了解</a>
                                    </div>
                                    </div>
                                </div>
                                   )
                               })
                            }
                        </Row>
                        <Row className="mt-5">
                            <div className="d-flex justify-content-center">
                                <Button size="lg" className="btn-look-more">
                                    查看更多
                                </Button>
                            </div>
                        </Row>
                        </Container>
            </Container>
            </section>

        <section id="about-us" className="main-about-us border-bottom">
           
                <Container fluid>
                <Row>
                         <Col className="block3-col-1" xl={6} md={12} xs={12}>
                    <Row>
                        <img src={aboutUs.Images} alt="" className="img-fluid p-0"/>
                    </Row>
                    <Row>
                        <div className="container p-4 aboutUs-bottom-bg">
                            <h2
                                className="text-white d-flex justify-content-center align-items-center fw-bold display-5">關於我們</h2>
                            {/* <h4 className="text-white d-flex justify-content-center align-items-center m-4">Text Text Text Text Text Text Text Text Text</h4> */}
                        </div>
                    </Row>

                </Col>
                <Col className="p-5 block3-col-2 d-flex justify-content-center align-items-center" xl={6} md={12} xs={12}>
                    <Row>
                        <div className="p-5">
                            <span className="text-muted">簡介</span>
                            <h1 className="mt-3 mb-3 fw-bold">{aboutUs.name}</h1>
                            <p className="mt-2 mb-4 aboutUs-content">{aboutUs.Introduction}</p>
                            <h5 className="fw-bold mb-4 text-orange">聯絡我們</h5>
                            <div>
                                <p>
                                    <span className=""><i className="fas fa-home me-3"></i>{aboutUs.address}</span>
                                        </p>
                                        
                                <p>
                                    <span className=""><i className="fas fa-phone me-3"></i>{aboutUs.phone}</span>
                                </p>
                            </div>
                        </div>
                    </Row>

                </Col>
                    </Row>
                </Container>
            </section>
            {/* <section id="feature"  className="main-feature">
                <Container className="mb-4">
                    <Row>
                        <Col xs={12} className="d-flex justify-content-center align-items-center">
                            <h2 className="display-5 fw-bold main-feature-title ">社區特色</h2>
                        </Col>
                        <Col xs={12} className="d-flex justify-content-center align-items-center">
                            <hr className="title-hr text-center" />
                        </Col>
                    </Row>
                </Container>
            </section> */}
            </>
    );
}
export default Layout;