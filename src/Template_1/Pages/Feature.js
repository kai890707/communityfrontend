import React, {useState,useEffect} from 'react';
import Nav from '../Nav/PageLayout';
import Banner from '../Banner/PageLayout';
import Main from '../Main/FeatureMain';
import Footer from '../Footer/PageLayout';
import '../index.scss';
import {getApi} from '../../Api/Api';

const Feature = () => {
    const [pageData, setPageData] =  useState([]);
    const [loadingFetch,setLoadingFetch] = useState(false);
    useEffect(()=>{
         function getIndexData() {
            getApi('page/getNewsPage/2').then((res)=>{
                setPageData(res);
                setLoadingFetch(true);
                })
        }
        getIndexData();
    },[]);
//  const data = {
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
//                     name: "保社社區-社區特色",
//                     image: "http://120.119.77.99:3000/assets/images/s1.jpg"
//                 }
//             },
//             Main: {
//                 data: {
//                     list: [{
//                         title: "title1",
//                         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam fugiat, enim quod a quasi distinctio incidunt in tempore exercitationem, similique asperiores id delectus, veritatis qui? Nemo dolore illum neque ipsa.",
//                         image:"http://120.119.77.99:3000/assets/images/news1.jpeg"
//                     },{
//                         title: "title2",
//                         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam fugiat, enim quod a quasi distinctio incidunt in tempore exercitationem, similique asperiores id delectus, veritatis qui? Nemo dolore illum neque ipsa.",
//                         image:"http://120.119.77.99:3000/assets/images/news2.jpeg"
//                     },{
//                         title: "title3",
//                         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam fugiat, enim quod a quasi distinctio incidunt in tempore exercitationem, similique asperiores id delectus, veritatis qui? Nemo dolore illum neque ipsa.",
//                         image:"http://120.119.77.99:3000/assets/images/s1.jpg"
//                     }]
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
export default Feature;