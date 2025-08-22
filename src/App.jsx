import { useEffect, useRef, useState } from 'react';
import './App.css';
import { url } from './constant';
import RecentSearch from './Components/RecentSearch';
import Chat from './Components/Chat';

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [histoey, setHistory] = useState(
    JSON.parse(localStorage.getItem('history'))
  );
  const [savedHistory, setSavedHistory] = useState('');
  const scrollPage = useRef();
  const [loader, setLoader] = useState(false);

  const handleClick = async () => {
    console.log('Button clicked');
    if (!question && !savedHistory) {
      return;
    }
    setQuestion('');

    if (question) {
      if (localStorage.getItem('history')) {
        let storage = JSON.parse(localStorage.getItem('history'));
        storage = [question, ...storage];
        localStorage.setItem('history', JSON.stringify(storage));
        setHistory(storage);
      } else {
        localStorage.setItem('history', JSON.stringify([question]));
        setHistory([question]);
      }
    }
    const payloadData = question ? question : savedHistory;
    let payload = {
      contents: [
        {
          parts: [
            {
              text: payloadData,
            },
          ],
        },
      ],
    };

    setLoader(true);

    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split('* ');
    dataString = dataString.map(item => item.trim());

    setResult([
      ...result,
      { type: 'q', text: question ? question : savedHistory },
      { type: 'a', text: dataString },
    ]);
  };

  // console.log(histoey);
  // console.log(result);

  const clearHistory = () => {
    localStorage.clear();
    setHistory([]);
  };

  useEffect(() => {
    console.log(savedHistory);
  }, [savedHistory, setSavedHistory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollPage.current) {
        scrollPage.current.scrollTo({
          top: scrollPage.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 500);

    setLoader(false);

    return () => clearTimeout(timer);
  }, [result]);

  // DARKMODE

  const [darkmode, setDarkmode] = useState('dark');

  useEffect(() => {
    if (darkmode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkmode]);

  return (
    <div className={darkmode === 'dark' ? 'dark' : 'light'}>
      <div className='grid grid-cols-5 text-center text-black h-screen'>
        <select
          onChange={e => setDarkmode(e.target.value)}
          className='
        fixed text-black bottom-0 p-2 text-lg font-bold outline-none'
        >
          <option value='dark'>Dark</option>
          <option value='light'>Light</option>
        </select>
        <RecentSearch
          clearHistory={clearHistory}
          histoey={histoey}
          setSavedHistory={setSavedHistory}
          handleClick={handleClick}
        />
        <div className='col-span-4 px-12'>
          <h1 className='text-4xl font-bold py-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-violet-700'>
            Hello User, Ask me anything
          </h1>
          {loader ? (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : null}
          <div
            ref={scrollPage}
            className='container h-[370px] overflow-y-auto dark:text-white'
          >
            <div>
              <ul>
                {result.map((item, index) => (
                  <Chat item={item} index={index} key={index} />
                ))}
              </ul>
            </div>
          </div>
          <div className='bg-zinc-300 flex items-end w-full max-w-2xl mx-auto text-black border border-zinc-100 rounded-4xl'>
            <textarea
              spellCheck={false}
              placeholder='Ask me anything'
              className='flex-1 min-h-16 max-h-[200px] bg-transparent resize-none overflow-hidden px-3 outline-none transition-all duration-200 content-center'
              value={question}
              onChange={e => {
                setQuestion(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleClick();
                }
              }}
            />
            <button
              onClick={handleClick}
              className='ml-3 px-4 py-2 h-16 w-20 self-center bg-gradient-to-r from-zinc-700 via-blue-900 to-blue-700 hover:from-blue-800 hover:via-zinc-600 hover:to-zinc-500 text-white font-semibold rounded-full shadow-lg transition-all duration-200 outline-none border border-blue-200 focus:ring-2 focus:ring-blue-400'
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
