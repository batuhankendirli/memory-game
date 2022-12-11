import { useContext, useState, useEffect } from 'react';
import Card from './components/Card';
import { cards } from './constants/cards';
import { Context } from './Context';
import ReactConfetti from 'react-confetti';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function App() {
  const [cardDeck, setCardDeck] = useState(shuffleArray([...cards, ...cards]));
  const [time, setTime] = useState({ seconds: 0, minutes: 0 });

  const {
    solved,
    setSolved,
    isEnded,
    setIsEnded,
    setRestart,
    totalMoves,
    setTotalMoves,
    isStarted,
    setIsStarted,
  } = useContext(Context);

  useEffect(() => {
    if (solved.length === 8) {
      setIsEnded(true);
      setIsStarted(false);
    }
  }, [solved]);

  useEffect(() => {
    let interval;
    if (!isEnded && isStarted) {
      interval = setInterval(() => {
        setTime((prev) => {
          return { seconds: prev.seconds + 1, minutes: prev.minutes };
        });
        if (time.seconds >= 59) {
          setTime((prev) => {
            return {
              seconds: 0,
              minutes: prev.minutes + 1,
            };
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [time, isStarted, isEnded]);

  const handleReset = () => {
    setIsEnded(false);
    setRestart(true);
    setTotalMoves(0);
    setTime({ seconds: 0, minutes: 0 });
    setTimeout(() => {
      setSolved([]);
      setCardDeck((prev) => {
        return shuffleArray(prev);
      });
    }, 300);
  };

  return (
    <div className="relative flex flex-col items-center justify-between px-2 py-8 min-h-screen  bg-neutral-800 sm:p-10">
      {isEnded && <ReactConfetti recycle={true} opacity={0.85} />}
      <h1
        className="text-5xl text-center text-neutral-300 bg-gradient-to-l from-emerald-600 to-green-500 bg-clip-text mb-6"
        style={{
          WebkitTextFillColor: 'transparent',
        }}
      >
        Memory <br className="block sm:hidden" />
        Game
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row-reverse justify-between items-center text-neutral-300 w-[21.7rem] sm:w-[37rem] ">
          <div className="flex text-xs items-center self-end gap-4 sm:text-sm sm:gap-2">
            <p>Moves:&thinsp;{totalMoves}</p>
            <p className="hidden sm:block">|</p>
            <p>
              {String(time.minutes).length === 1
                ? `0${time.minutes}`
                : time.minutes}
              :
              {String(time.seconds).length === 1
                ? `0${time.seconds}`
                : time.seconds}
            </p>
          </div>
          {isEnded && (
            <button
              className="text-md py-0.5 px-2 bg-neutral-300 text-neutral-800 duration-300 hover:bg-neutral-50 rounded-lg sm:text-xl sm:py-1 sm:px-3"
              onClick={handleReset}
            >
              Restart
            </button>
          )}
        </div>

        <div className="relative grid grid-cols-4 gap-2 p-2 bg-neutral-700 rounded-xl shadow-xl sm:gap-4 sm:p-4">
          {cardDeck.map((card, index) => (
            <Card key={index} id={card.id} img={card.imgUrl} />
          ))}
          {isEnded && (
            <h3
              className={`text-xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center  text-neutral-300 win-text ${
                isEnded ? 'win-text-active' : ''
              } sm:text-2xl`}
            >
              Congratulations, you won!
            </h3>
          )}
        </div>
      </div>
      <div className="w-full mt-10 md:fixed md:mt-0 md:top-[50%] md:h-screen md:w-auto md:left-10 md:translate-y-[-50%]">
        <div className="flex items-center h-full gap-4 md:gap-8 md:flex-col">
          <span className="bg-neutral-700 h-[1px] w-full md:h-full md:w-[2px]" />
          <a
            href="https://batuhankendirli.netlify.app/"
            target={'_blank'}
            className="text-neutral-700 text-md duration-300 hover:text-emerald-600 profile-link whitespace-nowrap"
          >
            Batuhan Kendirli
          </a>
          <span className="bg-neutral-700 h-[1px] w-full md:h-full md:w-[2px]" />
        </div>
      </div>
    </div>
  );
}

export default App;
