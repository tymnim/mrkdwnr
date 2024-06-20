import { watchFile, readFile } from "node:fs";

export function fileReader(path, time = 2000, callback) {
  if (callback) {
    watchFile(path, { interval: parseInt(time) }, () => {
      readFile(path, { encoding: "utf8" }, callback);
    });
    readFile(path, { encoding: "utf8" }, callback);
    return;
  }

  return new Promise((resolve, reject) => {
    return readFile(path, { encoding: "utf8" }, (e, res) => e && reject(e) || resolve(res));
  });
}

