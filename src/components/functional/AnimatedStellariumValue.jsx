import { useEffect } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

const valuePulse = {
  y: [-10, 0],
  scale: [1, 1.07, 1],
  opacity: [0.72, 1],
  transition: { duration: 0.24, ease: "easeOut" },
};

function AnimatedStellariumValue({ children, fullValue, unit, shouldAnimate }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (shouldAnimate) {
      controls.start(valuePulse);
    }
  }, [children, controls, shouldAnimate]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.output
        animate={controls}
        className="stellarium-extractor__value"
        aria-live="polite"
        aria-label={fullValue}
      >
        <span>{children}</span>
        {unit && <span className="stellarium-extractor__unit">{unit}</span>}
      </motion.output>
    </AnimatePresence>
  );
}

export default AnimatedStellariumValue;
