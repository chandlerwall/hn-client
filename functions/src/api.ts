import * as cors from "cors";
import * as express from "express";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get("/:id", (req, res) => res.send({id: req.params.id}));
app.get("/", (req, res) => res.send({ids: [1, 2, 3, 4]}));

export default app;
