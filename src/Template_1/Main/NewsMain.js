


import {Container,Row,Col } from 'react-bootstrap';
import React, { useState } from 'react';
import './Main.scss';
import ReactPaginate from 'react-paginate';
const Layout = ({ data }) => {
    const MainData = data.data;
    const news = data.data.news;
    const [newsData, setNewsData] = useState(news.slice(0,50));
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const displayNews = newsData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((news,i) => {
            /**將原page content 物件提取內容成純文字 */
            var blocks =  JSON.parse(news.page_content).blocks;
            var value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
            return (
                <Row className="mb-5 border-bottom p-5 animate__animated  animate__bounceInUp" key={news.id}>
                    <Col xl={4} lg={4} md={4} xs={12}>
                        <Container>
                            <figure className="main-news-img">
                                <img src={news.page_chosen} alt="" className="img-fluid"></img>
                            </figure>
                        </Container>
                        
                    </Col>
                    <Col xl={8} lg={8} md={8} xs={12}>
                        <Container className="main-news-content">
                            <Row className="mb-2"><span className="text-muted">{news.created_at}</span></Row>
                            <Row className="mb-2"><h2><a href={news.href}>{news.page_title}</a></h2></Row>
                            <Row><p className="text-muted card-text-overflow">{value}</p></Row>
                            <Row className="d-flex justify-content-end align-items-center mt-4">
                                <Col className="text-end pe-5"><a href={news.href}><i className="fas fa-plus me-2"></i>查看更多</a></Col>
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