import { readEnv } from "./util.ts";

const SUPERNOTES_CARDS_SELECT_URL =
  "https://api.supernotes.app/v1/cards/get/select";

const SUPERNOTES_CARDS_SPECIFY_URL =
  "https://api.supernotes.app/v1/cards/get/specify";

const SUPERNOTES_CARDS_UPDATE_URL = "https://api.supernotes.app/v1/cards/";

const BLOG_ARTICLES_CARD_ID = "ea01500d-d244-44d8-9e85-ead7ecc53315";

const TAG_TO_PUBLISH = "publish";

type Card = {
  data: {
    id: string;
    name: string;
    html: string;
    tags: string[];
    targeted_when: string;
    created_when: string;
    modified_when: string;
  };
};

type CardCollection = { string: Card };

const getCardsByIds = async (ids: string[]): Promise<CardCollection> => {
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Api-Key": readEnv("SUPERNOTES_API_KEY"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "specified": ids,
    }),
  };

  const res = await fetch(SUPERNOTES_CARDS_SPECIFY_URL, options);
  //   console.log(res);

  const json = await res.json();
  //   console.log(json);

  return json;
};

const getAllBlogCardsToPublish = async (): Promise<CardCollection> => {
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Api-Key": readEnv("SUPERNOTES_API_KEY"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent_card_id: BLOG_ARTICLES_CARD_ID,
      filter_group: {
        operator: "and",
        filters: [
          {
            type: "tag",
            operator: "contains",
            arg: TAG_TO_PUBLISH,
          },
        ],
      },
    }),
  };

  const res = await fetch(SUPERNOTES_CARDS_SELECT_URL, options);
  //   console.log(res);

  const json = await res.json();
  //   console.log(json);

  return json;
};

const getAllChildCards = async (id: string): Promise<CardCollection> => {
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Api-Key": readEnv("SUPERNOTES_API_KEY"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent_card_id: id,
    }),
  };

  const res = await fetch(SUPERNOTES_CARDS_SELECT_URL, options);
  //   console.log(res);

  const json = await res.json();
  //   console.log(json);

  return json;
};

const tagCardAsPublished = async ({ data: { id, tags } }: Card) => {
  tags = tags.filter((tag) => tag !== "publish");
  tags.push("published");

  const options = {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Api-Key": readEnv("SUPERNOTES_API_KEY"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "card": {
        "tags": tags,
      },
    }),
  };

  const res = await fetch(
    `${SUPERNOTES_CARDS_UPDATE_URL}${id}/`,
    options,
  );
  //   console.log(res);

  const json = await res.json();
  //   console.log(json);

  return json;
};

export type { Card };

export {
  getAllBlogCardsToPublish,
  getAllChildCards,
  getCardsByIds,
  tagCardAsPublished,
};
