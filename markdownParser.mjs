import showdown from "showdown";

const converter = new showdown.Converter();
converter.setOption("ghCompatibleHeaderId",  true);

export function parse(markdown) {
  return converter.makeHtml(markdown);
}

