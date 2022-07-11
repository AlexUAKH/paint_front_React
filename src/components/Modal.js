import React, { useContext, useEffect, useRef, useState } from 'react';
import "../styles/modal.scss"
import { Context } from "../index";

const Modal = ({ show, setShow }) => {
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [name, setName] = useState('');
  const nameRef = useRef(null);
  const {canvas} = useContext(Context);

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  useEffect(() => {
    if (name.trim()) {
      setTouched(true);
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name])

  const confirm = () => {
    if (name) {
      canvas.setUsername(name.trim());
      setShow(false);
    } else {
      setValid(false);
    }
  }

  const enterHandle = (e) => {
    if (e.key === 'Enter' && valid) confirm();
  }

  return (
    <div className={`modal ${show ? '' : 'hide'}`}>
      <div className="modal__card">
        <div className="modal__body">
          <div className="modal__title">
            Welcome to paint!
          </div>
          <div className="modal__text">
            Enter your name
          </div>
          <input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={enterHandle}
            type="text" className={!valid && touched ? 'error' : ''}
          />
        </div>
        <div className="modal__action">
          <button className="btn" disabled={!valid} onClick={confirm}>Confirm</button>
          {/*<button className="btn" onClick={() => setShow(false)}>Cancel</button>*/}
        </div>
      </div>

    </div>
  );
};

export default Modal;