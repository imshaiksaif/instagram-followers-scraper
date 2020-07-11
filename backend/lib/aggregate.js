function isInLastSixHours(timestamp) {
  const sixHoursAgo = 1000 * 60 * 60 * 6;
  return Date.now() - timestamp < sixHoursAgo;
}

export default function aggregate(scrapes) {
  const aggregateScrapes = [...scrapes]
    .reverse()
    .map(scrape => {
      const date = new Date(scrape.date);
      const optionalHour = isInLastSixHours(scrape.date)
        ? `-${date.getHours()}`
        : ``;
      const key = `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}  ${optionalHour}`;
      return {
        key,
        ...scrape,
      };
    })
    .reduce((acc, cv) => {
      // if it is not found, we want to keep it
      if (!acc.find(scrape => scrape.key === cv.key)) {
        return [...acc, cv];
      }
      return acc;
    }, []);

  return aggregateScrapes;
}
