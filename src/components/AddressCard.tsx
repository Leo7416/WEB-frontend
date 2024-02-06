import "../styles/AddressCard.css";
import { FC, useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import mockImage from "../assets/mock.png";
import Buttons from "./AddDeleteButton";

export interface Address {
    address_id: number;
    town: string;
    address: string;
    apartment: string;
    house_type: string;
    meter_reading: number;
    images: string;
}

const AddressCard: FC<{ address: Address, isMock: boolean }> = ({ address, isMock }) => {

    const [imageUrl, setImageUrl] = useState<string>(''); 

    const getImageUrl = async (address_id: number): Promise<string> => {    
        const response = await fetch(`http://127.0.0.1:8000/address/${address_id}/images/get`, { method: 'GET' });
    
        if (!response.ok) {
            console.error(`Ошибка HTTP: ${ response.status }`);
            return '';
        }
    
        const imageUrl = await response.json();
        return imageUrl;
    };

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const imageUrl = await getImageUrl(address.address_id);
                setImageUrl(imageUrl);
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        };
    
        fetchImageUrl();
    }, [address.address_id]);

    const strImageUrl = `data:image/png;base64,${ imageUrl }`;

    return (
        <Card className="card">
            <div className="cut">
                <Card.Header style={{padding: 0, backgroundImage: `url(${isMock ? mockImage : strImageUrl})` }}> </Card.Header>
            </div>
            <Card.Body>
                <p className="info"> Город: {address.town} </p>
                <p className="card-text-2">Тип дома: {address.house_type} </p>
                <p className="card-text"> Адрес: {address.address} </p>
                <p className="card-text-1"> Квартира: {address.apartment} </p>
                <div className="button">
                    <Button href={`/address/${address.address_id}`} style={{color: '#000000', border: 0, backgroundColor: '#0dfa40'}}>Подробнее</Button>
                </div>
                <div className="button-2">
                    <Buttons address={address} />
                </div> 
            </Card.Body>
        </Card>
    );
};

export default AddressCard;