import React, {useState,useContext} from 'react';
import { Content } from '../Layout';
import './Banner.scss';
import { Container, Image,Row,Col } from 'react-bootstrap';
const Layout = () => {
    const theme = useContext(Content);
    const BannerData = theme.pageData.Banner;
    // console.log("main", BannerData);
    const bgi = {
        backgroundImage: `url(${BannerData.data.image})` 
    }
    return (
       
            // {/* <Image src={BannerData.data.image} fluid /> */}
      
        // <section id="template-1-Nav" className="section-banner">
    
          <section id="template-1-Nav" className="section-banner" style={bgi}>
             <div className="section-banner-overlay"></div>
             <Container className="section-banner-warp">
                 <Row>
                     <Col lg={8} xs={12} className="text-start">
                         <h1 className="display-1 fw-bold text-white">{BannerData.data.name}</h1>
                         <p className="section-banner-text text-white">{BannerData.data.Introduction}</p>
                     </Col>
                 </Row>
            </Container> 
        </section>
        
    );
}
export default Layout;