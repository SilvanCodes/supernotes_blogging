const readEnv = (name: string) =>
  Deno.env.get(name) ||
  (console.error(`Environment variable ${name} is not set`), Deno.exit(1));

export { readEnv };
