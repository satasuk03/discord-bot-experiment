import { heartEmpty, heartFull, xpEmpty, xpFull } from "../../emojis";

export const generateBar = (
  type: "hp" | "xp",
  current: number,
  max: number,
  step: number = 5
) => {
  let result = "";
  const full = type === "hp" ? heartFull : xpFull;
  const empty = type === "hp" ? heartEmpty : xpEmpty;

  const fullAmount = Math.ceil((current / max) * step);
  for (let i = 0; i < step; i++) {
    if (i < fullAmount) {
      result += full;
    } else {
      result += empty;
    }
  }
  return result;
};
