import React, {useState, createContext,useEffect} from 'react';
import Nav from './Nav/IndexLayout';
import Main from './Main/IndexLayout';
import Banner from './Banner/IndexLayout';
import Footer from './Footer/IndexLayout';
import Error from '../404/Layout';
import {getApi,postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,tokenGetApi} from '../Api/Api';
import './index.scss'
const a = "123"
export const Content = createContext();
const Template = (props) => {
    function getIndexData() {
        getApi('page/getIndexData').then((res)=>{
            console.log('res',res);
            console.log("data",data);
        })
    }
    useEffect(()=>{
        getIndexData();
    },[]);
    const data = {
        name: "保社社區",
        pageData: {
            Nav: {
                data: {
                    title: "保社社區",
                    list: [
                        {
                            name: "首頁",
                            path: "/",

                        }, {
                            name: "社區特色",
                            path: "/社區特色"
                        }, {
                            name: "社區公告",
                            path: "/社區公告"
                        }, {
                            name: "社區景點",
                            path: "/社區景點"
                        }, {
                            name: "社區特產",
                            path: "/社區特產"
                        }
                    ]
                }
            },
            Banner: {
                data: {
                    name: "保社社區",
                    Introduction: "保社社區發展協會，原由理事長黃郡先生與總幹事徐國賢先生及會員共襄盛舉，創立於民國八十六年間。協會成立之初承蒙許多默默付出的會員辛苦經營，爾後民國九十四年間由理事" +
                            "長莊仁平先生與總幹事黃明宗先生代理職務一年六個月。現今為第三、四屆理事長韓進鄉先生與總幹事許清泉先生由會員大會經理事會順利而產生，並由高雄縣政府及大社鄉公所輔導" +
                            "和地方人士慷慨贊助，承先啟後奠定日後發展的基礎。目前於103年1月1日產生第五屆理事長許清泉與總幹事徐陳酉蘭繼續推動創新社區新里程。",
                    image: "http://120.119.77.99:3000/assets/images/s1.jpg"
                }
            },
            Main: {
                data: {
                    news: [
                        {
                            id: 1,
                            href: "",
                            title: "金好玩。探訪金門戰地風光3日",
                            content: "因應疫情影響，若旅客旅遊期間需配合中央與地方政府防疫措施，請旅客配合金門縣政府快篩政策以保障各位旅客旅遊安全性，請於飛機起飛前2小時抵達機場辦理相關手續。",
                            images: "http://120.119.77.99:3000/assets/images/news1.jpeg"
                        }, {
                            id: 2,
                            href: "",
                            title: "明池森林九寮溪生態之旅1日",
                            content: "明池遊樂區位於北橫公路最高點，介於宜蘭縣與桃園縣交界處。海拔高度約1,150公尺，層峰疊翠、古木成林。由於地處霧林帶，每日過午即雲霧飄渺，水草茂密，波光艷瀲，湖" +
                                    "光山色相互呼應；森林保育處於此勒石「虫二」二字，隱喻此處風月無邊，佳景天成。",
                            images: "http://120.119.77.99:3000/assets/images/news2.jpeg"
                        }, {
                            id: 3,
                            href: "",
                            title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                            content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、" +
                                    "華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                            images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
                        }, 
                    ],
                    aboutUs: {
                        name:"保社社區",
                        Images: "http://120.119.77.99:3000/assets/images/s1.jpg",
                        Introduction: "保社社區發展協會，原由理事長黃郡先生與總幹事徐國賢先生及會員共襄盛舉，創立於民國八十六年間。協會成立之初承蒙許多默默付出的會員辛苦經營，爾後民國九十四年間由理事" +
                            "長莊仁平先生與總幹事黃明宗先生代理職務一年六個月。現今為第三、四屆理事長韓進鄉先生與總幹事許清泉先生由會員大會經理事會順利而產生，並由高雄縣政府及大社鄉公所輔導" +
                            "和地方人士慷慨贊助，承先啟後奠定日後發展的基礎。目前於103年1月1日產生第五屆理事長許清泉與總幹事徐陳酉蘭繼續推動創新社區新里程。",
                        address: "高雄市大社區保社里中正路367-1號",
                        phone: "0925922969"
                        
                    }
                }
            },
            Footer: {
                data: {
                    contact: {
                        name: "高雄市大社區保社社區發展協會",
                        directorName: "許清泉",
                        secretary: "林小姐",
                        address: "高雄市大社區保社里中正路367-1號",
                        email: "sixgas@yahoo.com.tw",
                        phone: "0925922969"
                    }
                }
            }
        }
    }

    // console.log(props);
    const a = props;
    return (
        <Content.Provider value={data}>
            <Nav/>
            <Banner />
            <Main />
            <Footer />
        </Content.Provider>

    );
}

export default Template;