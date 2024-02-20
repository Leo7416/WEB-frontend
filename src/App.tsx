import './App.css'
import { FC, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddressList from './components/AddressesList'
import AddressPage from './components/AddressPage';
import { Address } from './components/AddressCard';

const App: FC = () => {

    const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);

    return (
        <div>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Routes>
                    <Route path='/' element={<AddressList />} />
                    <Route path='/address/:address_id' element={<AddressPage selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />}  />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;