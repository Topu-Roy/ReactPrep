import { hooksEasyQuestions } from "./easy";
import { hooksHardQuestions } from "./hard";
import { hooksMediumQuestions } from "./medium";

export const hooksQuestions = [
  ...hooksEasyQuestions,
  ...hooksMediumQuestions,
  ...hooksHardQuestions,
];
