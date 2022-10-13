import { articleSkeleton, indexSkeleton } from "./articles.ts";
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
  const children = Object.values(await getAllChildCards(id));

  children.sort((cardA, cardB) =>
    cardA.data.targeted_when < cardB.data.targeted_when ? -1 : 1
  );

  console.log(children);

  let childrenHtml = "";

  for (const child of Object.values(children)) {
    const childHtml = await buildBlogArticleFromCard(child, level + 1);
    childrenHtml += childHtml;
  }

  return `
    <section>
    <h${level}>${name}</h${level}>
    ${html}
    </section>
    ${childrenHtml.trim()}
  `;
};

// getAllChildCards("49f035c6-a518-40c1-acab-e5087f0c228f");

const buildIndexHtml = async (
  articleMeta: {
    articleUrl: string;
    name: string;
    created_when: string;
    modified_when: string;
  }[],
) => {
  let indexEntries = "";

  for (const { name, created_when, modified_when, articleUrl } of articleMeta) {
    indexEntries += `
    <section>
      <a href=${articleUrl}>
        <h2>${name}</h2>
        <p>Created at: ${new Date(created_when).toDateString()}</p>
        <p>Updated at: ${new Date(modified_when).toDateString()}</p>
      </a>
    </section>
    `;
  }

  const indexHtml = indexSkeleton(indexEntries);

  await Deno.writeTextFile("index.html", indexHtml);
};

const publishBlogArticles = async () => {
  const blogCardsToPublish = await getAllBlogCardsToPublish();

  console.log(blogCardsToPublish);

  const blogArticles = [];

  const blogArticleLinks = [];

  for (const blogCardToPublish of Object.values(blogCardsToPublish)) {
    const { id, name, created_when, modified_when } = blogCardToPublish.data;

    const articleHtml = await buildBlogArticleFromCard(blogCardToPublish);

    const article = articleSkeleton(name, articleHtml).trim();

    console.log(article);

    blogArticles.push(article);

    const articleUrl = `./articles/${id}.html`;

    blogArticleLinks.push({ articleUrl, name, created_when, modified_when });

    await Deno.writeTextFile(articleUrl, article);
  }

  await buildIndexHtml(blogArticleLinks);
};

// DO SOMETHING

const articles = await publishBlogArticles();

// const cards = await getCardsByIds(["5fd5b354-5d88-4296-9b71-99dbee4122fb"]);

// const [card, ..._rest] = Object.values(cards);

// console.log(cards);

// tagCardAsPublished(card);

console.log(articles);
