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

async function isUserAuthenticated(setUserAuthenticated) {
  try {
    const response = await fetch('http://127.0.0.1:8000/auth/is_authenticated');
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

  useEffect(() => {
    isUserAuthenticated(setUserAuthenticated);
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  if (!userAuthenticated) {
    return (
      <p>User is not authenticated</p>
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


function Connect({ setUserAddress }) {
  return (
    <button onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}


function Address({ userAddress }) {
  return (
    <span>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}
