import {useParams} from "react-router-dom";
import React, {useState,useEffect} from 'react';
import Nav from '../Nav/PageLayout';
import Banner from '../Banner/PageLayout';
import Main from '../Main/SpecialtyDetailMain';
import Footer from '../Footer/PageLayout';
import '../index.scss';
import {getApi} from '../../Api/Api';
const SpecialtyDetail = () => {
    let { topicId } = useParams();
    const [pageData, setPageData] =  useState([]);
    const [loadingFetch,setLoadingFetch] = useState(false);
    useEffect(()=>{
         function getIndexData() {
            getApi('page/getNewsDetailPage/'+topicId).then((res)=>{
                setPageData(res);
                setLoadingFetch(true);
                })
        }
        getIndexData();
    },[]);
    // const data = {
    //     name: "保社社區",
    //     pageName: {
    //         Nav: {
    //             data: {
    //                 title: "保社社區",
    //                 list: [
    //                     {
    //                         name: "首頁",
    //                         path: "/"
    //                     }, {
    //                         name: "社區特色",
    //                         path: "/社區特色"
    //                     }, {
    //                         name: "社區公告",
    //                         path: "/社區公告"
    //                     }, {
    //                         name: "社區景點",
    //                         path: "/社區景點"
    //                     }, {
    //                         name: "社區特產",
    //                         path: "/社區特產"
    //                     }
    //                 ]
    //             }
    //         },
    //         Banner: {
    //             data: {
    //                 name: "芭樂",
    //                 image: "http://120.119.77.99:3000/assets/images/s1.jpg"
    //             }
    //         },
    //         Main: {
    //             data: {

    //                 id: 1,
    //                 href: "http://120.119.77.99:3000/保社社區/社區特產/1",
    //                 title: "芭樂",
    //                 content: "襲捲全台之「白芭樂」、「珍珠芭樂」、「台灣帝國芭樂」皆是本鄉空前絕後之創舉，奠定芭樂王國之基礎，種植腹地往燕巢區延申。",
    //                 images: [
    //                     {
    //                         image: "http://120.119.77.99:3000/assets/images/news1.jpeg"
    //                     }, {
    //                         image: "http://120.119.77.99:3000/assets/images/news2.jpeg"
    //                     }, {
    //                         image: "http://120.119.77.99:3000/assets/images/news3.jpeg"
    //                     }, {
    //                         image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg"
    //                     }
    //                 ]
    //             }
    //         },
    //         Footer: {
    //             data: {
    //                 contact: {
    //                     name: "高雄市大社區保社社區發展協會",
    //                     directorName: "許清泉",
    //                     secretary: "林小姐",
    //                     address: "高雄市大社區保社里中正路367-1號",
    //                     email: "sixgas@yahoo.com.tw",
    //                     phone: "0925922969"
    //                 }
    //             }
    //         }
    //     }
    // }
    return (
        <>
        {
            loadingFetch===true?(
                <>
                <Nav data={pageData.pageData.Nav}/>
                <Banner data={pageData.pageData.Banner}/>
                <Main data={pageData.pageData.Main}/>
                <Footer data={pageData.pageData.Footer}/>
                </>
            ):(
                <div>載入中請稍候...</div>
            )
        }
   
    </>  
    );
}
export default SpecialtyDetail;