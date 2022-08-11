import React, { useEffect, useState } from "react";

const Popup = (props) => {
  const [err, setErr] = useState('')

  useEffect(() => {
    if (props.authMssg) {
      setErr(props.authMssg.slice(10, props.authMssg.length))
    } else {
      setErr('Error Detected')
    }
  }, [props.authMssg])

  return (
    <>
      <div
        className={`${props.popUp} fixed top-0 left-0 h-screen w-full bg-slate-500/50`}
        onClick={() => props.togglePopUp()}
      ></div>
      <div
        className={`${props.popUp} animate__animated animate__fadeInUp p-2 fixed flex items-center justify-center top-1/12 left-1/12 w-10/12 h-32 rounded-lg w-full bg-pink-500 text-white`}
      >
        <p className="font-bold text-sm">{err}</p>
      </div>
    </>
  );
};

export default Popup;
