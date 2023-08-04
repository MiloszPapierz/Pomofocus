export const ResolveColor = (step: number): string => {
  if (step === 1) return "pomodorro.light";
  if (step === 2) return "shortBreak.light";
  return "longBreak.light";
};
