import '../styles/AddressUpdate.css';
import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Address } from "./AddressCard";
import Breadcrumbs from "./Breadcrumbs";
import NavBar from "./NavBar";


const AddressUpdate: FC = () => {
    const { address_id } = useParams<{ address_id: string }>();

    const [editableAddress, setEditableAddress] = useState<Address>();

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/address/${address_id}`, { method: "GET" });

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
                return;
            }

            const fetchedAddress: Address = await response.json();
            setEditableAddress(fetchedAddress);

        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [address_id]);

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setEditableAddress(prevAddress => ({
            ...prevAddress!,
            [fieldName]: value
        }));
    };

    const handleSave = async () => {
      // Отправить запрос на сервер для сохранения изменений
        try {
            const response = await fetch(`http://127.0.0.1:8000/address/${address_id}/update/`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editableAddress)
            });

            window.location.reload();

            if (!response.ok) {
                console.error(`Ошибка HTTP: ${response.status}`);
                return;
            }

        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
    };

    if (!editableAddress) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <Link to='/addresses' className="buttonBack">
                Назад
            </Link>
            <Breadcrumbs />
            <div className="edit">
                <div>
                    <label>Город:</label>
                    <input
                        type="text"
                        value={editableAddress.town}
                        onChange={(e) => handleFieldChange("town", e.target.value)}
                    />
                </div>
                <div>
                    <label>Адрес:</label>
                    <input
                        type="text"
                        value={editableAddress.address}
                        onChange={(e) => handleFieldChange("address", e.target.value)}
                    />
                </div>
                <div>
                    <label>Квартира:</label>
                    <input
                        type="text"
                        value={editableAddress.apartment}
                        onChange={(e) => handleFieldChange("apartment", e.target.value)}
                    />
                </div>
                <div>
                    <label>Тип дома:</label>
                    <input
                        type="text"
                        value={editableAddress.house_type}
                        onChange={(e) => handleFieldChange("house_type", e.target.value)}
                    />
                </div>
                <div>
                    <label>Показатель счетчика:</label>
                    <input
                        type="text"
                        value={editableAddress.meter_reading}
                        onChange={(e) => handleFieldChange("meter_reading", e.target.value)}
                    />
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default AddressUpdate;