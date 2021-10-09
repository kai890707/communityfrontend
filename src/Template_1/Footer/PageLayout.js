import React, {useState, useContext} from 'react';

import './Footer.scss';
const Layout = ({ data}) => {
    const FooterData = data.data;
    const contact = FooterData.contact; 
     const aboutUs = FooterData.aboutUs;

    const style = {
        width: "60px",
        backgroundColor: "#7c4dff",
        height: "2px"
    }
    const style1 = {
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    }
    const style2 = {
        backgroundColor: "rgba(0, 0, 0, 0.05)"
    }
    let date = new Date().getFullYear();
    return (
        <footer className="text-center text-lg-start  text-light footer">

            <section
                className="d-flex justify-content-center justify-content-lg-between p-4"></section>

            <section className="footer-text">
                <div className="container text-center text-md-start mt-5">

                    <div className="row mt-3 ">

                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-5">

                            <h6 className="text-uppercase fw-bold mb-4  fs-2">
                                相關連結
                            </h6>
                            <p>
                                <a href="/login">
                                    <img src="/assets/images/backend.png"  className="img-fluid" alt="後臺入口" />
                                </a>
                            </p>
                        </div>
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-5">

                            <h6 className="text-uppercase fw-bold mb-4  fs-2">
                                社群連結
                            </h6>
                            <p>
                                <a href={contact.facebook==="default"?"/":contact.facebook} >
                                    <img src={"/assets/images/facebook.jpg"}  className="img-fluid footer-img" alt="FB粉專" />
                                </a>
                            </p>
                            <p>
                                <a href={contact.instagram==="default"?"/":contact.instagram}>
                                    <img src="/assets/images/ig.png"  className="img-fluid footer-img" alt="IG粉專" />
                                </a>
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-5 fw-bold">
                            <div className="row">
                                <h6 className="text-uppercase fw-bold mb-4 fs-2">
                                    聯絡我們
                                </h6>
                            </div>
                            <div className="row" >
                                <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <p>
                                                <i className="fas fa-home me-3"></i>
                                                {contact.address}</p>
                                        </div>
                                        <div className="col-12">
                                            <p>
                                                <i className="fas fa-envelope me-3"></i>
                                                信箱 :
                                                <a href={`mailto:${contact.email}`} className="footer-email">{contact.email}</a>
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p>
                                                <i className="fas fa-user me-3"></i>
                                                負責人 : {contact.directorName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <p>
                                            <i className="fas fa-id-card me-3"></i>
                                            聯絡人 : {contact.secretary}
                                        </p>
                                        </div>
                                        <div className="col-12">
                                             <p>
                                            <i className="fas fa-phone me-3"></i>
                                            電話 : {contact.phone}
                                        </p>
                                        </div>
                                        <div className="col-12">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                           
                        </div>

                    </div>

                </div>
            </section>

            <div className="text-center p-4" style={style2}>

                {/* <a className="text-reset fw-bold" href="">STU LAB0726</a> */}
                <p className="text-reset fw-bold m-0">© {date}
                    Copyright STU CSIE LAB 0726</p>
            </div>

        </footer>
    );
}
export default Layout;