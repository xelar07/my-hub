// En el archivo: src/lib/appwrite.js

import { Client, Account, Databases, ID, Storage } from "appwrite"; // 'Storage' con S mayúscula

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client); // 'new Storage()' con S mayúscula

export { client, account, databases, storage, ID };