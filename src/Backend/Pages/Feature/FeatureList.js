import React, {useState, useEffect} from 'react';
import {
    Container,
    Row,
    Col,
    FloatingLabel,
    Form,
    Button,
    Collapse,
    Nav
} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";
// import ReactPaginate from 'react-paginate';
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,tokenGetApi} from './../../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from './../../../Api/Utils';
import Swal from 'sweetalert2';
import { set } from 'react-hook-form';
import Table from "./../DataTable/DataTable";
const Layout =()=>{
    const history = useHistory();
    const [data, setData] = useState([]);
    const getListData =()=> {
        tokenGetApi('announcement/getAllListByCategory/2').then(
            (res)=>{
                if(res.status === 1){
                    setData(res.data)
                }else if(res.status === 0){
                }
                else if(res.status ===2){
                    tokenExpired(res,'login');
                }else{
                    CustomErrorAlert("未知錯誤，請聯絡管理員");
                }
            },(err)=>{
                CustomErrorAlert("未知錯誤，請聯絡管理員");
            }
        )
      }
    useEffect(()=>{
        getListData();
    },[]);
      const clickhandler = name => console.log("delete", name);
    return (
        <Container fluid>
            <Row className="border-bottom p-3">
                <h2 className="fw-bold">地方特色文章列表</h2>
            </Row>
            <Row className="mt-4">
                <Col className="m-2 pt-4 bg-white shadow-sm " >
                    <Table data={data} click={clickhandler} />
                </Col>
            </Row>
            
            {/* <ReactPaginate
                    previousLabel={"上一頁"}
                    nextLabel={"下一頁"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"paginationBtnGroup"}
                    previousLinkClassName={" previousBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                /> */}
        </Container>
    );
}
export default Layout;