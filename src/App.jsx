import "./App.css";
import ClickCounter from "./components/ClickCounter";

function App() {
  return (
    <>
      <ClickCounter incrementCount />
      <ClickCounter incrementCount={3} />
      <ClickCounter incrementCount={7} />
    </>
  );
}

export default App;
