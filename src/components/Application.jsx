import '../styles/Application.css';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteAddress, sendApplication, useData, deleteApplication } from "../slices/dataSlice";
import { useDispatch } from "react-redux";
import { GetData } from "../getData";
import NavBar from './NavBar';
import Breadcrumbs from './Breadcrumbs';

export default function Application() {
    const dispatch = useDispatch();
    const { water_meter_reading_id } = useParams(); // Получение water_meter_reading_id из маршрута
    GetData(water_meter_reading_id);
    const data = useData();

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
            <Link to='/application/all' className="my-applications-link">
                Все заявки
            </Link>
            <div className="shopping-cart-container">
                {data.map((address) => (
                    <div key={address.water_meter_reading_id} className="address-item">
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

                {data.length > 0 && (
                    <div>
                        <button
                            className="delete-button-apllication"
                            onClick={() => {
                                dispatch(deleteApplication(water_meter_reading_id));
                            }}
                        >
                            Удалить все
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
