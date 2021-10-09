import {
    Navbar,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import React, {useState} from 'react';
import './Main.scss';
import ReactPaginate from 'react-paginate';
const Layout = ({data}) => {
    const MainData = data.data;
    const news = data.data.news;
    const [newsData,
        setNewsData] = useState(news.slice(0, 50));
    const [pageNumber,
        setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const displayNews = newsData
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((news, i) => {
             /**將原page content 物件提取內容成純文字 */
             var blocks =  JSON.parse(news.page_content).blocks;
             var value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
            return ((i % 2 == 0)
                ? (
                    <Row className="main-feature-row animate__animated animate__backInRight" key={news.id}>
                        <Col
                            md={{
                            span: 6,
                            order: 1
                        }}
                            xs={{
                            span: 12,
                            order: 2
                        }}
                            className="d-flex justify-content-center align-items-center  z-2">
                            <Row className="p-5 main-news-content">
                                <Col xs={12}>
                                    <div className="main-feature-text-content ">
                                        <h2 className="text-center">{news.page_title}</h2>
                                        <p>{value}</p>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <Row className="d-flex justify-content-end align-items-center mt-4 ">
                                        <Col className="text-end pe-5">
                                            <a href={news.href} className="text-decoration-none ">
                                                <i className="fas fa-plus me-2"></i>查看更多</a>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Col>
                        <Col
                            md={{
                            span: 6,
                            order: 2
                        }}
                            xs={{
                            span: 12,
                            order: 1
                        }}
                            className="d-flex justify-content-center align-items-center z-2 order-xs-1">
                            <figure className="main-feature-img">
                                <img src={news.page_chosen} alt="" className="img-fluid"></img>
                            </figure>
                        </Col>
                    </Row>
                )
                : (
                    <Row className="main-feature-row animate__animated animate__backInLeft"  key={news.id}>
                        <Col
                            md={{
                            span: 6,
                            order: 1
                        }}
                            xs={{
                            span: 12,
                            order: 1
                        }}
                            className="d-flex justify-content-center align-items-center z-2 ">
                            <figure className="main-feature-img">
                                <img src={news.page_chosen} alt="" className="img-fluid"></img>
                            </figure>
                        </Col>
                        <Col
                            md={{
                            span: 6,
                            order: 2
                        }}
                            xs={{
                            span: 12,
                            order: 2
                        }}
                            className="d-flex justify-content-center align-items-center  z-2">
                            <Row className="p-5 main-news-content">
                                <Col xs={12}>
                                    <div className="main-feature-text-content ">
                                        <h2 className="text-center">{news.page_title}</h2>
                                        <p>{value}</p>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <Row className="d-flex justify-content-end align-items-center mt-4 ">
                                        <Col className="text-end pe-5">
                                            <a href={news.href} className="text-decoration-none">
                                                <i className="fas fa-plus me-2"></i>查看更多</a>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ));
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
                activeClassName={"paginationActive"}/>
        </Container>
    );
}
export default Layout;