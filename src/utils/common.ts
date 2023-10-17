export const timestampOfOneDay: number = 24 * 3600 * 1000;

export const timetampsToString = (time: number): string => {
  const differenceWithToday = (new Date().getTime() - time) / timestampOfOneDay;
  if (differenceWithToday >= 1)
    return `${differenceWithToday.toFixed(0)} d`;
  if (differenceWithToday * 24 * 60 >= 1)
    return `${(differenceWithToday * 24 * 60).toFixed(0)} h`;
  if (differenceWithToday * 24 * 60 * 60 >= 1)
    return `${(differenceWithToday * 24 * 60 * 60).toFixed(0)} m`;
  return `Now`;
};
