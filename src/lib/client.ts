import { ApiClient } from "@mondaydotcomorg/api";
import { env } from "./env";

export const client = new ApiClient({
  token: env.MONDAY_ACCESS_TOKEN,
});
