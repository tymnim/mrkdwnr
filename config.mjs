const ARGS_MAP = {
  "watch": ["-w", "--watch"],
  "port": ["-p", "--port"],
  "time": ["-t", "--time"],
  "help": ["-h", "--help"],
  "version": ["-v", "--version"]
};

export function getConfig(args = process.argv.slice(2)) {
  const params = {};
  for (let i = 0; i < args.length; i += 1) {
    const values = Object.entries(ARGS_MAP).filter(([param, flags]) => flags.includes(args[i]));
    values.forEach(([param]) => {
      if (["watch", "help", "version"].includes(param)) {
        params[param] = true;
      }
      else {
        i += 1;
        const value = args[i];
        params[param] = value;
      }
    });
  }
  params.input = args.at(-1);

  return params;
}

