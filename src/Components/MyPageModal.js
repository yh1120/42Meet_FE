import React from 'react';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import { getHeaders, setTimeFormat, setToken } from '../utils/utils';
import '../styles/Modal.css';

const Modal = ({ open, close, header, handleClick, id }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div>"삭제하시겠습니까?"</div>
          </main>
          <footer>
            <button className="submit" id={id} onClick={handleClick}>
              submit
            </button>
            {/* <button className="close" onClick={close}>
              close
            </button> */}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
