// src/client.js

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2d4fqbse", // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: "production", // or the name you chose in step 2
});

export default client;
