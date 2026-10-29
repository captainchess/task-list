import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO

  // Seed one user
  await createUser("JohnnyBoi", "password");

  // Seed 3 tasks
  for (let i = 1; i <=3; i++) {
    await createTask("Task " + i, (i % 2), 1);
  }
}
