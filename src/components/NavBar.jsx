import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NavBar.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { useData } from "../slices/dataSlice";
import { logout, updateUser } from "../slices/auth";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { GetID } from "../getData";


const NavBar = () => {

    const [moderator, setModerator] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        setModerator(currentUser?.is_staff || currentUser?.is_admin);
    }, [currentUser]);

    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            dispatch(updateUser(storedUser)); 
        }

    }, [dispatch]);

    const logOut = useCallback(() => {

        dispatch(logout());

    }, [dispatch]);

    GetID();

    const id = useData();

    const meterID = id[0];

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark custom-navbar-bg">
                <Link to={"/"} className="navbar-brand">
                    Главная
                </Link>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link custom-nav-link">
                                { currentUser.username }
                            </Link>
                        </li>
                        {moderator && (
                            <li className="nav-item">
                                <Link to={"/addresses"} className="nav-link custom-nav-link">
                                    Доступные адреса
                                </Link>
                            </li>
                        )} 
                        <li className="nav-item">
                            <Link to={"/application/all"} className="nav-link custom-nav-link">
                                Заявки
                            </Link>
                        </li>
                        <li className="nav-item">
                            <div className="cart-icon">
                                {meterID ? (
                                    <Link to={`/application/${meterID}`} className="nav-link custom-nav-link">
                                        <FaShoppingCart className="cart-size" />
                                    </Link>
                                ) : (
                                    <span className="nav-link custom-nav-link disabled">
                                        <FaShoppingCart className="cart-size" />
                                    </span>
                                )}
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link custom-nav-link" onClick={logOut}>
                                Выйти
                            </Link>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link custom-nav-link">
                            Войти
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link custom-nav-link">
                            Регистрация
                        </Link>
                    </li>
                    </div>
                )}
            </nav>
            
        </div>
        
    )
};

export default NavBar;