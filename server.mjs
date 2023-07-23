import { createServer } from "node:http";

export function server(port, callback) {
  return new Promise((resolve, reject) => {
    const server = createServer(callback);

    server.listen(port, resolve);
    server.on("error", reject);
  });
}

