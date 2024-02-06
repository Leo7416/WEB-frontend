import '../styles/Application.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {deleteAddress, sendApplication, useData} from "../slices/dataSlice";
import {useDispatch} from "react-redux";
import {GetData} from "../getData";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';


export default function Application() {

// Функция для получения значения конкретной куки по ее имени
    function getCookie(name) {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }

        return null;
    }

    const sessionId = getCookie('session_id');
    const dispatch = useDispatch()
    GetData()  // вызов хука
    const data = useData()

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
            <Link to='/applications/all' className="my-applications-link">
                Все заявки
            </Link>
            <div className="shopping-cart-container">
                {data.map((address) => (
                    <div key={address.address_id} className="address-item">
                        <p>{address.town}</p>
                        <p>Адрес: {address.address}</p>
                        <p>Квартира: {address.apartment}</p>
                        <button
                            className="delete-button"
                            onClick={() => {
                                dispatch(deleteAddress(address.address_id));
                            }}
                          >
                            Удалить
                        </button>
                    </div>
                ))}
                {data.length > 0 && (
                    <div>
                        <button
                            className="generate-button"
                            onClick={() => {
                                dispatch(sendApplication(data));
                            }}
                          >
                            Сформировать
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}