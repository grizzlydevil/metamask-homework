import React from 'react';
import './App.css';
import MetaMaskAuth from "./metamask-auth";

function App() {
  return (
    <main>
      <MetaMaskAuth onAddressChanged={address => {}}/>
    </main>
  );
}

export default App;
