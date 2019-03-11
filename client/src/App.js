import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
  switchStatus
} from "./actions/todoActions";
import Spinner from "./components/Spinner";

function App(props) {
  const tabs = ["All", "Active", "Completed"];
  const [targetId, setTargetId] = useState("");
  const [text, setText] = useState("");
  const [currentTab, setCurrentTab] = useState("All");
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
    setTargetId(targetId !== event.target.id ? event.target.id : "");
    setText(
      targetId !== event.target.id
        ? event.target.attributes.value.nodeValue
        : ""
    );
  };
  const handleDelete = event => {
    props.deleteTodo(event.currentTarget.id);
    showLoading();
  };
  const handleSwitch = event => {
    props.switchStatus(event.target.id);
  };
  const handleCurrentTab = event => {
    setCurrentTab(event.target.id);
  };
  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-center text-grey-darkest m-2 p-1">Todo App</h1>
      <div className="text-center">
        <ul className="list-reset inline-flex">
          {tabs.map(tab => (
            <li
              key={tab}
              id={tab}
              className={`p-3 m-3 cursor-pointer ${
                tab === currentTab ? "font-black" : "font-hairline"
              }`}
              onClick={handleCurrentTab}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
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
                className="border border-grey-light rounded-lg px-3 py-1 m-1 hover:border-orange"
              >
                Submit
              </button>
            </div>
          </form>
          <ul className="block text-center mt-2">
            {todos
              .filter(todo =>
                currentTab === "All"
                  ? todo
                  : currentTab === "Active"
                  ? todo.completed === false
                  : todo.completed === true
              )
              .map(todo => (
                <li
                  key={todo._id}
                  id={todo._id}
                  onDoubleClick={handleSwitch}
                  className={`list-reset rounded-lg py-3 my-2 border border-grey cursor-pointer select-none ${
                    todo.completed
                      ? "italic line-through font-hairline"
                      : "font-black"
                  } ${
                    targetId === todo._id
                      ? "bg-blue text-white"
                      : "bg-transparent hover:bg-blue text-blue-dark hover:text-white"
                  }`}
                >
                  <i
                    id={todo._id}
                    onClick={handleSwitch}
                    className={`far float-left ml-5 ${
                      todo.completed ? "fa-check-square" : "fa-square"
                    }`}
                  />
                  {todo.text}
                  <span className="float-right">
                    <i
                      id={todo._id}
                      value={todo.text}
                      className="far fa-edit pr-5 text-green-light"
                      onClick={handleEdit}
                    />
                    <i
                      id={todo._id}
                      className="far fa-trash-alt pr-5 text-red-light"
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
  { getTodos, addTodo, deleteTodo, editTodo, switchStatus }
)(App);
