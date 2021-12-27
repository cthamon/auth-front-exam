import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../redux/authSlice";

export default function Navbar() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', margin: '0 30px' }}>
                <a className="navbar-brand" href="" onClick={() => navigate("/")}>APPLICATION</a>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {user ?
                            <li className="nav-item">
                                <a className="nav-link" href="" onClick={() => { localStorage.removeItem('token'); dispatch(signOut()); }}>Sign Out</a>
                            </li> :
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="" onClick={() => { url === "/register" ? navigate("/") : navigate("/register"); }}>
                                    {url === "/register" ? "Sign in" : "Sign up"}
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
