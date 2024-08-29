// src/components/GuessMyNumber.js
import React, { useState } from 'react';
import './GuessMyNumber.css'; // Import the CSS file

const GuessMyNumber = () => {
    const [random, setRandom] = useState(generateRandomNumber());
    const [guess, setGuess] = useState('');
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [numberGuess, setNumberGuess] = useState(1);
    const [playGame, setPlayGame] = useState(true);
    const [situation, setSituation] = useState('Start guessing...');
    const maxGuesses = 10;

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    const handleGuessChange = (event) => {
        setGuess(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const guessNumber = parseInt(guess);
        validateGuess(guessNumber);
    };

    const validateGuess = (guessNumber) => {
        if (isNaN(guessNumber)) {
            alert("Please enter a valid Number");
        } else if (guessNumber < 1) {
            displayMessage("Please enter a Number more than 0");
        } else if (guessNumber > 100) {
            displayMessage("Please enter a Number less than 100");
        } else {
            setPreviousGuesses([...previousGuesses, guessNumber]);
            if (numberGuess >= maxGuesses) {
                displayGuess(guessNumber);
                displayMessage(`Game over! The Random Number is : ${random}`);
                endGame();
            } else {
                displayGuess(guessNumber);
                checkGuess(guessNumber);
            }
        }
    };

    const checkGuess = (guessNumber) => {
        if (guessNumber === random) {
            displayMessage("Your Guess is Right");
            endGame();
        } else if (guessNumber < random) {
            displayMessage("Guess Number is TOO LOW!!!");
        } else if (guessNumber > random) {
            displayMessage("Guess Number is TOO HIGH!!!");
        }
    };

    const displayGuess = (guessNumber) => {
        setGuess('');
        setNumberGuess(numberGuess + 1);
    };

    const displayMessage = (message) => {
        setSituation(message);
    };

    const endGame = () => {
        setPlayGame(false);
    };

    const handleAgainClick = () => {
        setRandom(generateRandomNumber());
        setPreviousGuesses([]);
        setNumberGuess(1);
        setSituation('Start guessing...');
        setGuess('');
        setPlayGame(true);
    };

    return (
        <div>
            <header>
                <div className="head">
                    <button className="again" onClick={handleAgainClick}>Again!</button>
                    <p className="range">&lt; Between 1 to 100 &gt;</p>
                </div>

                <div className="title">
                    <h1>Guess My Number!</h1>
                </div>
            </header>
            <div className="segment">
                <span className="symbol">?</span>
            </div>
            <main>
                <section className="one">
                    <div className="container">
                        <div className="first-div">
                            <form className="form" onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    className="takenumber"
                                    value={guess}
                                    onChange={handleGuessChange}
                                    disabled={!playGame}
                                /><br />
                                <input
                                    type="submit"
                                    id="subt"
                                    value="Check!"
                                    disabled={!playGame}
                                />
                            </form>
                        </div>
                        <div className="second-div">
                            <p className="situation">{situation}</p>
                            <div>
                                <span><span id="emoji">💯</span>&nbsp;&nbsp;Remaining Chance :</span>
                                <span className="remaining">{maxGuesses - numberGuess + 1}</span>
                            </div>
                            <div>
                                <span><span id="emoji">🔢</span>&nbsp;&nbsp;Your Previous Guess :</span>
                                <span className="prevnumber">{previousGuesses.join('   ')}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default GuessMyNumber;
