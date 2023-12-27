import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    numberAllowed && (str += "0123456789");
    CharacterAllowed && (str += "!@#$%&*");

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, CharacterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, CharacterAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )
  

  return (
    <>
      <h1 className="text-center text-6xl text-red-200 bg-violet-500 flex justify-center py-1">Random Password Generator</h1>
      <div className="flex">
      <div className="flex mt-5 w-[500px] m-auto">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 mx-2 bg-violet-400 text-black font-bold"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button className="py-1 px-3 bg-slate-300 text-black mx-2" onClick={copyPasswordToClipboard}>Copy</button>
      </div>
</div>
      <div className="flex justify-center mt-2">
        <input
          type="range"
          min={8}
          max={100}
          value={length}
          className="cursor-pointer mx-2"
          onChange={(e) => setLength(e.target.value)}
        />
        <label>Length : {length}</label>
      </div>
      
      <div className="flex justify-center mt-2">
        <div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="mx-2"
          />
          <label htmlFor="NumberInput">Numbers</label>
        </div>

        <div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
            className="mx-2"
          />
          <label htmlFor="CharInput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
