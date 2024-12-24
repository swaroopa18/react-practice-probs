import React, { useState } from "react";

const Dice = ({ count }) => {
  const dicePositions = {
    1: ["middle"],
    2: ["top-left", "bottom-right"],
    3: ["top-left", "middle", "bottom-right"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "middle", "bottom-left", "bottom-right"],
    6: [
      "top-left",
      "top-right",
      "middle-left",
      "middle-right",
      "bottom-left",
      "bottom-right",
    ],
  };

  return (
    <div className="dice-container">
      {dicePositions[count].map((dot, index) => (
        <div className={`dot ${dot}`} key={index}></div>
      ))}
    </div>
  );
};

const DiceForm = ({ onRoll }) => (
  <form style={{ textAlign: "center" }} onSubmit={onRoll}>
    <label htmlFor="numberOfDice">Number of Dice</label>
    <div>
      <input type="number" name="diceCount" min="1" />
      <button type="submit">Roll</button>
    </div>
  </form>
);

const DiceList = ({ dices }) => {
  if (dices.length <= 0) return <></>;
  return (
    <div className="dices">
      {dices.map((count, index) => (
        <Dice key={index} count={count} />
      ))}
    </div>
  );
};

export default function App() {
  const [dices, setDices] = useState<number[]>([]);
  const rollDice = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const diceCountValue = formData.get("diceCount");
    const diceCount = diceCountValue
      ? parseInt(diceCountValue.toString(), 10)
      : 0;

    if (!diceCount || diceCount <= 0) {
      alert("Please enter a valid number of dice!");
      return;
    }

    const newDices = Array.from({ length: diceCount }, () =>
      Math.floor(Math.random() * 6 + 1)
    );
    setDices(newDices);
  };

  return (
    <>
      <DiceForm onRoll={rollDice} />
      <DiceList dices={dices} />
    </>
  );
}
