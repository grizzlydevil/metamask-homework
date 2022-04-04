import React, { useEffect, useState } from "react";

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}

async function isUserAuthenticated(setUserAuthenticated, token) {
  try {
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const response = await fetch('http://127.0.0.1:8000/auth/is_authenticated', {headers, method: "GET"});
    const sourceResponse = await response.json();
    setUserAuthenticated(sourceResponse.auth ? true : false)
    return;
  } catch (e) {
    console.log(e);
  }
}


export default function MetaMaskAuth({ onAddressChanged }) {
  const [userAddress, setUserAddress] = useState("");
  const [userAuthenticated, setUserAuthenticated] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  useEffect(() => {
    isUserAuthenticated(setUserAuthenticated, token);
  }, [token]);

  if (!userAuthenticated) {
    return (
      <LogIn setToken={setToken}/>
    )
  }

  return userAddress ? (
    <div>
      Connected with <Address userAddress={userAddress} />
    </div>
  ) : (
      <Connect setUserAddress={setUserAddress}/>
  );

}


function LogIn({ setToken }) {
  const [userLoggedIn, setuserLoggedIn] = useState(false);

  let submitLogIn = e => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let password2 = e.target.password2.value;

    let headers = {"Content-Type": "application/json"};
    let body = e.target.id === "login" ? JSON.stringify({email, password}) : JSON.stringify({email, "password1": password, password2});
    let url = e.target.id === "login" ? "http://127.0.0.1:8000/auth/login/" : "http://127.0.0.1:8000/auth/registration/";

    fetch(url, {headers, body, method: "POST"})
      .then(async response => {
        const data = await response.json();
        if (data && data.key) {
          setToken(data.key);
          setuserLoggedIn(true);
        }
      });
  }

  if (userLoggedIn) {
    return;
  }

  return (
    <div><form onSubmit={submitLogIn} id="login">
      <fieldset>
        <legend>Log in to backend</legend>
        <p>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email"/>
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password"/>
        </p>
        <p>
          <button type="submit">Log In</button>
        </p>
      </fieldset>
    </form>
    <form onSubmit={submitLogIn} id="create">
      <fieldset>
        <legend>Create new account</legend>
        <p>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email"/>
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password"/>
        </p>
        <p>
          <label htmlFor="password2">Repeat Password: </label>
          <input type="password" id="password2"/>
        </p>
        <p>
          <button type="submit">Create</button>
        </p>
      </fieldset>
    </form></div>
  );
}


function Connect({ setUserAddress }) {
  return (
    <button onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}


function Address({ userAddress }) {
  return (
    <span>{userAddress}</span>
  );
}
