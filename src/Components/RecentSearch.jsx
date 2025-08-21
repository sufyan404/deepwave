import React from 'react';

function RecentSearch({ clearHistory, histoey, setSavedHistory, handleClick }) {
  return (
    <>
      <div className='col-span-1 bg-zinc-300 dark:bg-zinc-700 dark:text-white h-full'>
        <h1 className='font-bold text-lg my-3 flex justify-center'>
          <span>History</span>
          <button className='cursor-pointer' onClick={clearHistory}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='20px'
              viewBox='0 -960 960 960'
              width='20px'
              fill='#1f1f1f'
            >
              <path d='m400-325 80-80 80 80 51-51-80-80 80-80-51-51-80 80-80-80-51 51 80 80-80 80 51 51Zm-88 181q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480Zm-336 0v480-480Z' />
            </svg>
          </button>
        </h1>
        <ul className='text-left overflow-auto'>
          {histoey &&
            histoey.map(item => (
              <li
                onClick={() => {
                  setSavedHistory(item), handleClick();
                }}
                key={Math.random()}
                className='p-1 pl-5 cursor-pointer hover:bg-zinc-400 truncate pt-2'
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default RecentSearch;
