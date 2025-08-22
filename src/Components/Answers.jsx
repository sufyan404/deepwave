import React, { useEffect, useState } from 'react';
import { checkHeading, replaceStar } from '../helper';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const render = {
    // eslint-disable-next-line no-unused-vars
    code({ node, inline, className, children, ...prop }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          {...prop}
          children={String(children).replace(/\n$/, '')}
          language={match[1]}
          style={dark}
          PreTag='div'
        />
      ) : (
        <code {...prop} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index == 0 && totalResults > 1 ? (
        <span className='pt-2 text-xl font-bold'>{answer}</span>
      ) : heading ? (
        <span className='pt-2 text-2xl'>{answer}</span>
      ) : (
        <span className={type === 'q' ? 'pl-1 mr-2' : 'pl-5'}>
          <ReactMarkdown components={render}>{answer}</ReactMarkdown>
        </span>
      )}
    </>
  );
}

export default Answers;
