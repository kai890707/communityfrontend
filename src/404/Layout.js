import {
    useLocation
} from "react-router-dom";
const Layout = () => {
    const { pathname } = useLocation()
    return (
            <h3>No match for <code>{pathname}</code></h3>
    )
}
export default Layout;