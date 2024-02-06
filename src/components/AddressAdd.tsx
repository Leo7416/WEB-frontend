import '../styles/AddressAdd.css';
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Breadcrumbs from './Breadcrumbs';

const AddressAdd: FC = () => {
    const [addAddress, setAddAddress] = useState({
        town: "",
        address: "",
        apartment: "",
        house_type: "",
        meter_reading: "",
        address_status: "Действует"
    });

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setAddAddress(prevAddress => ({
            ...prevAddress!,
            [fieldName]: typeof value === 'string' ? (fieldName === 'apartment' || fieldName === 'meter_reading' ? parseInt(value, 10) : value) : value
        }));
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('town', addAddress.town);
            formData.append('address', addAddress.address);
            formData.append('apartment', addAddress.apartment); 
            formData.append('house_type', addAddress.house_type);
            formData.append('meter_reading', addAddress.meter_reading); 

            const imageInput = document.getElementById('imageInput') as HTMLInputElement;
            if (imageInput.files && imageInput.files[0]) {
                formData.append('images', imageInput.files[0]);
            }

            const response = await fetch('http://127.0.0.1:8000/addresses/post/', {
                method: 'POST',
                credentials: 'include',
                body: formData,
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

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
            <Link to='/addresses' className="buttonBack">
                Назад
            </Link>
            <div className="add">
                <div>
                    <label>Город:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("town", e.target.value)}
                    />
                </div>
                <div>
                    <label>Адрес:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("address", e.target.value)}
                    />
                </div>
                <div>
                    <label>Квартира:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("apartment", e.target.value)}
                    />
                </div>
                <div>
                    <label>Тип дома:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("house_type", e.target.value)}
                    />
                </div>
                <div>
                    <label>Показатель счетчика:</label>
                    <input
                        type="text"
                        onChange={(e) => handleFieldChange("meter_reading", e.target.value)}
                    />
                </div>
                <div>
                    <label>Фото:</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="images/*"
                    />
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default AddressAdd;