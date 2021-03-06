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

export const CREATE_ARTICLE_QUERY = `
mutation AddArticle($author: String, $content: String, $published: Boolean, $tags: [String], $title: String) {
  addArticle(author: $author, content: $content, published: $published, tags: $tags, title: $title) {
    author
    content
    published
    tags
    title
    id
    excerpt
  }
}`;

export const EDIT_ARTICLE_QUERY = `
mutation EditArticle($id: String, $author: String, $content: String, $published: Boolean, $tags: [String], $title: String) {
  editArticle(id: $id, author: $author, content: $content, published: $published, tags: $tags, title: $title) {
    author
    content
    published
    tags
    title
    id
    excerpt
  }
}`;

export const REMOVE_ARTICLE_QUERY = `
mutation RemoveArticle($id: String) {
  removeArticle(id: $id) {
    id
  }
}`;
