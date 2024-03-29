import React, {useState,useEffect} from 'react';
import Nav from '../Nav/PageLayout';
import Banner from '../Banner/PageLayout';
import Main from '../Main/SpecialtyMain';
import Footer from '../Footer/PageLayout';
import '../index.scss';
import {getApi} from '../../Api/Api';

const Specialty = () => {
    const [pageData, setPageData] =  useState([]);
    const [loadingFetch,setLoadingFetch] = useState(false);
    useEffect(()=>{
         function getIndexData() {
            getApi('page/getNewsPage/3').then((res)=>{
                setPageData(res);
                setLoadingFetch(true);
                })
        }
        getIndexData();
    },[]);
// const data = {
//         name: "保社社區",
//         pageName: {
//             Nav: {
//                 data: {
//                     title: "保社社區",
//                     list: [
//                         {
//                             name: "首頁",
//                             path: "/"
//                         }, {
//                             name: "社區特色",
//                             path: "/社區特色"
//                         }, {
//                             name: "社區公告",
//                             path: "/社區公告"
//                         }, {
//                             name: "社區景點",
//                             path: "/社區景點"
//                         }, {
//                             name: "社區特產",
//                             path: "/社區特產"
//                         }
//                     ]
//                 }
//             },
//             Banner: {
//                 data: {
//                     name: "保社社區-社區特產",
//                     image: "http://120.119.77.99:3000/assets/images/s1.jpg"
//                 }
//             },
//             Main: {
//                 data: {
//                     specialty: [
//                         {
//                             id: 1,
//                             href:"http://120.119.77.99:3000/保社社區/社區特產/1",
//                             title: "芭樂",
//                             content: "襲捲全台之「白芭樂」、「珍珠芭樂」、「台灣帝國芭樂」皆是本鄉空前絕後之創舉，奠定芭樂王國之基礎，種植腹地往燕巢區延申。",
//                             images: "http://120.119.77.99:3000/assets/images/news1.jpeg"
//                         }, {
//                             id: 2,
//                             href: "http://120.119.77.99:3000/保社社區/社區特產/2",
//                             title: "棗子",
//                             content: "台灣棗子第一品牌；1983年成立全台第一個棗子產銷班，同時也是國內農產品產銷班的先驅，第一個大規模生產棗子的鄉鎮，農民多因種棗子致富，蓋了許多「棗子樓」。共出現過十多種不同的品種，曾在台北微風廣場創下一粒兩百元的鎖售紀錄，遠比蘋果還高貴。",
//                             images: "http://120.119.77.99:3000/assets/images/news2.jpeg"
//                         }, {
//                             id: 3,
//                             href: "http://120.119.77.99:3000/保社社區/社區特產/3",
//                             title: "牛奶",
//                             content: "起於日治時期，提供給岡山機場飛行員補充營養，現在本區的乳牛數與產乳量皆居高雄市第一，今有二千餘頭乳牛。",
//                             images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
//                         }, 
//                     ],
                  
//                 }
//             },
//             Footer: {
//                 data: {
//                     contact: {
//                         name: "高雄市大社區保社社區發展協會",
//                         directorName: "許清泉",
//                         secretary: "林小姐",
//                         address: "高雄市大社區保社里中正路367-1號",
//                         email: "sixgas@yahoo.com.tw",
//                         phone: "0925922969"
//                     }
//                 }
//             }
//         }
//     }

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
export default Specialty;