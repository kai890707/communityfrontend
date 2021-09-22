import React, { useState, createContext } from 'react';
import ReactPaginate from 'react-paginate';
import Nav from '../Nav/PageLayout';
import Banner from '../Banner/PageLayout';
import Main from '../Main/NewsMain';
import Footer from '../Footer/PageLayout';
import '../index.scss'
const News = () => {
    const data = {
        name: "保社社區",
        pageName: {
            Nav: {
                data: {
                    title: "保社社區",
                    list: [
                        {
                            name: "首頁",
                            path: "/保社社區"
                        }, {
                            name: "社區特色",
                            path: "/保社社區/社區特色"
                        }, {
                            name: "社區公告",
                            path: "/保社社區/社區公告"
                        }, {
                            name: "社區景點",
                            path: "/保社社區/社區景點"
                        }, {
                            name: "社區特產",
                            path: "/保社社區/社區特產"
                        }
                    ]
                }
            },
            Banner: {
                data: {
                    name: "保社社區-社區公告",
                    image: "http://120.119.77.99:3000/assets/images/s1.jpg"
                }
            },
            Main: {
                data: {
                    news: [
                        {
                            id: 1,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/1",
                            date: "2021-09-14",
                            title: "金好玩。探訪金門戰地風光3日",
                            content: "因應疫情影響，若旅客旅遊期間需配合中央與地方政府防疫措施，請旅客配合金門縣政府快篩政策以保障各位旅客旅遊安全性，請於飛機起飛前2小時抵達機場辦理相關手續。",
                            images: "http://120.119.77.99:3000/assets/images/news1.jpeg"
                        }, {
                            id: 2,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/2",
                            date: "2021-09-14",
                            title: "明池森林九寮溪生態之旅1日",
                            content: "明池遊樂區位於北橫公路最高點，介於宜蘭縣與桃園縣交界處。海拔高度約1,150公尺，層峰疊翠、古木成林。由於地處霧林帶，每日過午即雲霧飄渺，水草茂密，波光艷瀲，湖" +
                                    "光山色相互呼應；森林保育處於此勒石「虫二」二字，隱喻此處風月無邊，佳景天成。",
                            images: "http://120.119.77.99:3000/assets/images/news2.jpeg"
                        }, {
                            id: 3,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/3",
                            date: "2021-09-14",
                            title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                            content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、" +
                                    "華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                            images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
                        }, {
                            id: 4,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/4",
                            date: "2021-09-14",
                            title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                            content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、" +
                                    "華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                            images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
                        },
                        {
                            id: 5,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/5",
                            date: "2021-09-14",
                            title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                            content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、" +
                                    "華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                            images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
                        },
                        {
                            id: 6,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/6",
                            date: "2021-09-14",
                            title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                            content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、" +
                                    "華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                            images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
                        },
                        {
                            id: 7,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/7",
                            date: "2021-09-14",
                            title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                            content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、" +
                                    "華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                            images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
                        },
                        {
                            id: 8,
                            href: "http://120.119.77.99:3000/保社社區/社區公告/8",
                            date: "2021-09-14",
                            title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                            content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、" +
                                    "華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                            images: "http://120.119.77.99:3000/assets/images/news3.jpeg"
                        }, 
                    ],
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

    return (
        
        <>
            <Nav data={data.pageName.Nav}/>
            <Banner data={data.pageName.Banner} />
            <Main  data={data.pageName.Main}/>
            <Footer  data={data.pageName.Footer}/>
        </>    
     
    );
}
export default News;