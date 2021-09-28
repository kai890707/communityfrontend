import React, {useState, useEffect,useContext} from 'react';
import {
    Container,
    Row,
    Col,
    FloatingLabel,
    Form,
    Button,
    Collapse,
    Nav
} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";
import SideBar from './SideBarLayout';
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,tokenGetApi} from '../Api/Api';
// import {tokenExpired} from '../Api/Utils';
// import Config from './Pages/Config';
// import {AuthContext} from '../Api/Api';
import NotLogin from './Pages/NotLogin';
const Backend = ({routes}) => {
    const Routes = routes;
    function RouteWithSubRoutes(route) {
        return (
            <Route path={route.path} exact={route.exact}>
                <route.component routes={route.routes}/>
            </Route>
        );
    }
    
    return (
        /**
         * [判斷有無token進行頁面渲染]
         */
        (getAuthToken())?(
            <HashRouter>
                <div className="container-fluid">
                    <div className="row flex-nowrap">
                        <SideBar/>
                        <div className="col-11 py-3 backEnd-wrap-color">
                            <Switch>
                                {Routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route}/>))}
                            </Switch>
                        </div>
                    </div>
                </div>
            </HashRouter>
        ):(
            <NotLogin />
        )
           
    )
}
export default Backend;