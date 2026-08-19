import { useState } from "react";
import "./ClickCounter.css";

function ClickCounter() {
  const [counter, setCounter] = useState(0);

  const increaseValue = () => {
    setCounter((currentCounter) => currentCounter + 1);
  };
  return (
    <main className="click-counter">
      <p className="click-counter__eyebrow">Kosmiczny licznik</p>
      <h1>Witaj, kapitanie!</h1>
      <p className="click-counter__label">Kliknięto</p>
      <output className="click-counter__value" aria-live="polite">
        {counter}
      </output>
      <p className="click-counter__label">razy</p>
      <button className="click-counter__button" onClick={increaseValue}>
        Kliknij mnie
      </button>
    </main>
  );
}

export default ClickCounter;
