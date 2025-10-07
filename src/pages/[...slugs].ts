import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

export const prerender = false;

type UserSchema = {
  name: string; // minLength: 1 enforced at runtime or via validation
  description: string;
};

// Initialize a Map to store items (id -> item)
const itemStorage = new Map<
  string,
  { id: string; name: string; description: string }
>();

// Create Elysia app
const app = new Elysia()
  .use(cors())
  .use(swagger()) // Use Swagger for API documentation
  // Schema for item validation
  .group("/items", (app) =>
    app
      // CREATE: Add a new item
      .post(
        "/",
        ({ body }) => {
          const id = crypto.randomUUID(); // Generate unique ID
          const newItem = { id, ...body };
          itemStorage.set(id, newItem);
          return { success: true, item: newItem };
        },
        {
          body: t.Object({
            name: t.String({ minLength: 1 }),
            description: t.String(),
          }),
        }
      )
      // READ: Get all items
      .get("/", async () => {
        const items = Array.from(itemStorage.values());

        return { success: true, items };
      })
      // READ: Get a single item by ID
      .get("/:id", ({ params: { id } }) => {
        const item = itemStorage.get(id);
        if (!item) {
          return { success: false, error: "Item not found" };
        }
        return { success: true, item };
      })
      // UPDATE: Modify an existing item
      .put(
        "/:id",
        ({ params: { id }, body }) => {
          if (!itemStorage.has(id)) {
            return { success: false, error: "Item not found" };
          }
          const updatedItem = { id, ...body };
          itemStorage.set(id, updatedItem);
          return { success: true, item: updatedItem };
        },
        {
          body: t.Object({
            name: t.String({ minLength: 1 }),
            description: t.String(),
          }),
        }
      )
      // DELETE: Remove an item
      .delete("/:id", ({ params: { id } }) => {
        if (!itemStorage.has(id)) {
          return { success: false, error: "Item not found" };
        }
        itemStorage.delete(id);
        return { success: true };
      })
  );

// Export handler for Astro
export const GET = (context: any) => app.handle(context.request);
export const POST = (context: any) => app.handle(context.request);
export const DELETE = (context: any) => app.handle(context.request);
export const PUT = (context: any) => app.handle(context.request);
