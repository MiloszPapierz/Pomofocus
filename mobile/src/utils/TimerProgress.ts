export const calculateTimerProgress = (
  totalMinutes: number,
  currentMinutes: number,
  currentSeconds: number
): number => {
  const totalSeconds = totalMinutes * 60;
  const totalCurrentSeconds = currentMinutes * 60 + currentSeconds;
  const progress = (totalCurrentSeconds / totalSeconds) * 100;
  return 100 - progress;
};
