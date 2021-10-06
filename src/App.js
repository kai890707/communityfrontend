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
// import {AuthContext} from './Api/Api';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import Routes from './Routes/Routes'
import NoMatch from './404/Layout';
import Template from './Template_1/Layout';
import TEMPLATE2 from './Template_2/Layout';
import News from './Template_1/Pages/News';

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
  return (
      <Route
        path={route.path}
        exact={route.exact}>
        <route.component routes={route.routes} />
      </Route>
  );
}
const App=() =>{
  // const [user, setUser] = useState(null);
  return (
    // <AuthContext.Provider value={{user, setUser}}>
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
    // </AuthContext.Provider>
  );
}
export default App;