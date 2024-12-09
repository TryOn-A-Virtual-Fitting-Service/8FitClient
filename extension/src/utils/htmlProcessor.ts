export const preprocessHtmlString = (html: string): string => {
  const withoutClasses = html.replace(/class\s*=\s*"[^"]*"/g, "");
  const withoutQuotes = withoutClasses.replace(/"/g, "");
  return withoutQuotes;
};
