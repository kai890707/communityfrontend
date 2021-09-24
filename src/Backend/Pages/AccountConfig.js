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
const Layout = () => {
     const [key,
        setKey] = useState('home');
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
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityName" />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityAddress"><h2 className="fw-bold fs-4 m-0">帳號</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityAddress"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityHost"><h2 className="fw-bold fs-4 m-0">連絡電話</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityHost" />
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communitySecretary"><h2 className="fw-bold fs-4 m-0">電子郵件</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communitySecretary"/>
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityPhone"><h2 className="fw-bold fs-4 m-0">權限</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityPhone" />
                                    </InputGroup>
                                </Row>
                                <hr />
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityEmail"><h2 className="fw-bold fs-4 m-0">輸入原密碼</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityEmail"/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityFaceBook"><h2 className="fw-bold fs-4 m-0">輸入新密碼</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityFaceBook" />
                                    </InputGroup>
                                </Row>
                                 <Row>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="inputGroup-communityInstagram"><h2 className="fw-bold fs-4 m-0">再次輸入新密碼</h2></InputGroup.Text>
                                        <FormControl aria-label="Default" aria-describedby="inputGroup-communityInstagram" />
                                    </InputGroup>
                                </Row>
                                <Row >
                                    <Col xs={{ span: 6, offset: 6 }} className="text-end">
                                        <Button variant="outline-success">儲存</Button>
                                    </Col>
                                </Row>
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