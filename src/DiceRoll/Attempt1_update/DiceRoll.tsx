import React, { useState } from "react";

const Dice = ({ count }) => {
  const diceView = (num) => {
    switch (num) {
      case 1:
        return (
          <div className="dice-container">
            <div className="dot middle"></div>
          </div>
        );
      case 2:
        return (
          <div className="dice-container">
            <div className="dot top-left"></div>
            <div className="dot bottom-right"></div>
          </div>
        );
      case 3:
        return (
          <div className="dice-container">
            <div className="dot top-left"></div>
            <div className="dot middle"></div>
            <div className="dot bottom-right"></div>
          </div>
        );
      case 4:
        return (
          <div className="dice-container">
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </div>
        );
      case 5:
        return (
          <div className="dice-container">
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot middle"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </div>
        );
      case 6:
        return (
          <div className="dice-container">
            <div className="dot top-left"></div>
            <div className="dot top-right"></div>
            <div className="dot middle-left"></div>
            <div className="dot middle-right"></div>
            <div className="dot bottom-left"></div>
            <div className="dot bottom-right"></div>
          </div>
        );
    }
  };
  return diceView(count)
};
export default function App() {
  const [dices, setDices] = useState<number[]>([]);
  const rollDice = (event) => {
    setDices([]);
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const diceCountValue = formData.get("diceCount");
    const diceCount = diceCountValue
      ? parseInt(diceCountValue.toString(), 10)
      : 0;
    const newDices: number[] = [];
    for (let i = 0; i < diceCount; i++) {
      const count = Math.floor(Math.random() * 6 + 1);
      newDices.push(count);
    }
    setDices([...newDices]);
  };

  return (
    <>
      <form style={{ textAlign: "center" }} onSubmit={rollDice}>
        <label htmlFor="numberOfDice">Number of Dice</label>
        <div>
          <input type="number" name="diceCount" />
          <button type="submit">Roll</button>
        </div>
      </form>
      {dices.length > 0 && (
        <div className="dices">
          {dices.map((c, i) => (
            <Dice key={i} count={c} />
          ))}
        </div>
      )}
    </>
  );
}
