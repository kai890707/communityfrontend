import { Navbar, Container, Nav } from 'react-bootstrap';
import React from 'react';
import './Nav.scss';
import Base from '../../Api/Base';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
  useLocation,
    useParams
} from "react-router-dom";
const Layout = ({data}) => {
    const NavData = data.data;

    return (
        <Navbar bg="white" expand="lg" className="pt-4 pb-4 nav">
            <Container>
                <Navbar.Brand className="fs-3 fw-bold nav-title">{NavData.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto ">
                        {
                            NavData.list.map((list,index) => {
                               
                               return <Link to={`${list.path}`} key={index} className="nav-link nav-text fs-5 fw-bold">{list.name}</Link>
                            })
                        }
                     
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default Layout;