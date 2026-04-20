import Reveal from "reveal.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";

export function initPresentation() {
  const deck = new Reveal({
    plugins: [Highlight],
  });
  deck.initialize();
}

initPresentation();
