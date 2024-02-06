import './App.css'
import { FC, useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddressList from './components/AddressesList'
import AddressPage from './components/AddressPage';
import Application from './components/Application';
import ApplicationsList from './components/ApplicationsList';
import Login from "./components/LogIn";
import Register from "./components/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

    const [selectedAddress, setSelectedAddress] = useState(undefined);

    return (
        <BrowserRouter>
            <div>
                <div>
                    <Routes>
                    <Route path='/' element={<AddressList />} />
                    <Route path='/application/:address_id' element={<AddressPage selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />} />
                    <Route path='/logical_delete/:address_id' element={<AddressList />} />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/register" element={ <Register /> } />
                    <Route path='/application' element={ <Application /> } />
                    <Route path='/applications/all' element={ <ApplicationsList/> } />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;