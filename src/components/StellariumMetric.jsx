import AnimatedStellariumValue from "./functional/AnimatedStellariumValue";

function StellariumMetric({ icon: Icon, label, value, shouldAnimate }) {
  return (
    <div className="stellarium-extractor__metric">
      <p className="stellarium-extractor__label">
        <Icon size="1em" aria-hidden="true" />
        {label}
      </p>
      <AnimatedStellariumValue shouldAnimate={shouldAnimate}>
        {value}
      </AnimatedStellariumValue>
    </div>
  );
}

export default StellariumMetric;
