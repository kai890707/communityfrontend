import React, {useState, useEffect} from 'react';
import {
    Container,
    Row,
    Col,
    FloatingLabel,
    Form,
    Button,
    Collapse,
    Nav,
    InputGroup,
    FormControl,Tab,Tabs
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
import {postApi,setAuthToken,getAuthToken,tokenApi,getMe,tokenGetApi,tokenPostApi} from './../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from './../../Api/Utils';
import Swal from 'sweetalert2';
const Layout = () => {
     const [key,
        setKey] = useState('home');
    const [adminData,setAdminData] = useState([]);
    /**取得admin資訊API */
    function getAccountInfo() {
        tokenGetApi('account/getAdminInfo').then(
            (res)=>{
                if(res.status === 1){
                    setAdminData(res.data)
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
    /**修改密碼API */
    const  handleSubmit = e =>{
        e.preventDefault();
        var formData = new FormData(document.getElementById("updatePassword-form"));
        formData.append('id',adminData.id);
        if(formData.get('after') !== formData.get('re-after') ){
            CustomErrorAlert("重複密碼錯誤，請重新輸入!");
        }
        tokenPostApi('account/updatePassword',formData).then(
            (res)=>{
                if(res.status === 1){
                    CustomSuccessAlert("密碼修改成功!")
                    .then(()=>{
                        window.location.reload();
                    })
                    
                }else if(res.status === 0){
                    CustomErrorAlert("原密碼錯誤!");
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
        getAccountInfo();
    },[])
    return (
        <Container fluid>
            <Row className="border-bottom p-3">
                <h2 className="fw-bold">帳號設定</h2>
            </Row>
            <Row className="shadow-sm mt-5 p-5 bg-white">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="tab-text fs-4">

                    <Tab eventKey="home" title="個人資訊">
                        <Row className="bg-white p-4">
                            <Col xs={12}>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityName"><h2 className="fw-bold fs-4 m-0">名稱</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityName" defaultValue={adminData.name} disabled />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityAddress"><h2 className="fw-bold fs-4 m-0">帳號</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityAddress" defaultValue={adminData.account} disabled />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityHost"><h2 className="fw-bold fs-4 m-0">連絡電話</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityHost"defaultValue={adminData.phone} disabled  />
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communitySecretary"><h2 className="fw-bold fs-4 m-0">電子郵件</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communitySecretary"defaultValue={adminData.email} disabled/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityPhone"><h2 className="fw-bold fs-4 m-0">權限</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityPhone"defaultValue={adminData.permission} disabled />
                                    </InputGroup>
                                </Row>
                                <hr />
                                <Row className="mb-2"><h3 className="fw-bold">修改密碼</h3></Row>
                                <Form onSubmit={handleSubmit} id="updatePassword-form">
                                    <Row>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="inputGroup-communityEmail"><h2 className="fw-bold fs-4 m-0">輸入原密碼</h2></InputGroup.Text>
                                            <FormControl aria-label="Default" name="before" aria-describedby="inputGroup-communityEmail"/>
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="inputGroup-communityFaceBook"><h2 className="fw-bold fs-4 m-0">輸入新密碼</h2></InputGroup.Text>
                                            <FormControl aria-label="Default"  name="after"  aria-describedby="inputGroup-communityFaceBook" />
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="inputGroup-communityInstagram"><h2 className="fw-bold fs-4 m-0">再次輸入新密碼</h2></InputGroup.Text>
                                            <FormControl aria-label="Default" name="re-after" aria-describedby="inputGroup-communityInstagram" />
                                        </InputGroup>
                                    </Row>
                                    <Row >
                                        <Col xs={{ span: 6, offset: 6 }} className="text-end">
                                            <Button variant="outline-success" type="submit">儲存</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="profile" title="權限設定">
                        <Row className="bg-white p-4">
                            asd
                        </Row>
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    );
}
export default Layout;