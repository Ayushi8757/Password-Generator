import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(6);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = '';
    if (uppercaseAllowed) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercaseAllowed) str += 'abcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, uppercaseAllowed, lowercaseAllowed, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, uppercaseAllowed, lowercaseAllowed, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-500">
      <h1 className="text-white text-2xl-bold text-center font-sans my-6">Password Generator</h1>
      <div className="flex  shadow rounded-lg overflow-hidden mb-8">
        {/* <div className="flex items-center"> */}
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black-700"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-yellow-700 text-black px-3 py-1"
          >
            Copy
          </button>
        </div>
        <div className=" flex  items-center mt-3">
        
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer pr-7 "
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
            <label className="ml-5 text-xl">Length:</label>
          <span className="ml-2 text-xl">{length}</span>
        </div>
        <div className="flex items-center mt-2 text-xl">
          <input
            type="checkbox"
            checked={uppercaseAllowed}
            id="uppercaseInput"
            onChange={() => {
              setUppercaseAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="uppercaseInput" className="ml-1">Uppercase</label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={lowercaseAllowed}
            id="lowercaseInput"
            onChange={() => {
              setLowercaseAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="lowercaseInput" className="ml-1 text-xl">Lowercase</label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="ml-1 text-xl">Number</label>
        </div>
        <div className="flex items-center mt-2 mb-5">
          <input
            type="checkbox"
            checked={characterAllowed}
            id="characterInput"
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput" className="ml-1 text-xl ">Character</label>
        </div>
      </div>
    // </div>
  );
}

export default App;
