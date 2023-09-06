export const timestampOfOneDay: number = 24 * 3600 * 1000;

export const timetampsToString = (time: number): string => {
  const differenceWithToday = (new Date().getTime() - time) / timestampOfOneDay;
  if (differenceWithToday >= 1)
    return `Il y'a ${differenceWithToday.toFixed(0)} jours`;
  if (differenceWithToday * 24 * 60 >= 1)
    return `Il y'a ${(differenceWithToday * 24 * 60).toFixed(0)} heures`;
  if (differenceWithToday * 24 * 60 * 60 >= 1)
    return `Il y'a ${(differenceWithToday * 24 * 60 * 60).toFixed(0)} minutes`;
  return `A l'instant`;
};
