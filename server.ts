import http from "http";
import express from "express";
import cors from "cors"
import { getColors } from "./src/services/getColors";
import { getComponents } from "./src/services/getComponents";

const app = express();
app.use(cors())

app.get("/", async function(req, res) {
    console.log('foi')
    res.send("<h1>Servidor rodando com ExpressJS</h1>");
});

app.get("/colors", getColors)

app.get("/components", getComponents as any)

const server = http.createServer(app);
server.listen(4000, () => {
    console.log("Servidor rodando local na porta 4000")
    }
);
