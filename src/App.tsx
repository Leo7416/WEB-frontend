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
            
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AddressList />} />
                    <Route path='/application/:address_id' element={<AddressPage selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />} />
                    <Route path='/logical_delete/:address_id' element={<AddressList />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;