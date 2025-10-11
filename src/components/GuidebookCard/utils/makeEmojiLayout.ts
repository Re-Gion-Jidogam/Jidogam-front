const horizontalEmojiLayoutLogic = (index: number) => {
  const order = index + 1;
  let y = 20 + order * 32;
  let x: number;

  if (order < 4) {
    x = 110 + ((order % 4) - 1) * 102;
    y = 20 + (order % 4) * 14 + order * 20;
  } else if (order < 8) {
    x = 120 + ((order % 4) - 1) * 102;
    y = 60 + (order % 4) * 14 + order * 20;
  } else {
    x = 140 + ((order % 4) - 1) * 102;
    y = 120 + (order % 4) * 14 + order * 20;
  }

  return `translate(${x}px, ${y}px) rotate(15deg)`;
};

export const verticalEmojiLayoutLogic = (index: number) => {
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

export const makeEmojiLayout = ({
  index,
  type,
}: {
  index: number;
  type: "vertical" | "horizontal";
}) => {
  return type === "vertical"
    ? verticalEmojiLayoutLogic(index)
    : horizontalEmojiLayoutLogic(index);
};
