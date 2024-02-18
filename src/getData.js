import { useEffect } from "react";
import axios from "axios";
import { setDataAction } from "./slices/dataSlice";
import { useDispatch } from "react-redux";

export function GetData(water_meter_reading_id) {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                let url = 'http://127.0.0.1:8000/application/';
                // If water_meter_reading_id is passed, add it to the URL
                if (water_meter_reading_id) {
                    url += `${water_meter_reading_id}/`;
                    const response = await axios.get(url, { withCredentials: true });
                    const data = response.data;
                    dispatch(setDataAction(data));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData(); // Call fetchData when the component mounts
    }, [dispatch, water_meter_reading_id]); // water_meter_reading_id added to useEffect dependencies
}

export function GetID() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/application/user/', { withCredentials: true });
                dispatch(setDataAction(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [dispatch]); // Пустой массив зависимостей, чтобы вызывать fetchData только при монтировании компонента
}