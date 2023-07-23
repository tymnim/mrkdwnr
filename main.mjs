#! node

import { getConfig } from "./config.mjs";
import { server } from "./server.mjs";
import { fileReader } from "./fileReader.mjs";
import { parse } from "./markdownParser.mjs";
import { readFileSync } from "node:fs";
import path from 'path';
import { fileURLToPath } from 'url';

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
  <body>`, `</body>`];

function assignHtml(body) {
  html = template.join(body);
}

if (config.watch) {
  fileReader(config.input, (err, markdown) => {
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

config.port = config.port || Math.floor(Math.random() * 50000 + 3000);

server(config.port, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
}).then((...args) => {
  console.log(`\nLintening on http://localhost:${config.port}`);
}).catch(console.error);

