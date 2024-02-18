import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import dataReducer from "./slices/dataSlice";
import filterReducer from './slices/filterSlice';

// Объединяем редюсеры в один корневой редюсер
const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  ourData: dataReducer,
  filter: filterReducer,
});

// Создаем магазин Redux с корневым редюсером
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});