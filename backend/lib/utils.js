function uniqueCount(data) {
  return data.reduce((acc, cv, idx, arr) => {
    if (arr[idx > 0 ? idx - 1 : idx].count !== cv.count) {
      return [...acc, cv];
    }
    return acc;
  }, []);
}

export { uniqueCount };
