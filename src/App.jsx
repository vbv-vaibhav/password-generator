import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()-_}{[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className=" w-full max-w-xl mx-auto rounded-2xl p-4 bg-[#FAF0E6] text-[#352F44] shadow-lg shadow-[#352F44] hover:shadow-xl hover:shadow-[#352F44] duration-300">
          <h1 className=" text-3xl text-center">Password Generator</h1>
          <div className=" flex shadow rounded-xl overflow-hidden my-4">
            <input
              type="text"
              value={password}
              className=" outline-none w-full py-1 px-3 text-black"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className=" outline-none text-white p-1.5 bg-blue-500 hover:bg-blue-700 duration-300"
              onClick={copyPassToClipboard}
            >
              Copy
            </button>
          </div>

          <div className=" flex text-sm gap-x-2">
            <div className=" flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className=" cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>

            <div className=" flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>

            <div className=" flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
