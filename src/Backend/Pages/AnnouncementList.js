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
import { getApi } from '../../Api/Api';
import ReactPaginate from 'react-paginate';
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,tokenGetApi} from '../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from '../../Api/Utils';
import Swal from 'sweetalert2';
import { set } from 'react-hook-form';
// import DataTable from 'react-data-table-component';
// import DataTableExtensions from 'react-data-table-component-extensions';
// import 'react-data-table-component-extensions/dist/index.css';
// import styled from 'styled-components';
import dd from "./data.js";
import Table from "./DataTable";
const Layout = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const getListData =()=> {
        tokenGetApi('announcement/list').then(
            (res)=>{
                if(res.status === 1){
                    // CustomSuccessAlert("文章新增成功");
                    // setList(res.data);
                    
                    setData(res.data)
                }else if(res.status === 0){
                    // CustomErrorAlert("文章新增失敗");
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
                <h2 className="fw-bold">公告列表</h2>
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