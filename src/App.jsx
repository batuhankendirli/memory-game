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
  const { solved, setSolved, isEnded, setIsEnded, setRestart } =
    useContext(Context);

  useEffect(() => {
    if (solved.length === 8) {
      setIsEnded(true);
    }
  }, [solved]);

  const handleReset = () => {
    setIsEnded(false);
    setRestart(true);
    setTimeout(() => {
      setSolved([]);
      setCardDeck((prev) => {
        return shuffleArray(prev);
      });
    }, 300);
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-10 min-h-screen bg-neutral-800">
      {isEnded && <ReactConfetti recycle={true} opacity={0.85} />}
      <h1 className="text-5xl text-neutral-300 mb-6">Memory Game</h1>
      <div className="flex flex-row-reverse justify-between items-center text-neutral-300 w-[37rem] ">
        <p className="text-sm">01:13</p>
        {isEnded && (
          <button
            className="text-xl bg-neutral-300 text-neutral-800 py-1 px-3 duration-300 hover:bg-neutral-50"
            onClick={handleReset}
          >
            Restart
          </button>
        )}
      </div>

      <div className="relative grid grid-cols-4 gap-4 p-4 bg-neutral-700">
        {cardDeck.map((card, index) => (
          <Card key={index} id={card.id} img={card.imgUrl} />
        ))}
        {isEnded && (
          <h3
            className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-2xl text-neutral-300 win-text ${
              isEnded ? 'win-text-active' : ''
            }`}
          >
            Congratulations, you won!
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
