import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';

const New = ({ startGame }) => {
  const [buttonControl, setButtonControl] = useState(false);

  const startVsPlayer = () => {
    const mark = buttonControl ? 'x' : 'o';
    startGame(mark, false); // PvP, mark to znak gracza 1
  };

  const startVsCpu = () => {
    const mark = buttonControl ? 'x' : 'o';
    startGame(mark, true); // CPU, mark to znak gracza
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='pb-[40px]'>
        <img src={logo} alt="" />
      </div>
      <div className='bg-desaturatedblue px-[24px] rounded-[10px] shadow-custom'>
        <h3 className='text-gray font-bold text-[18px] lg:text-[16px] pt-[24px]'>PICK PLAYER 1’S MARK</h3>
        <div className='bg-blue px-[8px] py-[9px] rounded-[10px] mb-[17px] mt-[24px]'>
          <button
            onClick={() => setButtonControl(true)}
            className={`${buttonControl === false ? 'bg-blue hover:bg-desaturatedblue' : 'bg-gray'} px-[50px] lg:px-[88px] py-[11px] rounded-[10px] cursor-pointer`}
          >
            <svg className={`${buttonControl === false ? 'text-gray' : 'text-blue'}`} width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="currentColor" fillRule="evenodd"/>
            </svg>
          </button>
          <button
            onClick={() => setButtonControl(false)}
            className={`${buttonControl === false ? 'bg-gray' : 'bg-blue hover:bg-desaturatedblue'} px-[50px] lg:px-[88px] py-[11px] rounded-[10px] cursor-pointer`}
          >
            <svg className={`${buttonControl === false ? 'text-blue' : 'text-gray'}`} width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <p className='pb-[20px] text-gray font-normal text-[14px]'>REMEMBER : X GOES FIRST</p>
      </div>
      <div className='mt-[40px] w-full max-w-[470px]'>
        <button onClick={startVsCpu} className='cursor-pointer shadow-customyellow rounded-[10px] text-blue bg-yellow py-[17px] text-[20px] font-bold w-full max-w-[327px] lg:max-w-none'>
          NEW GAME (VS CPU)
        </button>
      </div>
      <div className='mt-[24px] w-full max-w-[470px]'>
        <button onClick={startVsPlayer} className='cursor-pointer shadow-customcyan rounded-[10px] text-blue bg-cyan py-[17px] text-[20px] font-bold w-full max-w-[327px] lg:max-w-none'>
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  );
};

export default New;