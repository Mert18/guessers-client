export const convertToUserTimeZone = (utcDateTimeString: string) => {
  const utcDate = new Date(utcDateTimeString); // Parse the UTC string
  return utcDate.toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};
