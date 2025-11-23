import { Elysia } from "elysia";
import { readdirSync } from "fs";
import { join } from "path";

export const dynamicController = async ({
  dir = "../controllers",
  pattern = "*.controller.ts",
  baseDir = join(process.cwd(), "src"),
}) => {
  const controllersDir = join(baseDir, dir);
  const patternSuffix = pattern.replace("*", "");
  const controllerFiles = readdirSync(controllersDir).filter((file) =>
    file.endsWith(patternSuffix)
  );
  const plugin = new Elysia();
  for (const file of controllerFiles) {
    try {
      const controller = await import(join(controllersDir, file));
      const controllerInstance = Object.values(controller)[0];
      if (controllerInstance) {
        plugin.use(controllerInstance as any);
      }
    } catch (error) {
      console.error("Error importing", file, error);
    }
  }

  return plugin;
};
