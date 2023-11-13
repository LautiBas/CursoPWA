import React, { useState } from "react";

function InputForm(props) {
    return (
      <div style={{ display: "flex", marginBottom: 8 }}>
        <label style={{ width: "100px", marginRight: 4 }}>{props.label}</label>
        <input
          value={props.value}
          name={props.name}
          type="text"
          onChange={props.onChange}
        />
      </div>
    );
  }


function Form() {
  return (
    <div>
      <form className="form">
      <h1 className="titulo">Registrate en nuestra Web</h1>
      <div>
            <label for="nombre">Nombre</label><br></br>
            <input type="text" id="nombre_id" name="nombre"></input><br></br>
            <label for="nombre">Email</label><br></br>
            <input type="email" id="email_id" name="email"></input><br></br>
            <label for="tel">Contraseña</label><br></br>
            <input type="password" id="tel_id" name="password"></input>
            
        </div><br></br>
      <button
        type="submit"
      >
        Registrarse
      </button>
    </form>
    </div>
  );
}

export default Form;