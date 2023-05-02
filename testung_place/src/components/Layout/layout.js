import {Link, Outlet} from "react-router-dom";
import './layout.css'
const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">People</Link>
                    </li>
                    <li>
                        <Link to="/planets">Planets</Link>
                    </li>
                    <li>
                        <Link to="/starship">Starship</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;