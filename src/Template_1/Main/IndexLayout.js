import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    Link,
} from "react-router-dom";
import './Main.scss';
// 
const Layout = ({data}) => {
    const MainData = data;
    const News = MainData.data.news;
    const aboutUs = MainData.data.aboutUs;
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
                        <Row className="mt-5 justify-content-center">
                            {
                                News.map((news) => {
                                    /**將原page content 物件提取內容成純文字 */
                                var blocks =  JSON.parse(news.page_content).blocks;
                                var value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
                                    return (
                                <div className="col-lg-4 mb-4 d-flex justify-content-center align-items-stretch" key={news.id}>
                                    <div className="card  shadow-sm">
                                    <img src={news.page_chosen} className="card-img-top card-img-height img-fulid" style={{minHeight:"203px",minWidth:"300px" }} alt="Card Image" />
                                    <div className="card-body d-flex flex-column">
                                        <h4 className="card-title fw-bold text-center mb-4">{news.page_title}</h4>
                                        <p className="card-text mb-4 card-text-overflow ps-2 pe-2">{value}</p>
                                        <Link to={`社區公告/${news.id}`} className="mt-3 btn btn-primary mt-auto align-self-center btn-gotoNews">前往了解</Link>
                                    </div>
                                    </div>
                                </div>
                                   )
                               })
                            }
                        </Row>
                        <Row className="mt-5">
                            <div className="d-flex justify-content-center">
                                <Link to={"/社區公告"} size="lg" className="btn btn-lg btn-look-more">
                                    查看更多
                                </Link>
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
                        <img src={aboutUs.image} alt="" className="img-fluid p-0"/>
                    </Row>
                    <Row>
                        <div className="container p-4 aboutUs-bottom-bg">
                            <h2
                                className="text-white d-flex justify-content-center align-items-center fw-bold display-5">關於我們</h2>
                          
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
            </>
    );
}
export default Layout;