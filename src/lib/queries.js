export const ARTICLES_QUERY = `{
  articles {
    author
    excerpt
    id
    content
    title
    tags
  }
}`;

export const ARTICLE_QUERY = `query Articles($id: String){
  articles(id: $id) {
    author
    excerpt
    id
    title
    content
    published
    tags
  }
}`;
