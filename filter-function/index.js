function fetchDataAndFilter(data, keyword) {
  if (!data || data.length === 0) return [];
  const keywordLower = String(keyword).toLowerCase().trim();
  let results = data.filter((item) => {
    const title = item.title;
    return (
      typeof title === "string" && title.toLowerCase().includes(keywordLower)
    );
  });
  return results;
}
