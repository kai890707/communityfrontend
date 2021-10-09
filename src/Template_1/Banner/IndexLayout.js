import React from 'react';
import './Banner.scss';
import { Container,Row,Col } from 'react-bootstrap';
const Layout = ({data}) => {
    const BannerData = data.data;
    const bgi = {
        backgroundImage: `url(${BannerData.image})` 
    }
    return (
          <section id="template-1-Nav" className="section-banner"  style={bgi}>
             <div className="section-banner-overlay"></div>
             <Container className="section-banner-warp">
                 <Row>
                     <Col lg={8} xs={12} className="text-start">
                         <h1 className="display-1 fw-bold text-white">{BannerData.name}</h1>
                         <p className="section-banner-text text-white">{BannerData.Introduction}</p>
                     </Col>
                 </Row>
            </Container> 
        </section>
        
    );
}
export default Layout;