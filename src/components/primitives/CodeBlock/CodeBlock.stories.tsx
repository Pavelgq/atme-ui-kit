import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";

const sampleCode = `const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShiki, {
    themes: { light: "github-light", dark: "github-dark" },
  })
  .use(rehypeStringify);`;

const meta: Meta<typeof CodeBlock> = {
  title: "Primitives/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    code: { control: "text" },
    lang: {
      control: "select",
      options: ["text", "typescript", "javascript", "css", "json", "html"],
    },
    filename: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    code: sampleCode,
    lang: "typescript",
  },
};

export const WithFilename: Story = {
  args: {
    code: sampleCode,
    lang: "typescript",
    filename: "markdownProcessor.ts",
  },
};

export const JSON: Story = {
  args: {
    code: `{
  "name": "@atme-lab/ui-kit",
  "version": "0.1.12",
  "type": "module"
}`,
    lang: "json",
  },
};

export const CSS: Story = {
  args: {
    code: `.article > * + * {
  margin-top: 1em;
}

.article .typography--body {
  line-height: var(--typography-line-height-relaxed);
}`,
    lang: "css",
    filename: "Article.module.pcss",
  },
};
