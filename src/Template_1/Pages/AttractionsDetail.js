import {
    useParams
} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import Nav from '../Nav/PageLayout';
import Banner from '../Banner/PageLayout';
import Main from '../Main/AttractionsDetailMain';
import Footer from '../Footer/PageLayout';
import '../index.scss';
import {getApi} from '../../Api/Api';
const AttractionsDetail = () => {
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
//                     name: "觀音山風景區",
//                     image: "http://120.119.77.99:3000/assets/images/s1.jpg"
//                 }
//             },
//             Main: {
//                 data: {
                  
//                         id: 1,
//                             href: "http://120.119.77.99:3000/保社社區/社區景點/1",
//                             title: "觀音山風景區",
//                             content: "觀音山位於高雄縣大社鄉東邊，約五、六百萬年前，因造山運動而擠壓出今日的觀音山系，岩層屬「南勢崙砂岩」富涵豐富鐵質，經風化後略呈黃色，土質細緻，來到這裡不妨打著赤" +
//                                     "腳，體驗舒適柔軟的觸感，觀音山面積約十一點九公頃，相傳清朝康熙皇帝到此一遊，看到此地藏風聚氣，因此賜名「翠屏嚴」，在鳳山采訪冊提到「..其麓一巖，名曰翠屏，而為" +
//                                     "縣治八景之一，中蓋觀音寺，右二山...」在觀音山麓有一座祀奉觀音的寺廟名曰翠屏岩寺，而翠屏岩則是現在的大覺寺，至今已是三百餘年的古剎，雖然年代已久，廟前的「翠屏" +
//                                     "岩」牌樓至今仍不失古色古香，廟前有一廣場，有著各式各樣的攤販，也是登山客下山後到此飽足的地方，觀音山又因山形酷似觀音端坐，因此得名，同時觀音山也是高雄縣八景之一" +
//                                     "，另外在在翠屏岩左前方的群山中，有一座像筆的山，名為石筆山，山下的古井水質甘甜，常吸引遊客前來取水飲用。每到傍晚或假日，觀音山總會吸引大高雄地區無數的民眾前來從" +
//                                     "事登山活動，其登山路徑多為水泥路，坡度適中，一路走來頗為輕鬆，約30分步行路程，即可到達山上的「高速尾休息站」，休息站有一陡峭的山壁可攀登，只見小朋友拉著繩索攀" +
//                                     "爬，充滿歡樂的氣氛。",
//                     images: [{
//                               image:"http://120.119.77.99:3000/assets/images/news1.jpeg",
//                             }
//                             , {
//                                 image:"http://120.119.77.99:3000/assets/images/news2.jpeg",
//                                 },{
//                                 image:"http://120.119.77.99:3000/assets/images/news3.jpeg"
//                                 },{
//                                 image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
//                             }
//                     ]
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
export default AttractionsDetail;