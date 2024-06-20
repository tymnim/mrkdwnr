const ARGS_MAP = {
  "input": ["-i", "--input"],
  "watch": ["-w", "--watch"],
  "port": ["-p", "--port"],
  "time": ["-t", "--time"]
};

export function getConfig(args = process.argv.slice(2)) {
  const params = {};
  for (let i = 0; i < args.length; i += 1) {
    const values = Object.entries(ARGS_MAP).filter(([param, flags]) => flags.includes(args[i]));
    values.forEach(([param]) => {
      if (["watch"].includes(param)) {
        params[param] = true;
      }
      else {
        i += 1;
        const value = args[i];
        params[param] = value;
      }
    });
  }

  return params;
}

