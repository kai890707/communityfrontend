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
    Tabs,
    Tab,
    InputGroup,
    FormControl
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

import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {postApi,setAuthToken,getAuthToken,tokenApi,getMe,tokenGetApi,tokenPostApi} from './../../Api/Api';
import { tokenExpired, CustomSuccessAlert, CustomErrorAlert } from './../../Api/Utils';
import Base from './../../Api/Base';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Layout = () => {
    const [key,
        setKey] = useState('home');
    const [IndexImage, setIndexImage] = useState([]);
    const [config, setconfig] = useState([]);
    /**
     * blob轉型file[因為fetch 圖片後會被轉成blob]
     * @param {*} theBlob 
     * @param {*} fileName 
     * @returns 
     */
       function blobToFile(theBlob, fileName){       
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData(document.getElementById('config-form'));
        if(IndexImage.length!==0){
            var myFile = blobToFile(IndexImage[0].file, IndexImage[0].file.name);
            formData.append("img",myFile);
        }
        formData.delete('filepond');
        tokenPostApi('account/updateConfig',formData).then(
            (res)=>{
                if(res.status === 1){
                    CustomSuccessAlert("設定成功!")
                        .then((result) => {
                            if(result){
                                window.location.reload();
                            }   
                        });
                } else if (res.status === 0) {
                    CustomErrorAlert("網站尚未設定完成!");
                }
                else if(res.status ===2){
                    tokenExpired(res,'login');
                } else if (res.status ===3) {
                     CustomErrorAlert("社區圖片檔案有誤~ 需要更換別張圖片喔");
                }
                else {
                    CustomErrorAlert("未知錯誤，請聯絡管理員");
                }
            },(err)=>{
                CustomErrorAlert("未知錯誤，請聯絡管理員");
            }
        )
    }
    
    function getConfig() {
        tokenGetApi('account/getConfig').then(
            (res)=>{
                if(res.status === 1){
                    setconfig(res.data);
                    if (res.data.community_image!=="") {
                        setIndexImage([{
                            source:`${Base.baseUrl}${res.data.community_image}`,
                            options: { type: "local" },
                        }]);
                    }
                   
                } else if (res.status === 0) {
                    CustomErrorAlert("網站尚未設定完成!");
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
    useEffect(() => {
        getConfig();
    },[])
    return (
        <Container fluid>
            <Row className="border-bottom p-3">
                <h2 className="fw-bold">網站設定</h2>
            </Row>
            <Row className="pt-5 ">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="tab-text fs-4">

                    <Tab eventKey="home" title="基礎設定">
                        <Row className="bg-white p-4">
                            <Form onSubmit={handleSubmit} id="config-form">
                            <Col xs={12}>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityName"><h2 className="fw-bold fs-4 m-0">社區名稱</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityName" name="name" defaultValue={config.community_name} placeholder="樹德社區(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityAddress"><h2 className="fw-bold fs-4 m-0">社區地址</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityAddress"name="address"  defaultValue={config.community_address} placeholder="高雄市燕巢區橫山里橫山路59號(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityHost"><h2 className="fw-bold fs-4 m-0">負責人</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityHost"name="host"  defaultValue={config.community_host} placeholder="王大明(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communitySecretary"><h2 className="fw-bold fs-4 m-0">聯絡人</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communitySecretary" name="contact"  defaultValue={config.community_contact} placeholder="王小美(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityPhone"><h2 className="fw-bold fs-4 m-0">聯絡電話</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityPhone" name="phone" defaultValue={config.community_phone}  placeholder="0912345678(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityEmail"><h2 className="fw-bold fs-4 m-0">聯絡信箱</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityEmail" name="email" defaultValue={config.community_email}  placeholder="usr2021@gmail.com(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityFaceBook"><h2 className="fw-bold fs-4 m-0">FaceBook粉絲頁網址</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityFaceBook" name="facebook" defaultValue={config.community_facebook}  placeholder="https://www.facebook.com/ShuTeUniversity/(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityInstagram"><h2 className="fw-bold fs-4 m-0">Instagram粉絲頁網址</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityInstagram" name="instagram" defaultValue={config.community_instagram}  placeholder="https://www.instagram.com/stu_csie/(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                       <FloatingLabel controlId="inputGroup-communityIntroduce" label="社區簡介">
                                        <Form.Control
                                        as="textarea"
                                        name="introduce"
                                        placeholder="Leave a comment here"
                                        defaultValue={config.community_introduce} 
                                        style={{ minHeight: '400px' }}
                                        />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <FilePond
                                                files={IndexImage}
                                                onupdatefiles={setIndexImage}
                                                allowMultiple={true}
                                                maxFiles={1}
                                              
                                                labelIdle='<span className="filepond--label-action">選擇一張代表社區的圖片</span>'
                                                server={{
                                                load: (source, load, error, progress, abort, headers) => {
                                                    var myRequest = new Request(source);
                                                    console.log(myRequest);
                                                    fetch(myRequest)
                                                    .then(function(response) {
                                                    response.blob().then(function(myBlob) {
                                                        load(myBlob);
                                                    });
                                                    });
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row >
                                    <Col xs={{ span: 6, offset: 6 }} className="text-end">
                                        <Button type="submit" variant="outline-success">儲存</Button>
                                    </Col>
                                </Row>
                            </Col>
                            </Form>
                        </Row>
                    </Tab>
                    {/* <Tab eventKey="profile" title="首頁設定">
                        <Row className="bg-white p-4">
                            
                        </Row>
                    </Tab> */}
                </Tabs>
            </Row>
        </Container>
    );
}
export default Layout;