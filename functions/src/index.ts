import * as functions from "firebase-functions";
import app from "./api";

export const helloWorld = functions.https.onRequest(async (request, response) => {
  response.send("Hello from Firebase!");
});

// Expose Express API as a single Cloud Function:
export const api = functions.https.onRequest(app);
