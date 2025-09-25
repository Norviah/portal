import { client } from "@/lib/client";
import { promises as fs } from "node:fs";

import type { Board } from "@mondaydotcomorg/api";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "./button";

const data: Board[] = [];

async function nextPage(cursor: string) {
  console.log(`next page: ${cursor}`);
  await new Promise((x) => setTimeout(x, 3000));

  const string = `
    query {
    next_items_page (limit: 50, cursor: "${cursor}") {
      cursor
      items {
        board {
          id
          name
        }
        column_values {
          column {
            title
          }
          id
          type
          value
        }
        created_at
        creator {
          account {
            name
            id
          }
        }
        creator_id
        email
        group {
          id
        }
        id
        name
        parent_item {
          id
        }
        relative_link
        subitems {
          id
        }

      }
    }
  }`;

  const { next_items_page } = await client.request<{ next_items_page: Board["items_page"] }>(string);

  if (next_items_page.cursor) {
    await nextPage(next_items_page.cursor);
  }

  for (const item of next_items_page.items) {
    const board = data.find((b) => b.id === item.board?.id);

    if (board) {
      board.items_page.items.push(item);
    } else {
      // @ts-expect-error
      data.push(item);
    }
  }
}

async function getPageInternal() {
  console.log(`getting new page`);
  await new Promise((x) => setTimeout(x, 3000));
  const string = `
      query {
        boards {
          items_page (limit: 100) {
            cursor
            items {
              board {
                id
                name
              }
              column_values {
                column {
                  title
                }
                id
                type
                value
              }
              created_at
              creator {
                account {
                  name
                  id
                }
              }
              creator_id
              email
              group {
                id
              }
              id
              name
              parent_item {
                id
              }
              relative_link
              subitems {
                id
              }
            }
          }
        }
      }`;

  const { boards } = await client.request<{ boards: [Board] }>(string);

  for (const board of boards) {
    if (board.items_page.cursor) {
      // await getPageInternal({ cursor: board.items_page.cursor, board: board.id });
      await nextPage(board.items_page.cursor);
    }

    data.push(board);
  }
}

async function getPage() {
  "use server";
  return await getPageInternal();
}

export default async function Home() {
  // try {
  //   await getPage();

  //   await fs.writeFile("data.json", JSON.stringify(data, null, 2));

  //   return <p>wait a bit and you should see a `data.json` file in root directory.</p>;
  // } catch (error) {
  //   console.error("Error fetching Monday.com data:", error);
  //   return (
  //     <div className="p-8">
  //       <h1 className="text-2xl font-bold mb-4">Monday.com Data Download</h1>
  //       <p className="text-red-600 mb-4">Unable to connect to Monday.com. Please check your MONDAY_ACCESS_TOKEN environment variable.</p>
  //       <p className="text-gray-600">This page requires a valid Monday.com access token to function properly.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Monday.com Data Download</h1>
      <DownloadButton promise={getPage} />
    </div>
  );
}
