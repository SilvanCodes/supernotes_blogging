import { articleSkeleton } from "./articles.ts";
import {
  Card,
  getAllBlogCardsToPublish,
  getAllChildCards,
  getAllPublishedBlogCards,
  tagCardsAsPublished,
} from "./cards.ts";

const buildBlogArticleFromCard = async (
  { data: { id, name, html } }: Card,
  level = 1,
) => {
  const sectionizedHtml = html.replaceAll(
    "<h",
    `
  </section>
  <section><h`,
  );

  const children = Object.values(await getAllChildCards(id));

  children.sort((cardA, cardB) =>
    cardA.data.targeted_when < cardB.data.targeted_when ? -1 : 1
  );

  // console.log(children);

  let childrenHtml = "";

  for (const child of Object.values(children)) {
    const childHtml = await buildBlogArticleFromCard(child, level + 1);
    childrenHtml += childHtml;
  }

  return `
    <section>
      <h${level}>${name}</h${level}>
${sectionizedHtml}
    </section>
${childrenHtml.trim()}`;
};

type ArticleMeta = {
  articleUrl: string;
  name: string;
  created_when: string;
  modified_when: string;
};

const buildIndexHtml = async (
  articleMeta: ArticleMeta[],
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

  const indexHtml = articleSkeleton("SilvanBlogs", indexEntries);

  await Deno.writeTextFile("index.html", indexHtml);
};

const publishBlogArticles = async () => {
  console.log("Getting all cards to publish...");

  const blogCardsToPublish = await getAllBlogCardsToPublish();

  console.log(
    `Got ${Object.keys(blogCardsToPublish).length} cards to publish.`,
  );

  const blogArticles = [];

  const blogArticleLinks = [];

  for (const blogCardToPublish of Object.values(blogCardsToPublish)) {
    const { id, name, created_when, modified_when } = blogCardToPublish.data;

    console.log(`Building article ${name} with id ${id}...`);

    const articleHtml = await buildBlogArticleFromCard(blogCardToPublish);

    const article = articleSkeleton(name, articleHtml).trim();

    // console.log(article);

    blogArticles.push(article);

    const articleUrl = `./articles/${id}.html`;

    blogArticleLinks.push({ articleUrl, name, created_when, modified_when });

    await Deno.writeTextFile(articleUrl, article);

    console.log(`Sucessfully build article ${name} with id ${id}.`);
  }

  const alreadyPublishedCards = await getAllPublishedBlogCards();

  for (const alreadyPublishedCard of Object.values(alreadyPublishedCards)) {
    const { id, name, created_when, modified_when } = alreadyPublishedCard.data;
    const articleUrl = `./articles/${id}.html`;
    blogArticleLinks.push({ articleUrl, name, created_when, modified_when });
  }

  const uniqueBlogArticleLinks = Object.values(blogArticleLinks.reduce(
    (
      acc: Record<string, ArticleMeta>,
      val,
    ) => {
      acc[val.articleUrl] = val;
      return acc;
    },
    {},
  ));

  uniqueBlogArticleLinks.sort((
    cardA,
    cardB,
  ) => cardA.created_when > cardB.created_when ? -1 : 1);

  console.log(`Building index.html...`);

  await buildIndexHtml(uniqueBlogArticleLinks);

  console.log(`Sucessfully build index.html.`);

  console.log(`Tagging cards as published...`);

  await tagCardsAsPublished(blogCardsToPublish);

  console.log(`Sucessfully tagged cards as published.`);
};

// DO SOMETHING

console.log("Starting article generation...");

await publishBlogArticles();

// const cards = await getCardsByIds(["5fd5b354-5d88-4296-9b71-99dbee4122fb"]);

// const [card, ..._rest] = Object.values(cards);

// console.log(cards);

// tagCardAsPublished(card);

console.log("Successfully generated articles!");
