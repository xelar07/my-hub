import { Client, Account, Databases, ID } from "appwrite"; // <--- 1. Añade ID aquí

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID }; // <--- 2. Y añádelo a la exportación