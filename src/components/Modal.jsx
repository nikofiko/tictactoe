import React from 'react';

const Modal = ({ winner, onQuit, onNextRound, player1Mark, isCpuMode, isRestart, onCancel, onRestart }) => {
  if (isRestart) {
    // Modal restartu gry
    return (
      <div className='bg-desaturatedblue flex items-center flex-col absolute absolute-element py-[45px] w-full z-20'>
        <h2 className='py-[13px] font-bold text-gray text-[24px] lg:text-[42px]'>RESTART GAME?</h2>
        <div className='flex gap-[16px] pt-[24px]'>
          <button 
            onClick={onCancel} 
            className='cursor-pointer bg-gray text-desaturatedblue font-bold px-[17px] py-[13px] rounded-[10px] shadow-customwhite'
          >
            NO, CANCEL
          </button>
          <button 
            onClick={onRestart} 
            className='cursor-pointer bg-yellow text-desaturatedblue font-bold px-[17px] py-[12px] rounded-[10px] shadow-customyellow'
          >
            YES, RESTART
          </button>
        </div>
      </div>
    );
  } else {
    // Modal końca gry
    const getWinnerText = () => {
      if (winner === 'tie') return 'TIE!';
      if (isCpuMode) {
        return winner === player1Mark ? 'YOU WON' : 'OH NO, YOU LOST...';
      }
      return winner === player1Mark ? 'PLAYER 1 WINS!' : 'PLAYER 2 WINS!';
    };

    return (
      <div className='bg-desaturatedblue flex items-center flex-col absolute absolute-element py-[45px] w-full z-20'>
        <h2 className='py-[13px] font-bold text-gray text-[16px]'>{getWinnerText()}</h2>
        <div className="flex gap-[8px] lg:gap-[24px] items-center">
          {winner !== 'tie' && (
            <svg className="w-8 h-8 lg:w-16 lg:h-16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path
                d={
                  winner === 'x'
                    ? 'M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z'
                    : 'M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z'
                }
                fill={winner === 'x' ? '#31C3BD' : '#F2B137'}
                fillRule="evenodd"
              />
            </svg>
          )}
          <h3 className={`${winner === 'x' ? 'text-cyan' : winner === 'o' ? 'text-yellow' : 'text-gray'} font-bold text-[24px] lg:text-[42px]`}>
            {winner === 'tie' ? 'ROUND TIED' : 'TAKES THE ROUND'}
          </h3>
        </div>
        <div className='flex gap-[16px] pt-[24px]'>
          <button 
            onClick={onQuit} 
            className='cursor-pointer bg-gray text-desaturatedblue font-bold px-[17px] py-[14px] rounded-[10px] shadow-customwhite'
          >
            QUIT
          </button>
          <button 
            onClick={onNextRound} 
            className='cursor-pointer bg-yellow text-desaturatedblue font-bold px-[17px] py-[12px] rounded-[10px] shadow-customyellow'
          >
            NEXT ROUND
          </button>
        </div>
      </div>
    );
  }
};

export default Modal;