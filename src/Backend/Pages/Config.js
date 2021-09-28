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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Layout = () => {
    const [key,
        setKey] = useState('home');
    const [IndexImage, setIndexImage] = useState([])
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
                            <Col xs={12}>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityName"><h2 className="fw-bold fs-4 m-0">社區名稱</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityName" placeholder="樹德社區(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityAddress"><h2 className="fw-bold fs-4 m-0">社區地址</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityAddress" placeholder="高雄市燕巢區橫山里橫山路59號(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityHost"><h2 className="fw-bold fs-4 m-0">負責人</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityHost" placeholder="王大明(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communitySecretary"><h2 className="fw-bold fs-4 m-0">聯絡人</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communitySecretary" placeholder="王小美(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityPhone"><h2 className="fw-bold fs-4 m-0">聯絡電話</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityPhone" placeholder="0912345678(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityEmail"><h2 className="fw-bold fs-4 m-0">聯絡信箱</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityEmail" placeholder="usr2021@gmail.com(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityFaceBook"><h2 className="fw-bold fs-4 m-0">FaceBook粉絲頁網址</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityFaceBook" placeholder="https://www.facebook.com/ShuTeUniversity/(範例)"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityInstagram"><h2 className="fw-bold fs-4 m-0">Instagram粉絲頁網址</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityInstagram" placeholder="https://www.instagram.com/stu_csie/(範例)"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                       <FloatingLabel controlId="inputGroup-communityIntroduce" label="社區簡介">
                                        <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
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
                                                server="/api"
                                                name="inputGroup-communityImages"
                                                labelIdle='<span className="filepond--label-action">選擇一張代表社區的圖片</span>'
                                        />
                                    </Col>
                                </Row>
                                <Row >
                                    <Col xs={{ span: 6, offset: 6 }} className="text-end">
                                        <Button variant="outline-success">儲存</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="profile" title="首頁設定">
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