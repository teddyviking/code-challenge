export function filterPreviousArticles(previous, articles) {
  const filtered = articles.filter(article => !articleInArray(previous, article));
  return filtered;
}

export function articleInArray(array, article) {
  return array.find(e => e.id === article.id) !== undefined;
}
