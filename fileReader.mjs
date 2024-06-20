import { watchFile, readFile } from "node:fs";

export function fileReader(path, callback) {
  if (callback) {
    watchFile(path, { interval: 2000 }, () => {
      readFile(path, { encoding: "utf8" }, callback);
    });
    readFile(path, { encoding: "utf8" }, callback);
    return;
  }

  return new Promise((resolve, reject) => {
    return readFile(path, { encoding: "utf8" }, (e, res) => e && reject(e) || resolve(res));
  });
}

