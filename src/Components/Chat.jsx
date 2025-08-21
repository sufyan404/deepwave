import React from 'react';
import Answers from './Answers';

function Chat({ item, index }) {
  return (
    <>
      <div
        key={Math.random()}
        className={item.type === 'q' ? 'flex justify-end mr-4' : 'mr-40'}
      >
        {item.type == 'q' ? (
          <li
            key={Math.random()}
            className='text-right border-4 border-zinc-300 bg-zinc-300 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl min-w-12 max-w-xl p-1 dark:bg-zinc-500 dark:border-zinc-500'
          >
            <Answers
              ans={item.text}
              index={index}
              totalResults={1}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((asnItem, ansIndex) => (
            <li key={Math.random()} className='text-left'>
              <Answers
                ans={asnItem}
                index={ansIndex}
                totalResults={1}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
}

export default Chat;
