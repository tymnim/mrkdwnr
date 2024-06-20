#! node

import { getConfig } from "./config.mjs";
import { server } from "./server.mjs";
import { fileReader } from "./fileReader.mjs";
import { parse } from "./markdownParser.mjs";
import { existsSync, readFileSync, createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getConfig();

let html = "";
const css = readFileSync(`${__dirname}/style.css`, { encoding: "utf8" });
const template = [`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>${css}</style>
  </head>
  <body>`, "</body>"];

function assignHtml(body) {
  html = template.join(body);
}
if (config.help) {
  console.info(`
mrkdwnr [-v | --version]  [-h | --help] [-w | --watch] [-t | --time <time>]
        [-p | --port <port>] <file>`.trim());
  process.exit(0);
}

if (config.version) {
  const json = JSON.parse(readFileSync("./package.json"));
  console.info(`mrkdwnr version: ${json.version}`);
  process.exit(0);
}

if (existsSync(config.input)) {
  if (config.watch) {
    fileReader(config.input, config.time, (err, markdown) => {
      if (err) {
        console.error(err);
        return;
      }

      assignHtml(parse(markdown));
    });
  }
  else {
    fileReader(config.input)
      .then(parse)
      .then(assignHtml);
  }
}
else {
  console.error(`Cannot find ${config.input}. Type -h / --help for additional info`);
  process.exit(1);
}

config.port = config.port || Math.floor(Math.random() * 50000 + 3000);

server(config.port, (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(html);
    return;
  }

  const fileStream = createReadStream(`.${req.url}`);
  fileStream.on("open", () => fileStream.pipe(res));
  fileStream.on("error", err => {
    console.error(err);
    res.writeHead(404);
    res.end();
  });
}).then((...args) => {
  console.log(`\nLintening on http://localhost:${config.port}`);
}).catch(console.error);

