import React, {useState, useEffect} from 'react';
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
import SideBar from './SideBarLayout'
// import Config from './Pages/Config';
const Backend = ({routes}) => {
    console.log(routes); const Routes = routes;

    function RouteWithSubRoutes(route) {
        // console.log(route.path+"_"+route.exact);
        return (
            <Route path={route.path} exact={route.exact}>
                <route.component routes={route.routes}/>
            </Route>
        );
    }
    return (
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
    )
}
export default Backend;