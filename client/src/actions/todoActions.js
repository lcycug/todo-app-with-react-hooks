import axios from "axios";
import { GET_TODOS, GET_ERROR } from "./types";

export const getTodos = () => dispatch => {
  axios
    .get("/api/todo")
    .then(res => dispatch({ type: GET_TODOS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};

export const addTodo = (targetId, text) => dispatch => {
  console.log(targetId);
  if (targetId) {
    axios
      .post(`/api/todo/update/${targetId}`, { text })
      .then(res => dispatch({ type: GET_TODOS, payload: res.data }))
      .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
  } else {
    axios
      .post("/api/todo", { text })
      .then(res => dispatch({ type: GET_TODOS, payload: res.data }))
      .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
  }
};

export const deleteTodo = todoId => dispatch => {
  axios
    .delete(`/api/todo/${todoId}`)
    .then(res => dispatch({ type: GET_TODOS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};

export const editTodo = (todoId, text) => dispatch => {
  axios
    .post(`/api/todo/update/${todoId}`, { text })
    .then(res => dispatch({ type: GET_TODOS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};

export const switchStatus = todoId => dispatch => {
  axios
    .post(`/api/todo/switch/${todoId}`)
    .then(res => dispatch({ type: GET_TODOS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERROR, payload: err.response.data }));
};
