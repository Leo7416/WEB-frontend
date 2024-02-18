import './App.css'
import { FC, useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddressList from './components/AddressesList'
import AddressPage from './components/AddressPage';
import Application from './components/Application';
import AddressAdd from './components/AddressAdd'
import ApplicationsList from './components/ApplicationsList';
import AddressesListModerator from './components/AddressesListModerator';
import AddressUpdate from './components/AddressUpdate'
import Login from "./components/LogIn";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

    const [selectedAddress, setSelectedAddress] = useState(undefined);

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div>
                <div>
                    <Routes>
                    <Route path='/' element={<AddressList />} />
                    <Route path='/addresses/update/:address_id' element={ <AddressUpdate /> } />
                    <Route path='/addresses/post' element={ <AddressAdd/> } />
                    <Route path='/addresses' element={ <AddressesListModerator/> } />
                    <Route path='/address/:address_id' element={<AddressPage selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />} />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/register" element={ <Register /> } />
                    <Route path="/application/:water_meter_reading_id" element={ <Application/> } />
                    <Route path='/application/all' element={ <ApplicationsList/> } />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;