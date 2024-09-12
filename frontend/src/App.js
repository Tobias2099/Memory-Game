import './App.css';
import Tile from "./Tile";
import { useState, useEffect } from 'react';

function App() {

  const gridSize = 16;
  const [numReveals, setReveals] = useState(0);
  const [revealList, setRevealList] = useState([]);
  const [pairedLetters, setPairs] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isMax, isMaxSet] = useState(false);
  const [record, setRecord] = useState(null);
  const [doneRound, newRound] = useState(false);
  const [gridState, setGrid] = useState(new Array(gridSize).fill(null));
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  function isFilled(value) {
    return value !== null;
  }

  function counterIncrease() {
    setCounter(prevValue => prevValue + 1);
  }

  function counterDecrease() {
    setCounter(prevValue => prevValue - 1);
  }
  
  function addReveal(letter) {
    setReveals(prevValue => prevValue + 1);
    setRevealList(prevValue => [...prevValue, letter]);
    console.log("Number of reveals: " + numReveals);
    //console.log("Reveal List: " + revealList.toString());
  }

  function removeReveal(letter) {
    const index = revealList.findIndex((reveal) => reveal === letter);
    //console.log("index: " + index);
    //console.log("Removing " + letter);
    setRevealList(prevValue => {
      if (index === 1) {
        return prevValue.slice(0,1);
      } else if (index === 0) {
        return prevValue.slice(1);
      } else {
        console.log("ERROR at removeReveal");
      }
    });
  }

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/api/score')
      .then(response => response.json())
      .then(data => {
        setRecord(data.score); // Set the record state to the fetched score
      })
      .catch(error => console.error('Error fetching record:', error));
  }, []);

  useEffect(() => {
    const updateScore = async (newScore) => {
      try {
        const response = await fetch('http://localhost:5000/api/change', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ record: newScore })
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Score updated:', data.score);
        } else {
          console.error('Error updating score:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating score:', error);
      }
    };
  
    if (record !== null) { // Ensure record is not null before making the request
      updateScore(record);
    }
  }, [record]);

  useEffect(() => {
    console.log("counter:" + counter);
    if (counter >= 2) {
      //console.log("maxed");
      isMaxSet(true);
      if (revealList[0] === revealList[1]) {
        console.log("Paired " + revealList[0]);
        setPairs(prevValue => [...prevValue, revealList[0]]);
        setCounter(0);
        setRevealList([]);
      }
    } else {
      //console.log("not maxed");
      isMaxSet(false);
    }

    //Game finished
    if (pairedLetters.length === letters.length) {
      if (record === null || (numReveals < record && numReveals !== 0)) {
        console.log("Reveals: " + numReveals);
        setRecord(numReveals);
        console.log("RECORD WIN");
      } else {
        console.log("Not a record");
      }
      setTimeout(() => {
        newRound(true);
      }, 2000);
    }
  
  }, [counter, revealList]);


  useEffect(() => {

    if (doneRound) { //new game
      setGrid(new Array(gridSize).fill(null));
      setPairs([]);
      setRevealList([]);
      setReveals(0);
      newRound(false);
    }

    //creating the grid positions for the letters
    let newGrid = new Array(gridSize).fill(null);
    for (let i = 0; i < letters.length; i++) {
      for (let j = 0; j < 2; j++) {
        let randomIndex;
        let posValue;
        let letter = letters[i];
        do {
          randomIndex = Math.floor(Math.random() * gridSize);
          posValue = newGrid[randomIndex];
        } while (isFilled(posValue));

        newGrid[randomIndex] = letter;
      }
    }
    setGrid(newGrid);
  }, [doneRound]);

  console.log(gridState.toString())
  
  return (
    <div className="App">
      <h1>Pair to Play</h1>
      <div className="grid">
        {gridState.map((letter, index) => {
          return <Tile key={index} id={index} letter={letter} counter={counter} counterInc={counterIncrease} counterDec={counterDecrease} isMax={isMax} addReveal={addReveal} removeReveal={removeReveal} pairList={pairedLetters} newGame={doneRound}/>;
        })}
      </div>

      <div className="Footer">
        <h3>Round Total: {numReveals} </h3>
        <h3>Record Total: {record !== null ? record : 'none'}</h3>
      </div>
      
    </div>
  );
}

export default App;
