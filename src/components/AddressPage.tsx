import "../styles/AddressPage.css";
import { Dispatch, useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { AddressesMock } from "../Mock";
import { Address } from "./AddressCard";
import mockImage from "../assets/mock.png";
import Breadcrumbs from "./Breadcrumbs";
import NavBar from './NavBar';


const AddressPage: FC<{ selectedAddress: Address | undefined, setSelectedAddress: Dispatch<Address | undefined> }> = ({ selectedAddress, setSelectedAddress }) => {

    const { address_id } = useParams<{ address_id: string }>();

    const [isMock, setIsMock] = useState<boolean>(false);

    const [imageUrl, setImageUrl] = useState<string>('');

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/address/${address_id}`, { method: "GET" });

            if (!response.ok) {
                createMock();
                return;
            }

            const address: Address = await response.json()

            setSelectedAddress(address);
            setIsMock(false);
            setImageUrl(address.images.slice(2, -1));
        } catch {
            createMock();
        }

    };

    const createMock = () => {

        if (address_id !== undefined) {
            setSelectedAddress(AddressesMock.find((address: Address) => address?.address_id == parseInt(address_id))!);
            setIsMock(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const strImageUrl = `data:image/png;base64,${imageUrl}`;

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
            <div className="oval-application">
                <p className="text-oval-application"> Способы узнать показаний счетчиков: </p>
                <div className="box"> портал услуг Москвы - mos.ru </div>
                <div className="box-2"> портал «Госуслуг» - gosuslugi.ru </div>
                <div className="box-3"> сайт «Мосводоканала» - mosvodokanal.ru </div>
            </div>
            <div className="card_images_order"><img src={isMock ? mockImage : strImageUrl} alt="Error" width="280" height="250" />
            </div>
            <div className="order-text">
                {selectedAddress && (
                    <p>
                        Показания счетчика для {selectedAddress.address}, кв. {selectedAddress.apartment}
                    </p>
                )}
            </div>
            <div className="water-meter-frame"> {selectedAddress?.meter_reading} </div>
            <p style={{ fontSize: "30px" }}>
                Показаний считаются по последним трем цифрам
            </p>
        </div>
    )
}

export default AddressPage;