import { useCallback, useEffect, useRef, useState } from "react";
const PasswordGenerator = () => {
  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const copyInput = useRef(null);
  const generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    generator();
  }, [charAllowed, numberAllowed, lenght, generator]);

  return (
    <div className="w-full max-w-md m-auto p-4s">
      <h1 className="text-center font-semibold mt-10 text-2xl">
        Password Generator
      </h1>
      <br />
      <div className="flex justify-center">
        <input
          className="w-full p-4 text-white bg-gray-500 rounded-tl-lg rounded-bl-lg font-medium text-lg text-center z-10 inset-2"
          value={password}
          type="text"
          placeholder="password"
          readOnly
        />
        <button
          className="bg-orange-500 p-4 text-lg rounded-tr-lg rounded-br-lg  "
          onClick={copyOnClipBoard}
        >
          Copy
        </button>
      </div>
      <div className="flex align-middle gap-2 text-orange-500 font-semibold">
        <input
          className="cursor-pointer"
          type="range"
          min={6}
          max={40}
          value={length}
          onChange={(e) => {
            setLenght(e.target.value);
          }}
        />
        <label htmlFor="rangeInNumber">Lenght : {lenght}</label>
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label>Number</label>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label>Esp-Characters</label>
      </div>
    </div>
  );
};

export default PasswordGenerator;
