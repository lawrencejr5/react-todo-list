import React from "react";

const List = ({ items, editItem, removeItem, clear }) => {
  return (
    <div className="myList">
      {items.length !== 0 ? <h3>My List({items.length})</h3> : ""}
      {items.map((item) => {
        const { id, value } = item;
        return (
          <div key={id} className="onelist">
            <span>{value}</span>
            <div className="action-btns">
              <button className="editBtn" onClick={() => editItem(id)}>
                Edit
              </button>
              <button className="removeBtn" onClick={() => removeItem(id)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
      {items.length !== 0 ? (
        <button onClick={clear} className="clear-btn">
          Clear All
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default List;
