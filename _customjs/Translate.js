class Translate {
  async invoke() {
    function replaceWikiLinksInText(text) {
      const regex = /\[\[([^\]]*)\]\]/gm;

      return text.replace(regex, function (match) {
        const withSquarePqrenthesisRemoved = match.substring(
          2,
          match.length - 2,
        );

        const parts = withSquarePqrenthesisRemoved.split("|");
        const hasSeparateTitle = parts.length > 1;
        if (hasSeparateTitle) {
          parts.shift();
          const result = parts.join("|");
          return `${result}`;
        }

        const withoutAnchors = withSquarePqrenthesisRemoved.split("#")[0];

        return `${withoutAnchors}`;
      });
    }

    const text = replaceWikiLinksInText(
      customJS.app.workspace.activeEditor.getSelection().trim(),
    );

    const isRussian = /[а-яА-ЯЁё]/.test(text);

    const url = new URL("https://translate.google.com/?op=translate");
    url.searchParams.set("text", text);
    url.searchParams.set("sl", isRussian ? "ru" : "auto");
    url.searchParams.set("tl", isRussian ? "auto" : "ru");

    global.open(url);
  }
}
