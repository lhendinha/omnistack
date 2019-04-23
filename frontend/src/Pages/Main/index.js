import React, { useState } from "react";

import api from "../../services/api";

import "./styles.css";

function Main(props) {
  const [newBox, setNewBox] = useState("");

  function handleInputChange(e) {
    setNewBox(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/boxes", {
      title: newBox
    });

    props.history.push(`/box/${response.data._id}`);
  }

  return (
    <div id="main-container">
      <form onSubmit={handleSubmit}>
        <img src="" alt="" />
        <input
          placeholder="Criar um box"
          value={newBox}
          onChange={handleInputChange}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default Main;
