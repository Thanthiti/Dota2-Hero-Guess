import { useState, useEffect } from "react";
import Heroes from "../public/heroes.json";
import HeroList from "./component/HeroList";
import TableClubesHero from "./component/TableClubesHero";
import style from "./css/App.module.css";

export default function HeroGuessGame() {
  const [guess, setGuess] = useState("");
  const [answer, setAnswer] = useState(null);
  const [history, setHistory] = useState([]);
  const [availableHeroes, setAvailableHeroes] = useState(Heroes);

  const [showModal, setShowModal] = useState(false);
  const [winnerHero, setWinnerHero] = useState(null);

  const baseURL = "https://cdn.cloudflare.steamstatic.com/";

  const resetGame = () => {
    const hero = Heroes[Math.floor(Math.random() * Heroes.length)];
    console.log(hero);
    setAnswer(hero);
    setHistory([]);
    setAvailableHeroes(Heroes);
    setGuess("");
  };

  useEffect(() => {
    resetGame();
  }, []);

  const filterHeroes = availableHeroes.filter((hero) =>
    hero.name.toLowerCase().includes(guess.toLowerCase())
  );

  const checkGuess = (e) => {
    e.preventDefault();
    
    if (history.length >= 3) {
      alert("CRITICAL BUG: MEMORY OVERFLOW");
      return;
    }

    if (!guess || !answer) return;

    const guessedHero = Heroes.find(
      (h) => h.name.toLowerCase() === guess.toLowerCase()
    );
    
    if (!guessedHero) {
       alert("Hero not found! Please enter a valid hero name.");
       return; 
     }
    const isCorrect = guessedHero && guessedHero.name === answer.name;
    setHistory((prev) => [
      ...prev,
      {
        hero: guessedHero ? guessedHero : { name: guess, roles: [] },
        guess: guess,
      },
    ]);
    if (guessedHero) {
      setAvailableHeroes((prev) =>
        prev.filter((h) => h.name !== guessedHero.name)
      );
    }

    setGuess("");

    if (isCorrect) {
      setWinnerHero(answer);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetGame();
  };
  return (
    <div className={style.container}>
      <div
        style={{
          color: "red",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          paddingBottom: "1rem",
        }}
      >
        <div className={style.gameTitle}>Guess Heroes Game</div>
      </div>
      {answer && (
        <div>
          <div className={style.inputContainer}>
            <div className={style.inputRow}>
              <input
                type="text"
                placeholder="Type hero name"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button
                className={style.disabled}
                onClick={checkGuess}
                disabled={
                  !Heroes.some(
                    (h) =>
                      h.name &&
                      h.name.toLowerCase() === guess.toLowerCase()
                  )
                }
              >
                Submit
              </button>
            </div>

            {/* Filter Hero */}
            {guess && (
              <HeroList
                filterHeroes={filterHeroes}
                setGuess={setGuess}
                setFilterHeroes={setAvailableHeroes}
                baseURL={baseURL}
              />
            )}
            <div className={style.tips}>
              💡 Tips : This hero has {answer.roles.length} role
              {answer.roles.length > 1 ? "s" : ""}
            </div>
          </div>

          {/* Table history */}
          <TableClubesHero
            history={history}
            baseURL={baseURL}
            guess={guess}
            answer={answer}
          />
        </div>
      )}
      {/* เฉลย */}
      {showModal && winnerHero && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <h2>You Win</h2>
            <img
              src={`${baseURL}${winnerHero.icon}`}
              alt={winnerHero.name}
              className={style.modalHero}
            />
            <p className={style.modalHeroName}>{winnerHero.name}</p>
            <button className={style.modalButton} onClick={handleCloseModal}>
              Start New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
