import {
  Card,
  getAllBlogCardsToPublish,
  getAllChildCards,
  getCardsByIds,
  tagCardAsPublished,
} from "./cards.ts";

const buildBlogArticleFromCard = async (
  { data: { id, name, html } }: Card,
  level = 1,
) => {
  const children = await getAllChildCards(id);

  let childrenHtml = "";

  for (const child of Object.values(children)) {
    const childHtml = await buildBlogArticleFromCard(child, level + 1);
    childrenHtml += childHtml;
  }

  return `
    <h${level}>${name}</h${level}>
    ${html}
    ${childrenHtml}
  `;
};

// getAllChildCards("49f035c6-a518-40c1-acab-e5087f0c228f");

const publishBlogArticles = async () => {
  const publishedBlogCards = await getAllBlogCardsToPublish();

  console.log(publishedBlogCards);

  const blogArticles = [];

  for (const publishedBlogCard of Object.values(publishedBlogCards)) {
    const articleHtml = await buildBlogArticleFromCard(publishedBlogCard);

    console.log(articleHtml);

    blogArticles.push(articleHtml);
  }
};

// DO SOMETHING

// const articles = await publishBlogArticles();

const cards = await getCardsByIds(["5fd5b354-5d88-4296-9b71-99dbee4122fb"]);

const [card, ..._rest] = Object.values(cards);

console.log(cards);

tagCardAsPublished(card);

// console.log(articles);
