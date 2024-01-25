import React, { useState } from "react";

let charginScene = document.getElementById("chargeImg");
const body=document.querySelector('body');
export const Login = ({ setLogued }) => {
  let [register, setRegister] = useState(false);
  function changetoRegister() {
    register ? setRegister(false) : setRegister(true);
  }

  return (
    <div className="login">
      {register ? (
        <RegisterForm
          onClick={changetoRegister}
          changeRegister={() => setRegister(false)}
        />
      ) : (
        <LoginForm onClick={changetoRegister} setLogued={() => setLogued()} />
      )}
    </div>
  );
};

function LoginForm({ onClick, setLogued }) {
  function checkLogin(e) {
    e.preventDefault();
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("passwd");
    if (inputEmail.value && inputPassword.value) {
      charginScene.style.display = "flex";
      verifyUser(inputEmail.value, inputPassword.value);
    }
  }

  async function verifyUser(email, password) {
    
    let correct = false;
    await fetch(
      "https://campo.talkandeat.es/api/verify?correo=" +
        email +
        "&contraseña=" +
        password
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.verify);
        if (data.verify === true) {
          body.style.backgroundColor='#f4f7fa'
          storageUser(data.user);
          setLogued();
        }
      });
    charginScene.style.display = "none";
    return correct;
  }
  function storageUser(user){
    localStorage.setItem("user",user.id);
    localStorage.setItem("nombre",user.nombre);
    localStorage.setItem("apellidos",user.apellidos);
    localStorage.setItem("correo",user.correo);
  }

  return (
    <div className="login-content">
      <div className="options">
        <h2 className="selected">Login</h2>
        <h2 onClick={onClick}>Register</h2>
      </div>

      <form onSubmit={checkLogin} className="form">
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="email@email.com"
        />

        <label htmlFor="passwd">Password</label>
        <input
          required
          type="password"
          name="passwd"
          id="passwd"
          placeholder="Password"
        />

        <div
          className="divBtn"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="remember" id="customCheckbox">
              <input type="checkbox" name="remember" id="remember" />
              <span></span>
            </label>

            <label htmlFor="remember" id="customCheckbox-text">
              Remember Me!
            </label>
          </div>
          <button type="submit">Log</button>
        </div>
      </form>
    </div>
  );
}

function RegisterForm({ onClick, changeRegister }) {
  function register(e) {
    e.preventDefault();
    const inputName = document.getElementById("name");
    const inputSurname = document.getElementById("surname");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("passwd");
    const inputSecondPassword = document.getElementById("second-passwd");
    const inputPhone = document.getElementById("phone");

    if (inputPassword.value === inputSecondPassword.value) {
      charginScene.style.display = "flex";
      createUser(
        inputName.value,
        inputSurname.value,
        inputEmail.value,
        inputPassword.value,
        inputPhone.value === "" ? null : inputPhone.value
      );
    }
  }

  async function createUser(name, surname, email, passwd, phone) {
    let body = {
      nombre: name,
      apellidos: surname,
      correo: email,
      telefono: phone ? phone : null,
      contraseña: passwd,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await fetch("https://campo.talkandeat.es/api/añadirUsuario", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.msg);
      });
    charginScene.style.display = "none";
    changeRegister();
  }

  return (
    <div className="register-content">
      <div className="options">
        <h2 onClick={onClick}>Login</h2>
        <h2 className="selected">Register</h2>
      </div>

      <form onSubmit={register} className="form">
        <label htmlFor="name">Name</label>
        <input required type="text" name="name" id="name" placeholder="Jaime" />

        <label htmlFor="surname">Surname</label>
        <input
          required
          type="text"
          name="surname"
          id="surname"
          placeholder="Cabaleiro Poceiro"
        />

        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="email@email.com"
        />

        <label htmlFor="passwd">Password</label>
        <input
          required
          type="password"
          name="passwd"
          id="passwd"
          placeholder="Password"
        />

        <label htmlFor="second-passwd">Repeat Password</label>
        <input
          required
          type="password"
          name="second-passwd"
          id="second-passwd"
          placeholder="Password"
        />

        <label htmlFor="phone">Phone (Optional)</label>
        <input type="tel" name="phone" id="phone" placeholder="9999999" />

        <div className="btnsRegister">
          <button onClick={onClick}>Cancel</button>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
