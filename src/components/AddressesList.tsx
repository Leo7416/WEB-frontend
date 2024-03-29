import "../styles/AddressesList.css";
import { useEffect, useState } from "react";
import { Address } from "./AddressCard";
import AddressCard from "./AddressCard";
import { AddressesMock } from '../Mock';
import SearchField from './SearchField';
import Breadcrumbs from './Breadcrumbs';
import NavBar from './NavBar';

const AddressesList = () => {

    const [address, setAddresses] = useState<Address[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchAddresses = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/search/?query=${query}`, { method: "GET" });

            if (!response.ok) {
                createMock();
                return;
            }

            const address: Address[] = await response.json();
            setAddresses(address);
            setIsMock(false);
            
        } catch (error) {
            createMock();
        }
    }

    const createMock = () => {
        if (query !== '') {
          const filteredAddresses = AddressesMock.filter(
            (address) =>
              address.town.toLowerCase().includes(query.toLowerCase()) ||
              address.address.toLowerCase().includes(query.toLowerCase())
          );
          setAddresses(filteredAddresses);
        } else {
          setAddresses(AddressesMock);
        }
        setIsMock(true); 
      };

    useEffect(() => {
        searchAddresses();
    }, [query])

    const cards = address.map(address  => (
        <AddressCard 
            key={address.address_id}
            address={address}
            isMock={isMock}
        />
    ))

    return (
        <div>
            <NavBar />
            <SearchField setQuery={setQuery} />
            <Breadcrumbs />
            <div className='oval'>
                <div className='text_oval'>
                    Показания счетчика воды
                </div>
            </div>
            <div className="container">
                { cards }
            </div>
        </div>
    )
}

export default AddressesList;
