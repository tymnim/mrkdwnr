
# mrkdwnr

```
~$ mrkdwnr -p 2222 -t 500 -w README.md

Lintening on: http://localhost:2222
```

# Installation

```
npm i -g mrkdwnr
```

# Usage

```
mkrwdnr [options] <file>
```

# Options

| Option | Shorthand | Required | Description |
| ------ | --------- | -------- | ----------- |
| `--version` | `-v` | optional | print current version |
| `--help` | `-h` | optional | print usage information |
| `--port` | `-p` | optional | port to listen on. If not provided a random port is going to be selected |
| `--watch` | `-w`| optonal | a flag to watch file changes. If not provided, only initial file will be served |
| `--time` | `-t` | optional |  refresh rate of the input file in ms. Default `2000` |
