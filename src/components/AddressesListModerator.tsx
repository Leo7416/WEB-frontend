import "../styles/AddressesListModerator.scss";
import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Address } from "./AddressCard";
import InputField from "./SearchField";
import { AddressesMock } from '../Mock';
import Breadcrumbs from './Breadcrumbs';
import NavBar from "./NavBar";


const AddresssListModerator = () => {

    const [addresses, setAddresses] = useState<Address[]>([]);

    const [query, setQuery] = useState<string>("");

    const searchAddresses = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/search/?query=${query}`, { method: "GET" });

            if (!response.ok) {
                createMock();
                return;
            }

            const addresses: Address[] = await response.json();
            setAddresses(addresses);

        } catch (error) {
            createMock();
        }
    }

    const createMock = () => {

        setAddresses(AddressesMock);

    }

    useEffect(() => {
        searchAddresses();
    }, [query])

    const handleDeleteClick = async (id: number) => {
        try {
            // Отправка запроса на бэкенд при нажатии
            const response = await fetch(`http://127.0.0.1:8000/address/${id}/update/`, {
                method: 'DELETE',  
                credentials: 'include'
            });

            window.location.reload();

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
            }
        } catch (error) {
              console.error('Произошла ошибка:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <InputField setQuery={setQuery} />
            <Breadcrumbs />
            <div>
                <button className="buttoncreate">
                    <Link to={`/addresses/post`} >
                        Создать
                    </Link>
                </button>
                <table className="table">
                <thead>
                    <tr>
                    <th>Номер</th>
                    <th>Город</th>
                    <th>Адрес</th>
                    <th>Квартира</th>
                    <th>Тип дома</th>
                    <th>Показания счетчика</th>
                    <th>Действия</th>
                    </tr>
                </thead>
                {addresses.map(address  => (
                <tbody>
                    <tr key={address.address_id}>
                        <td>{address.address_id}</td>
                        <td>{address.town}</td>
                        <td>{address.address}</td>
                        <td>{address.apartment}</td>
                        <td>{address.house_type}</td>
                        <td>{address.meter_reading}</td>
                        <td>
                            <button className="editbutton">
                                <Link to={`/addresses/update/${ address.address_id }`} >
                                    Редактировать
                                </Link>
                            </button>
                            <button className="delete" onClick={() => handleDeleteClick(address.address_id)}>Удалить</button>
                        </td>
                    </tr>
                </tbody>
                ))}
                </table>
            </div>
        </div>
    )
}

export default AddresssListModerator;