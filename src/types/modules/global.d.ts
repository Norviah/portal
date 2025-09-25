// Extend the NodeJS namespace to ensure that environment variables are not
// accessible through the `process.env` object.
declare namespace NodeJS {
  interface ProcessEnv extends Record<string, undefined> {}
}
