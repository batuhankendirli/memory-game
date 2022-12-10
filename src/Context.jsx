import React, { useEffect, useState } from 'react';

const Context = React.createContext();

function ContextProvider({ children }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [isEnded, setIsEnded] = useState(false);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0] === selectedCards[1]) {
        setSelectedCards([]);
        setTimeout(() => {
          setSolved((prev) => [...prev, selectedCards[0]]);
        }, 700);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1250);
      }
    }
  }, [selectedCards]);

  return (
    <Context.Provider
      value={{
        selectedCards,
        setSelectedCards,
        solved,
        setSolved,
        isEnded,
        setIsEnded,
        restart,
        setRestart,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
