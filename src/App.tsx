import './App.css'
import { FC, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom';
import AddressList from './components/AddressesList'
import AddressPage from './components/AddressPage';
import { Address } from './components/AddressCard';

const App: FC = () => {

    const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);

    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<AddressList />} />
                    <Route path='/address/:address_id' element={<AddressPage selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />} />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App;