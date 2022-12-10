import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';

const Card = ({ img, id }) => {
  const [active, setActive] = useState(false);
  const { selectedCards, setSelectedCards, solved, restart, setRestart } =
    useContext(Context);

  const handleClick = () => {
    setActive(true);
    if (!active) {
      setSelectedCards((prev) => [...prev, id]);
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

  return (
    <button
      className={`w-32 h-32 card ${active ? 'selected' : ''} ${
        solved.includes(id) ? 'solved' : ''
      }`}
      onClick={handleClick}
      disabled={solved.includes(id) || selectedCards.length === 2}
    >
      <div className="card-front flex items-center justify-center bg-gradient-to-b from-yellow-600 via-orange-500 to-yellow-500">
        <h1 className="text-4xl">?</h1>
      </div>
      <div className="card-back select-none">
        <img
          src={img}
          alt={id}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </button>
  );
};

export default Card;
