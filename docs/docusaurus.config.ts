import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as path from "path";

const config: Config = {
  title: "GraphQL Kotlin Codegen",
  favicon: "img/favicon.ico",

  url: "https://expediagroup.github.io",
  baseUrl: "/graphql-kotlin-codegen/",

  // GitHub pages deployment config.
  organizationName: "ExpediaGroup",
  projectName: "graphql-kotlin-codegen",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    path.resolve(
      __dirname,
      "node_modules",
      "docusaurus-theme-github-codeblock",
      "build",
      "index.js",
    ),
  ],
  themeConfig: {
    navbar: {
      title: "GraphQL Kotlin Codegen",
      logo: {
        alt: "EG Logo",
        src: "img/expediagroup.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "html",
          position: "right",
          className: "header-release-link",
          value:
            '<a href="https://github.com/ExpediaGroup/graphql-kotlin-codegen/releases/latest"><img alt="latest-release" src="https://img.shields.io/github/v/release/ExpediaGroup/graphql-kotlin-codegen"/></a>',
        },
        {
          href: "https://github.com/ExpediaGroup/graphql-kotlin-codegen",
          className: "header-github-link",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Expedia, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
