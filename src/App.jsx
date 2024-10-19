import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
export default function App() {

  const [len, setlen] = useState(8);
  const [num, setnum] = useState(false);
  const [char, setchar] = useState(false);
  const [password, setpassword] = useState();
  const copyRef = useRef(null);
  
  // gsap.registerPlugin(useGSAP);


  function PasswordGenrator() {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) str += '0123456789';
    if (char) str += '~!@#$%^&*()?<>|';

    for (let i = 1; i <= len; i++) {
      let c = Math.floor(Math.random() * str.length);
      pass += str[c];
    }
    setpassword(pass);
  }

  function Cpoyvalue() {
    copyRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    PasswordGenrator();
  }, [num, char, len]);

  useGSAP(()=>{
    const tl = gsap.timeline();
    gsap.from('#child',{
      opacity : 0,
      x:300,
    })

    tl.from('#heading',{
      opacity : 0,
      y:300,
    })
    tl.from('#pnpt',{
      opacity : 0,
      y:300,
    })
    tl.from('#cbtn',{
      opacity : 0,
      y:300,
    })
    tl.from('#brange > *',{
      opacity : 0,
      y:300,
      stagger : 0.5,
    })
  },[]);

  return (
    <>
      {/* main container div */}
      <div className="bg-violet-700 h-screen flex justify-center items-center font-serif">
        {/* container child div */}
        <div className="w-80 sm:w-[460px] h-60 rounded-lg flex flex-col gap-3 items-center justify-evenly bg-white border-[2px] p-4" id="child">

        <h2 className="text-xl font-bold" id="heading">Password Genrator</h2>
          <div className="">

          <input type="text" className="border-[1px] p-2 rounded-xl border-black mr-8" id="pnpt" value={password} ref={copyRef} />
          <button onClick={Cpoyvalue} className="p-3 rounded-xl bg-violet-600 hover:bg-violet-900 text-white" id="cbtn"><i class="fa-regular fa-copy"></i></button>

          </div>

            <div className="">
              <label className="text-xl mt-2 mr-2">{len}</label>
            <input type="range" value={len} min={6} max={40} onChange={(e) => {
              setlen(e.target.value);
            }} />
            </div>

          <div className="flex gap-1 md:gap-3" id="brange">


           <div className="flex flex-row ">
           <label className="m-2">Number</label>
            <input type="checkbox" value={num} className="cursor-pointer text-xl"  onChange={() => {
              setnum((prev) => !prev);
            }} />
           </div>

          <div className="flex flex-row">
          <label className="m-2">Character</label>
            <input type="checkbox" value={char} className="cursor-pointer" onChange={() => {
              setchar((prev) => !prev);
            }} />
          </div>
          </div>
        </div>

      </div>

    </>
  )
}

