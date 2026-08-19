import AnimatedStellariumValue from "./functional/AnimatedStellariumValue";

function StellariumMetric({ icon: Icon, label, value, unit, fullValue, shouldAnimate }) {
  return (
    <div className="stellarium-extractor__metric">
      <p className="stellarium-extractor__label">
        <Icon size="1em" aria-hidden="true" />
        {label}
      </p>
      <AnimatedStellariumValue fullValue={fullValue} unit={unit} shouldAnimate={shouldAnimate}>
        {value}
      </AnimatedStellariumValue>
    </div>
  );
}

export default StellariumMetric;
