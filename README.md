This repository contains a fully accessible, code-driven slide deck built with **Astro** and **Reveal.js** for my presentation slides for SUNY Oswego Quest 2026.

## Key Features
* **Astro-Native:** Leverages Astro's zero-JS-by-default architecture for the core layout, ensuring a fast and accessible baseline.
* **Reveal.js Integration:** Uses the Reveal.js engine for professional slide transitions and technical features like code highlighting.
* **Component-Based Slides:** Each slide or section is managed as a standalone Astro component for better organization and reusability.
* **Accessibility First:** Designed with semantic HTML and keyboard navigation in mind to reflect the core values of the research.

## Project Structure

The project follows a standard Astro directory structure with specific integration for Reveal.js:

```text
/
├── src/
│   ├── components/       # Individual slide components (e.g., Intro.astro, End.astro)
│   ├── layouts/          # Layout.astro: The core Reveal.js wrapper and global styles
│   ├── pages/            # index.astro: The main entry point where slides are assembled
│   ├── scripts/          # presentation.js: Reveal.js initialization and plugin config
│   └── styles/           # Global CSS and Reveal.js theme overrides
├── public/               # Static assets (images, favicon, etc.)
└── package.json          # Project dependencies and scripts
```

## How to Use

### Development
To start the local development server for your presentation:
```sh
npm run dev
```
The presentation will be available at `localhost:4321`.

### Adding New Slides
1.  **Create a Component:** Add a new `.astro` file in `src/components/`.
2.  **Wrap Content:** Ensure your content is wrapped in a `<section>` tag (Reveal.js's standard for a single slide).
3.  **Import & Place:** Import the component into `src/pages/index.astro` and place it within the `<Layout>` tag in your preferred order.

### Customizing the Theme
* **Scripts:** Edit `src/scripts/presentation.js` to change Reveal.js configurations like transition speed, controls, or plugins.
* **Styles:** Modify `src/styles/global.css` to override Reveal.js default themes or add custom brand colors for your SUNY Oswego presentation.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies (Astro, Reveal.js, etc.) |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Builds a production-ready static site in `./dist/` |
| `npm run lint` | Runs ESLint and Prettier to ensure code quality and formatting |

---