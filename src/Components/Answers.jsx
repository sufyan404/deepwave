import React, { useEffect, useState } from 'react';
import { checkHeading, replaceStar } from '../helper';

function Answers({ ans, index, totalResults, type }) {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceStar(ans));
    } else {
      setAnswer(ans);
    }
  }, [ans]);
  // console.log(index);

  // console.log(index);

  return (
    <>
      {index == 0 && totalResults > 1 ? (
        <span className='pt-2 text-xl font-bold'>{answer}</span>
      ) : heading ? (
        <span className='pt-2 text-2xl'>{answer}</span>
      ) : (
        <span className={type === 'q' ? 'pl-1 mr-2' : 'pl-5'}>{answer}</span>
      )}
    </>
  );
}

export default Answers;
