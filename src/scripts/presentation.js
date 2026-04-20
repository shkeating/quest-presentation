import Reveal from "reveal.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js"; //

export function initPresentation() {
  const deck = new Reveal({
    plugins: [Highlight, Markdown], // Add Markdown here
    // Optional: Configure delimiters for your slides
    markdown: {
      separator: "^---", // Horizontal rule --- creates a new slide
      verticalSeparator: "^--", // Double dash -- creates a vertical slide
    },
  });
  deck.initialize();
}

initPresentation();
