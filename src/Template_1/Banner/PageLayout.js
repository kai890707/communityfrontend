import React, {useState,useContext} from 'react';
import './Banner.scss';
import { Container, Image,Row,Col } from 'react-bootstrap';
const Layout = ({data}) => {

    const BannerData = data.data;
    const bgi = {
        backgroundImage: `url(${BannerData.image})` 
    }
    return (
       
            // {/* <Image src={BannerData.data.image} fluid /> */}
      
        // <section id="template-1-Nav" className="section-banner">

          <section id="template-1-Nav" className="section-banner-page" style={bgi}>
             <div className="section-banner-overlay"></div>
             <Container className="section-banner-warp">
                 <Row  className="d-flex justify-content-center">
                     <Col lg={8} xs={12} className="text-center">
                         <h1 className="display-1 fw-bold text-white">{BannerData.name}</h1>
                         {/* <p className="section-banner-text text-white">{BannerData.data.Introduction}</p> */}
                     </Col>
                 </Row>
            </Container> 
        </section>
        
    );
}
export default Layout;