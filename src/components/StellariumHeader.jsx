import { Orbit, Rocket } from "lucide-react";

function StellariumHeader() {
  return (
    <>
      <p className="stellarium-extractor__eyebrow">
        <Orbit size="1em" aria-hidden="true" />
        React Space Clicker
      </p>
      <h1>
        <Rocket size="0.75em" aria-hidden="true" />
        Witaj, kapitanie!
      </h1>
    </>
  );
}

export default StellariumHeader;
