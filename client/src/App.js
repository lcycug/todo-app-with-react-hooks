import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTodos } from "./actions/todoActions";
import Spinner from "./components/Spinner";

function App(props) {
  useEffect(() => {
    props.getTodos();
  }, []);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setTodos(props.todo);
  }, [props.todo]);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-grey-darkest m-2 p-1">Todo App</h1>
      {Object.keys(todos).length === 0 ? (
        <Spinner />
      ) : (
        <>
          <ul className="block text-center mt-2">
            {todos.map(todo => (
              <li
                key={todo._id}
                className="list-reset rounded-lg py-3 my-2 border border-gray bg-transparent hover:bg-blue text-blue-dark hover:text-white cursor-pointer select-none"
              >
                {todo.text}
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
  { getTodos }
)(App);
