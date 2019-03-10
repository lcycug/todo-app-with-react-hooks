import axios from "axios";
import { GET_TODOS, GET_ERROR } from "./types";

export const getTodos = () => dispatch => {
  axios
    .get("/api/todo")
    .then(res => dispatch({ type: GET_TODOS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};
