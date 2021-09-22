import React, {useContext, createContext, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
  useLocation,
    useParams
} from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import Routes from './Routes/Routes'
import NoMatch from './404/Layout';
import Template from './Template_1/Layout';
import TEMPLATE2 from './Template_2/Layout';
import News from './Template_1/Pages/News';
const test = [
      //  {
      //       path: '/',
      //       component: () => <div>Home1</div>,
      //   },
      
        {
          path: '/保社社區',
          component: Template,
          data: {
            name: "保社社區",
            pageName: {
              Nav: {
                data: {
                  title:"保社社區",
                  list: [{
                    name: "首頁",
                    path:"/保社社區",
                  }, {
                    name: "社區公告",
                    path:"/保社社區/社區公告"
                  }]
                }
              },
              Banner: {
                data: {
                  name: "保社社區",
                  Introduction: "保社社區發展協會，原由理事長黃郡先生與總幹事徐國賢先生及會員共襄盛舉，創立於民國八十六年間。協會成立之初承蒙許多默默付出的會員辛苦經營，爾後民國九十四年間由理事長莊仁平先生與總幹事黃明宗先生代理職務一年六個月。現今為第三、四屆理事長韓進鄉先生與總幹事許清泉先生由會員大會經理事會順利而產生，並由高雄縣政府及大社鄉公所輔導和地方人士慷慨贊助，承先啟後奠定日後發展的基礎。目前於103年1月1日產生第五屆理事長許清泉與總幹事徐陳酉蘭繼續推動創新社區新里程。",
                  image:"http://120.119.77.99:3000/assets/images/s1.jpg",
                }
              },
              Main: {
                data: {
                  news: [
                    {
                      id: 1,
                      href:"",
                      title: "金好玩。探訪金門戰地風光3日",
                      content: "因應疫情影響，若旅客旅遊期間需配合中央與地方政府防疫措施，請旅客配合金門縣政府快篩政策以保障各位旅客旅遊安全性，請於飛機起飛前2小時抵達機場辦理相關手續。",
                      images:""
                    },
                      {
                      id: 2,
                      href:"",
                      title: "明池森林九寮溪生態之旅1日",
                      content: "明池遊樂區位於北橫公路最高點，介於宜蘭縣與桃園縣交界處。海拔高度約1,150公尺，層峰疊翠、古木成林。由於地處霧林帶，每日過午即雲霧飄渺，水草茂密，波光艷瀲，湖光山色相互呼應；森林保育處於此勒石「虫二」二字，隱喻此處風月無邊，佳景天成。",
                      images:""
                    },
                        {
                      id: 3,
                      href:"",
                      title: "武陵梨山福壽心(梨山賓館) 2日(4人成行)",
                      content: "天池的奇觀景象、福壽山農場的百花齊放，彷彿進入世外桃源．．福壽山農場，沿途可看到山地文物陳列館，農場內規劃有鮮豔動人的花園，由此處眺望四周，景緻極佳。還有天池、華岡及達觀亭為先總統蔣公生前的行館，更有機會欣賞屬於梨山的雲海景觀(無導覽)。",
                      images:""
                    },  {
                      id: 4,
                      href:"",
                      title: "水蜜桃採果、森呼吸~拉拉山巨木群1日",
                      content: "搭乘合法營業用車，舒適安全的旅程。",
                      images:""
                    }
                  ]
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
                    phone: "0925922969",
                  },
                  
                }
              }
            },
           
            }
         
        },{
          path: '/保社社區/社區公告',
          component: News,
          data: {
            name: "保社社區",
            pageName: {
              Nav: {
                data: {
                  title:"保社社區",
                  list:["首頁","社區公告"]
                }
              },
              Banner: {
                data: {
                  name: "合群社區",
                  Introduction:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ad sunt harum voluptate corporis quidem error hic eveniet dolorem est? Modi reiciendis saepe veritatis tenetur perferendis harum est numquam expedita.",
                  image:"http://120.119.77.99:3000/assets/images/s1.jpg",
                }
              },
              Main: {
                data: 123
              },
              Footer: {
                data: {
                  title:"保社社區Footer"
                }
              }
            },
           
            }
         
  },
  // {
  //         path: '/合群社區',
  //         component: Template,
  //         data: {
  //           name: "合群社區",
  //           pageName: {
  //             Nav: {
  //               data: {
  //                 title:"合群社區",
  //                 list:["首頁","社區公告"]
  //               }
  //             },
  //             Banner: {
  //               data: {
  //                 image:"http://120.119.77.99:3000/assets/images/1.jpg",
  //               }
  //             },
  //             Main: {
  //               data: 123
  //             },
  //             Footer: {
  //               data: {
  //                 title:"合群社區Footer"
  //               }
  //             }
  //           },
           
  //           }
  //       },{
  //         path: '/合群/News',
  //         component: Template,
  //         data: {
  //           name: "合群社區",
  //           pageName: {
  //             Main: {
  //               data: "最新消息"
  //             },
  //             Nav: {
  //               data: 123
  //             }
  //           },
           
  //         }
  //       },
  {

            component: NoMatch,
        }, 
]
// export const Content = createContext(Routers);
// function RouteWithSubRoutes(route) {
//     return (
//     <Route
//       path={route.path}
//       exact={true}
//       render={props => (
//         // pass the sub-routes down to keep nesting
      
//         <route.component data={route.data} {...props} routes={route.routes} />
//       )}
//     />
//   );
// }
function RouteWithSubRoutes(route) {
            // console.log(route.path+"_"+route.exact);
  return (
      <Route
        path={route.path}
        exact={route.exact}>
        <route.component routes={route.routes} />
      </Route>
  );
}
const No = () => {
    const { pathname } = useLocation()
    return (
            <h3>No match for <code>{pathname}</code></h3>
    )
}
// const A = () => <h2>Home</h2>
// const C = () => <h2>post</h2>
// const B = ({ routes }) => {
//   return (
//     <div>
//       社區
//        {
//         routes.map((route, i) => {
  
//           return <RouteWithSubRoutes key={route.path} {...route}   />
    
//         })
//         }
//     </div>
//   );
// }
// const D =() =>{
//   // The <Route> that rendered this component has a
//   // path of `/topics/:topicId`. The `:topicId` portion
//   // of the URL indicates a placeholder that we can
//   // get from `useParams()`.
//   let { topicId } = useParams();

//   return (
//     <div>
//       <h3>{topicId}</h3>
//     </div>
//   );
// }

const App=() =>{
  return (
    <Router >
    
      <Switch>
      {
        Routes.map((route, i) => {
        //     return (
        //       <Route
        //       key={route.path}
        //       path={route.path}
        //       exact={route.exact}>
        //       <route.component routes={route.routes} />
        //     </Route>
        // );
          console.log(route);
          return <RouteWithSubRoutes key={route.path} {...route}   />
 
        })
        }
  </Switch>
    </Router>
 
  );
}
export default App;