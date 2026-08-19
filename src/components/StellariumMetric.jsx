import AnimatedStellariumValue from "./functional/AnimatedStellariumValue";

function StellariumMetric({ icon: Icon, label, value, shouldAnimate }) {
  return (
    <>
      <p className="stellarium-extractor__label">
        <Icon size="1em" aria-hidden="true" />
        {label}
      </p>
      <AnimatedStellariumValue shouldAnimate={shouldAnimate}>
        {value}
      </AnimatedStellariumValue>
    </>
  );
}

export default StellariumMetric;
