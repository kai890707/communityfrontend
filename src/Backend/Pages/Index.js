import React from 'react';
import {
    Row,

} from 'react-bootstrap';

import Base from './../../Api/Base';
const BackendIndex = ()=>{

    const handleDownload=()=>{
        window.location.href=Base.downloadPPT;
    }
    return(

        <>
        <h2 className="d-flex justify-content-center mt-4 mb-4">歡迎使用通用型社區網站</h2>
        <div className="p-5 shadow-sm bg-white">
            <p className="h4">使用教學</p>
            <hr></hr>
            <Row>
                <button className="btn btn-outline-info" type="button" onClick={handleDownload}>下載說明書</button>
            </Row>
        </div>
        </>
    );

}

export default BackendIndex;