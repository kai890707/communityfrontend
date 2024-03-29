import Home from '../Home/Layout';
import Template from '../Template_1/Layout';
import News from '../Template_1/Pages/News';
import NewsDetail from '../Template_1/Pages/NewsDetail';
import Attractions from '../Template_1/Pages/Attractions';
import AttractionsDetail from '../Template_1/Pages/AttractionsDetail';
import Specialty from '../Template_1/Pages/Specialty';
import SpecialtyDetail from '../Template_1/Pages/SpecialtyDetail';
import FeatureDetail from '../Template_1/Pages/FeatureDetail';
import Feature from '../Template_1/Pages/Feature';
import NoMatch from '../404/Layout';
import Login from '../Login/Layout';
import Backend from '../Backend/Layout';
import Config from '../Backend/Pages/Config'; 
import AnnouncementList from '../Backend/Pages/Announcement/AnnouncementList';
import AddAnnouncement from '../Backend/Pages/Announcement/AddAnnouncement';
import AccountConfig from '../Backend/Pages/AccountConfig';
import BackendIndex from '../Backend/Pages/Index';
import EditAnnouncement from '../Backend/Pages/Announcement/EditAnnouncement';
import FeatureList from '../Backend/Pages/Feature/FeatureList';
import AttractionsList from '../Backend/Pages/Attractions/AttractionsList';
import SpecialtyList from '../Backend/Pages/Specialty/SpecialtyList';
import AddPagePost from '../Backend/Pages/AddPagePost';
const routes = [
    // {
    //     path: '/',
    //     exact: true,
    //     component: Home
    // }, 
    {
        path: '/login',
        exact: true,
        component: Login
    }, {
        path: '/backend',
        exact: true,
        component: Backend,
        routes: [
            {
                path: '/',
                exact: true,
                component: BackendIndex
            },
            {
                path: '/config',
                exact: true,
                component: Config
            }, {
                path: '/announcementList',
                exact: true,
                component: AnnouncementList
            }, {
                path: '/addAnnouncement',
                exact: true,
                component: AddAnnouncement
            },{
                path: '/accountConfig',
                exact: true,
                component: AccountConfig
            }, {
                path:'/editAnnouncement/:pageId',
                exact: true,
                component: EditAnnouncement
            },{
                path:'/featureList',
                exact: true,
                component: FeatureList
            },{
                path:'/attractionsList',
                exact: true,
                component: AttractionsList
            },{
                path:'/specialtyList',
                exact: true,
                component: SpecialtyList
            },{
                path:'/addPagePost',
                exact: true,
                component: AddPagePost
            }
        ]
    }, {
        path: '/',
        exact: true,
        component: Template
    }, {
        path: '/社區特色',
        exact: true,
        component: Feature
    },
    {
        path: '/社區特色/:topicId',
        exact: true,
        component: FeatureDetail
    }, {
        path: '/社區公告',
        exact: true,
        component: News
    }, {
        path: '/社區公告/:topicId',
        exact: true,
        component: NewsDetail
    }, {
        path: '/社區景點',
        exact: true,
        component: Attractions
    }, {
        path: '/社區景點/:topicId',
        exact: true,
        component: AttractionsDetail
    }, {
        path: '/社區特產',
        exact: true,
        component: Specialty
    }, {
        path: '/社區特產/:topicId',
        exact: true,
        component: SpecialtyDetail
    }, {
        path: '/後臺登入',
        exact: true,
        component: Backend
    }, {
        path: '*',
        exact: true,
        component: NoMatch
    }
];

export default routes;