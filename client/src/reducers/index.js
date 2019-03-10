import { combineReducers } from "redux";
import todoReducer from "./todo";
import errorReducer from "./error";

export default combineReducers({ todo: todoReducer, error: errorReducer });
