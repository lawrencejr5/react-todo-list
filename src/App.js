import React, { useEffect, useState } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
const getLocalStorage = () => {
  let todoList = localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
  return todoList;
};
const App = () => {
  const id = new Date().getTime().toString();
  const [value, setValue] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    text: "Hello world",
    type: "success",
    status: false,
  });
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);
  useEffect(() => {
    let clearAlert = setTimeout(() => {
      setAlert({ text: "", type: "", status: false });
    }, 1000);
    return () => clearTimeout(clearAlert);
  }, [alert]);

  const createAlert = (text, type, status) => {
    setAlert({
      text: text,
      type: type,
      status: status,
    });
  };

  const editItem = (id) => {
    let editItem = list.find((item) => {
      if (id === item.id) {
        return item;
      }
    });
    setEditId(editItem.id);
    setValue(editItem.value);
    setEditing(true);
  };

  const removeItem = (id) => {
    const filteredList = list.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setList(filteredList);
    createAlert("An item was removed", "danger", true);
  };

  const clearAll = () => {
    setList([]);
    createAlert("List has been emptied successfully", "danger", true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      createAlert("Input field cannot be empty", "danger", true);
    } else if (value && editing) {
      const newList = list.map((item) => {
        if (item.id === editId) {
          return { id: editId, value };
        }
        return item;
      });
      setList(newList);
      createAlert("Edited successfully", "success", true);
      setValue("");
      setEditId(null);
      setEditing(false);
    } else {
      setList((currVal) => {
        let newList = [...currVal, { id, value }];
        return newList;
      });
      createAlert("New item has been added", "success", true);
      setValue("");
    }
  };

  return (
    <main>
      <section className="container">
        {alert.status && (
          <Alert type={alert.type} text={alert.text} status={alert.status} />
        )}
        <span className="header">My Personal List app</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="eg. Bankai"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button>{editing ? "Edit" : "Add"}</button>
        </form>
        <hr />
        <hr />
        <List
          items={list}
          editItem={editItem}
          removeItem={removeItem}
          clear={clearAll}
        />
      </section>
    </main>
  );
};

export default App;
