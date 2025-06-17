const generateMatchKey = (
  title: string,
  author: string,
  series: string
): string => {
  const clean = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

  return `${clean(title)}_${clean(author)}_${clean(series)}`;
};

export { generateMatchKey };
