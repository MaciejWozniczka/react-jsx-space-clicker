const STAR_COUNT = 86;

function createRandom(seed) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = createRandom(240819);
const stars = Array.from({ length: STAR_COUNT }, (_, index) => ({
  id: index,
  left: `${random() * 100}%`,
  opacity: 0.35 + random() * 0.65,
  size: 1 + random() * 1.8,
  top: `${random() * 100}%`,
}));

function StarField({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star) => (
        <i
          className="star-field__star"
          key={star.id}
          style={{
            '--star-left': star.left,
            '--star-opacity': star.opacity,
            '--star-size': `${star.size}px`,
            '--star-top': star.top,
          }}
        />
      ))}
    </div>
  );
}

export default StarField;
