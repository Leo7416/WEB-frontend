import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NavBar.css';
import { Link } from "react-router-dom";


const NavBar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark custom-navbar-bg">
                <Link to={"/"} className="navbar-brand">
                    Главная
                </Link>
            </nav>
        </div>
    )
};

export default NavBar;