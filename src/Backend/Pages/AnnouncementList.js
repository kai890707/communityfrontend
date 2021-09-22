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
const Layout = () => {
    return (
        <Container fluid>
            <Row>
                <h2 className="fw-bold">公告列表</h2>
            </Row>
        </Container>
    );
}
export default Layout;