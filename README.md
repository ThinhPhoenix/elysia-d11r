# elysia-d11r

A dynamic controller loader for Elysia.js

## Description

`elysia-d11r` is a utility package that automatically loads and registers Elysia.js controllers from a specified directory. It simplifies the process of organizing and managing multiple controllers in your Elysia application.

## Installation

```bash
npm install elysia-d11r
```

## Usage

```typescript
import { Elysia } from "elysia";
import { dynamicController } from "elysia-d11r";

const app = new Elysia().use(
  await dynamicController({
    dir: "./controllers", // Directory containing controller files
    pattern: "*.controller.ts", // File pattern to match
    baseDir: "./src", // Base directory for resolving paths
  })
);

app.listen(3000);
```

## API

### `dynamicController(options)`

Loads and registers controllers dynamically.

#### Options

- `dir` (string, default: `"../controllers"`): The directory to scan for controller files, relative to `baseDir`.
- `pattern` (string, default: `"*.controller.ts"`): The file pattern to match controller files.
- `baseDir` (string, default: `join(process.cwd(), "src")`): The base directory for resolving the controllers directory.

#### Returns

An Elysia plugin instance with all matched controllers registered.

## Controller Structure

Controllers should export an Elysia plugin instance. For example:

```typescript
// src/controllers/user.controller.ts
import { Elysia } from "elysia";

export const userController = new Elysia()
  .get("/users", () => "List of users")
  .post("/users", ({ body }) => "User created");
```

## License

MIT
