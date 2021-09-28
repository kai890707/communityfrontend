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
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,tokenGetApi} from '../../Api/Api';
import {tokenExpired} from '../../Api/Utils';
import Swal from 'sweetalert2';
const Layout = () => {
    const [list,setList]=useState('');
    const history = useHistory();
    useEffect(()=>{
        getListData();
        function getListData() {
            tokenGetApi('announcement/list').then(
                (res)=>{
                    if(res.status === 1){
                        console.log(res);
                        setList(res);
                    }else if(res.status ===2){
                        tokenExpired(res,'login');
                    }
                },(err)=>{
        
                }
            )
          }
    },[]);
    
    return (
        <Container fluid>
            <Row>
                <h2 className="fw-bold">公告列表</h2>
            </Row>
        </Container>
    );
}
export default Layout;