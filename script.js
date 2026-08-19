function App() {
  const [counter, setCounter] = React.useState(0);

  function increaseValue() {
    setCounter(counter + 1);
  }

  return (
    <>
      <h1>Witaj!</h1>
      <p id="counter">Kliknięto {counter} razy</p>
      <button id="clickButton" onClick={increaseValue}>
        Kliknij mnie
      </button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(React.createElement(App));
