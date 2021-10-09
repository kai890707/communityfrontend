import { Navbar, Container, Nav } from 'react-bootstrap';
import Reac from 'react';
import './Nav.scss';
const Layout = ({ data }) => {
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