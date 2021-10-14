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
    useHistory,
} from "react-router-dom";
// import ReactPaginate from 'react-paginate';
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,tokenGetApi} from './../../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from './../../../Api/Utils';
import Table from "./../DataTable/DataTable";
const Layout = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const getListData =()=> {
        tokenGetApi('announcement/list').then(
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
    return (
        <Container fluid>
            <Row className="border-bottom p-3">
                <h2 className="fw-bold">公告列表</h2>
            </Row>
            <Row className="mt-4">
                <Col className="m-2 pt-4 bg-white shadow-sm " >
                    <Table data={data} />
                </Col>
            </Row>
        </Container>
    );
}
export default Layout;