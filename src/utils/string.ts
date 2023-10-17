export const formateToDateString = (date: string): string => {
  return new Date(date).toDateString();
};

export const capitalizeWord = (text: string): string =>
  text[0]?.toUpperCase() + text.slice(1).toLowerCase();

export const formatUrl = (url: string) =>
  url
    .split("-")
    .map((spliter: string) => capitalizeWord(spliter))
    .join(" ");
