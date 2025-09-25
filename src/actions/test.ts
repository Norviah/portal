"use server";

import { prisma } from "@/lib/prisma";
import { client } from "@/lib/client";
import { type Board, type Folder, GetBoardGroupsOpQueryVariables, GetBoardItemsOpQuery, type Update } from "@mondaydotcomorg/api";

// export async function print(): Promise<void> {
//   const d = await prisma.company.findMany();
// }

export async function GetBoards(): Promise<{ id: string; name: string }[] | null> {
  try {
    const string = `
      query {
        folders (ids: 17506113) {
          name
          id
          children {
            id
            name
          }
        }
      }`;

    const { folders } = await client.request<{ folders: [Folder] }>(string);
    const data: { id: string; name: string }[] = [];

    for (const folder of folders) {
      for (const children of folder.children) {
        data.push({ id: children!.id, name: children!.name });
      }
    }

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function GetBoard(id: string): Promise<Update[]> {
  try {
    //     const string = `
    // query {
    //   boards (ids: ${id}) {
    //     id
    //     name
    //     state
    //     permissions
    //     items_page (limit: 500) {
    //       cursor
    //       items {
    //         column_values {
    //           id
    //           column {
    //             title
    //           }
    //           type
    //           value
    //         }
    //         id
    //         name
    //       }
    //     }
    //   }
    // }
    //         `

    const string = `
  query {
    boards (ids: ${id}) {
      updates (limit: 50, ids: ${id}) {
        text_body
        assets {
          name
          public_url
          url
          url_thumbnail
        }
        body
        id
        created_at
        creator {
          name
          id
          photo_small
        }
        replies {
          body
          created_at
          text_body
          body
          creator {
            id
            name
            photo_small
          }
          assets {
            name
            public_url
            url
            url_thumbnail
          }
        }
      }
      groups {
        title
        id
      }
    }
  }
  `;

    const { boards } = await client.request<{ boards: [Board] }>(string);
    const board = boards[0];
    const updates = board.updates! as Update[];

    // for (const board of boards) {
    //   // for (const group of board.groups!) {
    //   //   console.log(`  - ${group?.title}`);
    //   // }
    //   console.log(board.updates);
    // }

    return updates;

    //

    // const data = await client.request<{boards: [Board]}>(string);
    // // const data: { id: string; name: string }[] = []

    // // for (const folder of folders) {
    // //   for (const children of folder.children) {
    // //     data.push({ id: children!.id, name: children!.name})
    // //   }
    // // }

    // const board = data.boards[0]
    // console.log(board.name);
    // console.log(board.id);
    // for (const page of board.items_page.items) {
    //   console.log(`  - ${page.name}: ${page.id}`);

    //   for (const column of page.column_values) {
    //     // console.log(`    - ${column.column.title} (${column.type}): ${column.value}`);
    //     // console.log(`    - ${column.type}`);
    //     // console.log(`    - ${column.value}`);
    //     // console.log();
    //   }
    //   // console.log(`  - columns: ${page.column_values.name.join(", ")}`);
    //   // console.log(page.column_values);
    // }
    // console.log(board.items_page.items.length);
    // // console.log(board.items_page.items.some(x => {
    // //   // x.b
    // // }));
    // // return data
  } catch (e) {
    console.log(e);
    return [];
  }
}
