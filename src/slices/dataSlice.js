import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import axios from "axios";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: [], 
    },
    reducers: {
        setData(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data = payload
        },
        sendAppl(state, {payload}) {  
            state.Data = [];
        },
        delAddress(state, { payload }) {
            const { id } = payload;
            // Удаляем услугу из массива
            state.Data = state.Data.filter(address => address.address_id !== id);
        },
        sendAddress(state, {payload}) {
            const { id } = payload;
            state.Data.push({ address_id }); // добавляем новый объект с указанным id
            console.log(id);
        },
        deleteAppl(state, action) {
            const { water_meter_reading_id } = action.payload;
            // Удаляем заявку из состояния
            state.Data = state.Data.filter(
              (application) => application.water_meter_reading_id !== water_meter_reading_id
            );
          },
    }
})

export const useData = () =>
    useSelector((state) => state.ourData.Data)

export const {
    setData: setDataAction,
    sendAppl: sendApplAction,
    delAddress: delAddressAction,
    sendAddress: sendAddressAction,
    deleteAppl: deleteApplAction
} = dataSlice.actions

export const deleteAddress = (id) => async (dispatch) => {
  
    // Отправка запроса на удаление на бэкенд
    await axios.delete(`http://127.0.0.1:8000/manytomany/${id}/`, { withCredentials: true });
    dispatch(delAddressAction({ id }));
}

export const sendApplication = (data) => async (dispatch) => {

    axios.put(`http://127.0.0.1:8000/application/${data[0].meter_id}/user/put/`, null, { withCredentials: true })
    axios.post(`http://127.0.0.1:9000/price/`, { data: data }, { headers: { 'Content-Type': 'application/json' }}, { withCredentials: true })

    dispatch(sendApplAction());
}

export const sendAddress = (id) => async (dispatch) => {
  
    // Отправка запроса на формирование на бэкенд
    await axios.post(`http://127.0.0.1:8000/address/${id}/`, null, { withCredentials: true });
    dispatch(sendAddressAction({ id }));
}

export const deleteApplication = (water_meter_reading_id) => async (dispatch) => {
    await axios.delete(`http://127.0.0.1:8000/application/${water_meter_reading_id}/delete/`, {
        withCredentials: true,
      });
      // Если удаление прошло успешно, отправляем действие для обновления состояния
      dispatch(deleteApplAction({ water_meter_reading_id }));
  };

export default dataSlice.reducer