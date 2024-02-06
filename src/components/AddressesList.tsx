import "../styles/AddressesList.css";
import { useEffect, useState } from "react";
import { Address } from "./AddressCard";
import AddressCard from "./AddressCard";
import { AddressesMock } from '../Mock';
import SearchField from './SearchField';
import Breadcrumbs from './Breadcrumbs';

const AddressesList = () => {

    const [address, setAddresses] = useState<Address[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const cards = address.map(address  => (
        <AddressCard 
            key={address.address_id}
            address={address}
            isMock={isMock}
        />
    ))

    return (
        <div>
            <header className='ul'><Breadcrumbs selectedAddress={ undefined } /></header>
            
            <div className='oval'></div>
            <div className="container">
                { cards }
            </div>
        </div>
    )
}

export default AddressesList;
