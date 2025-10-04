export const makeEmojiLayout = (index: number) => {
  const order = index + 1;
  const y = order * 45;
  let x: number;

  if (order < 3) {
    x = order * 102;
  } else if (order < 6) {
    x = (order % 3) * 102;
  } else if (order < 7) {
    x = (order % 5) * 20;
  } else {
    x = (order % 6) * 120;
  }

  return `translate(${x}px, ${y}px) rotate(15deg)`;
};
