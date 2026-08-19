import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const valuePulse = {
  y: [-10, 0],
  scale: [1, 1.07, 1],
  opacity: [0.72, 1],
  transition: { duration: 0.24, ease: "easeOut" },
};

function AnimatedStellariumValue({ children, shouldAnimate }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (shouldAnimate) {
      controls.start(valuePulse);
    }
  }, [children, controls, shouldAnimate]);

  return (
    <motion.output
      animate={controls}
      className="stellarium-extractor__value"
      aria-live="polite"
    >
      {children}
    </motion.output>
  );
}

export default AnimatedStellariumValue;
