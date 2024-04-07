import { Client, Account } from "appwrite";
const client = new Client();
 export const account = new Account(client);
 client
   .setEndpoint("http://localhost/v1") // Your API Endpoint
   .setProject("OUR_PROJECT_ID");