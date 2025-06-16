const normalize = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, " ").trim();

const generateMatchKey = (title: string, author: string): string => {
  return `${normalize(title)}_${normalize(author)}`;
};
export { generateMatchKey };
