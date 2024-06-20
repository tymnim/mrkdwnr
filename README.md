
# mrkdwnr

```
~$ mrkdwnr -i README.md -p 2222 -w

Lintening on: http://localhost:2222
```

# Installation

```
npm i -g mrkdwnr
```

# Usage

```
mkrwdnr [options]
```

# Options

| Option | Shorthand | Required | Description |
| ------ | --------- | -------- | ----------- |
| `--input` | `-i` | required | path to the the markdown file |
| `--port` | `-p` | optional | port to listen on. If not provided a random port is going to be selected |
| `--watch` | `-w`| optonal | a flag to watch file changes. If not provided, only initial file will be served |
| `--time` | `-t` | optional |  refresh rate of the input file in ms. Default `2000` |
