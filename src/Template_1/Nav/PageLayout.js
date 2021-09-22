import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import './Nav.scss';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
const Layout = ({ data }) => {
    // const theme = useContext(Content);
    const NavData = data.data;
    // console.log(theme.history.location.pathname);
    return (
        <Navbar bg="white" expand="lg" className="pt-4 pb-4 nav">
            <Container>
                <Navbar.Brand className="fs-3 fw-bold nav-title">{NavData.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto ">
                        {
                            NavData.list.map((list,index) => {
                               return <Nav.Link href={list.path} key={index} className="nav-text fs-5 fw-bold">{list.name}</Nav.Link>
                            })
                        }
                    </Nav>

                 
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default Layout;