import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTodos, addTodo, deleteTodo, editTodo } from "./actions/todoActions";
import Spinner from "./components/Spinner";

function App(props) {
  const [targetId, setTargetId] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    props.getTodos();
  }, []);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setTodos(props.todo);
  }, [props.todo]);
  const handleSubmit = event => {
    event.preventDefault();
    if (text.trim()) {
      props.addTodo(targetId, text);
      showLoading();
    }
  };
  const showLoading = () => {
    setTodos([]);
    setText("");
    setTargetId("");
  };
  const handleEdit = event => {
    debugger;
    setTargetId(event.target.id);
    setText(event.target.attributes.value.nodeValue);
  };
  const handleDelete = event => {
    props.deleteTodo(event.currentTarget.id);
    showLoading();
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-grey-darkest m-2 p-1">Todo App</h1>

      {Object.keys(todos).length === 0 ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <input
                className="border border-grey rounded-lg my-2 p-1"
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="border border-grey-light rounded-lg p-1 m-2 hover:text-bold"
              >
                Submit
              </button>
            </div>
          </form>
          <ul className="block text-center mt-2">
            {todos.map(todo => (
              <li
                key={todo._id}
                className="list-reset rounded-lg py-3 my-2 border border-gray bg-transparent hover:bg-blue text-blue-dark hover:text-white cursor-pointer select-none"
              >
                {todo.text}
                <span className="absolute pin-r mr-5 pr-5">
                  <i
                    id={todo._id}
                    value={todo.text}
                    className="far fa-edit mr-5 pr-5 text-green-light"
                    onClick={handleEdit}
                  />
                  <i
                    id={todo._id}
                    className="far fa-trash-alt mr-5 pr-5 text-red-light"
                    onClick={handleDelete}
                  />
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { getTodos, addTodo, deleteTodo, editTodo }
)(App);
