import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';

const Card = ({ img, id }) => {
  const [active, setActive] = useState(false);
  const {
    selectedCards,
    setSelectedCards,
    solved,
    restart,
    setRestart,
    setTotalMoves,
    setIsStarted,
  } = useContext(Context);

  const handleClick = () => {
    setActive(true);
    setIsStarted(true);
    if (!active) {
      setSelectedCards((prev) => [...prev, id]);
      setTotalMoves((prevMoves) => prevMoves + 1);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0] !== selectedCards[1] && !solved.includes(id)) {
        setTimeout(() => {
          setActive(false);
        }, 1000);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (restart) {
      setActive(false);
      setRestart(false);
    }
  }, [restart]);

  console.log(img);
  return (
    <button
      className={`w-[4.8rem] h-[4.8rem]  select-none card ${
        active ? 'selected' : ''
      } ${solved.includes(id) ? 'solved' : ''} sm:w-32 sm:h-32`}
      onClick={handleClick}
      disabled={solved.includes(id) || selectedCards.length === 2}
    >
      <div className="card-front flex items-center justify-center bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl">
        <h1 className="text-4xl text-neutral-300">?</h1>
      </div>
      <div
        className="card-back rounded-xl "
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: `cover`,
        }}
      ></div>
    </button>
  );
};

export default Card;
