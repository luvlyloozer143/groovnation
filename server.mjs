// server.mjs
import { createServer } from "https";
import { parse } from "url";
import fs from "fs";
import next from "next";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(process.cwd(), "cert/key.pem")),
  cert: fs.readFileSync(path.join(process.cwd(), "cert/cert.pem")),
};

const port = 3000;

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀  Server ready on https://localhost:${port}`);
  });
});
