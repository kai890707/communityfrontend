import {
    useLocation
} from "react-router-dom";
import {
    Container,
    Row,
} from 'react-bootstrap';
import { Link } from "react-router-dom";
const Layout = () => {
    const { pathname } = useLocation()
    const style = {
        height: '100vh',
        backgroundColor: '#FFC074'
    }
    return(
        <Container
            fluid
            className="bg-orange m-0 p-5 d-flex justify-content-center align-items-center"
            style={style}>
            <Container className="">
                    <Row className="bg-light shadow border-radius-5 p-5">
                        <h2 className="text-center fw-bold">很抱歉，您的搜尋找不到結果喔~</h2>
                        <Link to="/" className="mt-5 text-center text-decoration-none fs-5">回首頁</Link>
                    </Row>
                </Container>    
        </Container>
    );
}
export default Layout;