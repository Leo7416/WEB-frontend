import "../styles/AddressPage.css";
import { Dispatch, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { AddressesMock } from "../Mock";
import { Address } from "./AddressCard";
import mockImage from "../assets/mock.png";
import Breadcrumbs from "./Breadcrumbs";
import NavBar from "./NavBar";

const AddressPage: FC<{ selectedAddress: Address | undefined, setSelectedAddress: Dispatch<Address | undefined> }> = ({ selectedAddress, setSelectedAddress }) => {

    const { address_id } = useParams<{ address_id: string }>();

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/address/${address_id}`, { method: "GET" });

            if (!response.ok)
            {
                createMock();
                return;
            }

            const address: Address = await response.json()

            setSelectedAddress(address);
        } catch {
            createMock();
        }

    };

    const createMock = () => {

        if (address_id !== undefined) {
            setSelectedAddress(AddressesMock.find((address: Address) => address?.address_id == parseInt(address_id))!);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])  

    const imageUrl = selectedAddress?.images.slice(2, -1);
    const strImageUrl = `data:image/jpeg;base64,${ imageUrl }`;

    return (
        <div>
            <NavBar />
            <body>
                <Breadcrumbs />
                <div className="oval-application">
                    <p className="text-oval-application"> Доп информация о счётчиках: </p>
                    <div className="box"> портал услуг Москвы - mos.ru </div>
                    <div className="box-2"> портал «Госуслуг» - gosuslugi.ru </div>
                    <div className="box-3"> сайт «Мосводоканала» - mosvodokanal.ru </div>
                </div>
                <div className="card-container">
                    <div className="card_images_order">
                        <img src={selectedAddress?.images ? strImageUrl : mockImage} alt="Error" width="280" height="250" />
                    </div>
                    <div className="order-text">
                        {selectedAddress && (
                        <p>
                            Показания счетчика для {selectedAddress.address}, кв. {selectedAddress.apartment}
                        </p>
                        )}
                    </div>
                    <div className="water-meter-frame">{selectedAddress?.meter_reading}</div>
                    <p style={{ fontSize: "20px" }}>
                        Показаний считаются по последним трем цифрам
                    </p>
                </div>
            </body>
        </div>
        
    )
}

export default AddressPage;