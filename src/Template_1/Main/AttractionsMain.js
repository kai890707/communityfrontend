


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
import ReactPaginate from 'react-paginate';
const Layout = ({ data }) => {
    // const theme = useContext(Content);
    const MainData = data.data;
    const news = data.data.attractions;
    // console.log(theme.history.location.pathname);
    const [newsData, setNewsData] = useState(news.slice(0,50));
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const displayNews = newsData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((news,i) => {
            return (
                <Row className="mb-5 border-bottom p-5 animate__animated  animate__bounceInUp" key={news.id}>
                    <Col xl={4} lg={4} md={4} xs={12}>
                        <Container>
                            <figure className="main-news-img">
                                <img src={news.images} alt="" className="img-fluid"></img>
                            </figure>
                        </Container>
                        
                    </Col>
                    <Col xl={8} lg={8} md={8} xs={12}>
                        <Container className="main-news-content">
                            <Row className="mb-2"><span className="text-muted">{news.date}</span></Row>
                            <Row className="mb-2"><h2><a href={news.href}>{news.title}</a></h2></Row>
                            <Row><p className="text-muted card-text-overflow">{news.content}</p></Row>
                            <Row classNzme="d-flex justify-content-end align-items-center mt-4">
                                <Col className="text-end pe-5"><a href={news.href}><i class="fas fa-plus me-2"></i>查看更多</a></Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            );
        });
    const pageCount = Math.ceil(newsData.length / usersPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected);
    }
    return (
        <Container className="mt-5">
            {displayNews}
            <ReactPaginate
                    previousLabel={"上一頁"}
                    nextLabel={"下一頁"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBtnGroup"}
                    previousLinkClassName={" previousBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
        </Container>
    );
}
export default Layout;