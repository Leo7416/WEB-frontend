import '../styles/AddDeleteButton.css';
import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../slices/auth';
import { GetData } from '../getData';
import { useData, deleteAddress, sendAddress } from '../slices/dataSlice';


const Buttons = ({ address }) => {

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            dispatch(updateUser(storedUser)); 
        }

    }, [dispatch]);

    const [isActiveAdd, setIsActiveAdd] = useState(true);
    
    GetData();

    const data = useData();

    useEffect(() => {
        const addressIds = data.map(item => item?.id);
        setIsActiveAdd(!addressIds.includes(address.address_id));
    }, [data, address.address_id]);

    const handleAddClick = () => {

        setIsActiveAdd(false);

        dispatch(sendAddress(address.address_id))

    };

    const handleDeleteClick = () => {

        dispatch(deleteAddress(address.address_id))

        setIsActiveAdd(true);

    };

    return (
        <div className="cardButton">
            {!isActiveAdd ? (
                <button className='delete' onClick={handleDeleteClick}>Удалить</button>
            ) : (currentUser ? (
                <button className='add' onClick={handleAddClick}>Добавить</button>
            ) : (
                <button className='add'>
                    <Link to='/login' className='black-link'>
                        Добавить
                    </Link>
                </button>
                
            ))}
        </div>
    );
};

export default Buttons;