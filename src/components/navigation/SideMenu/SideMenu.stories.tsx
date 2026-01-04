import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SideMenu, type SideMenuItem } from "./SideMenu";

// Простые SVG иконки для демонстрации
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const TelegramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const defaultItems: SideMenuItem[] = [
  {
    title: "Github",
    path: "https://github.com",
    Icon: GithubIcon,
  },
  {
    title: "Twitter",
    path: "https://twitter.com",
    Icon: TwitterIcon,
  },
  {
    title: "Telegram",
    path: "https://t.me",
    Icon: TelegramIcon,
  },
  {
    title: "Email",
    path: "mailto:example@example.com",
    Icon: EmailIcon,
  },
];

const meta: Meta<typeof SideMenu> = {
  title: "Navigation/SideMenu",
  component: SideMenu,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Компонент SideMenu создает интерактивное меню с элементами, которые масштабируются при движении мыши. Поддерживает горизонтальную и вертикальную ориентацию, настраиваемые размеры и масштаб.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultItemSize: {
      control: { type: "number", min: 40, max: 120, step: 10 },
      description: "Базовый размер элементов в пикселях",
    },
    maxScale: {
      control: { type: "number", min: 1, max: 3, step: 0.1 },
      description: "Максимальный масштаб при наведении",
    },
    showTitles: {
      control: "boolean",
      description: "Показывать заголовки при наведении",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Ориентация меню",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const Horizontal: Story = {
  args: {
    items: defaultItems,
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "400px" }}
    >
      <SideMenu items={defaultItems} orientation="vertical" />
    </div>
  ),
};

export const WithoutTitles: Story = {
  args: {
    items: defaultItems,
    showTitles: false,
  },
};

export const CustomSize: Story = {
  args: {
    items: defaultItems,
    defaultItemSize: 100,
    maxScale: 2,
  },
};

export const WithInternalLinks: Story = {
  args: {
    items: [
      {
        title: "Настройки",
        path: "/settings",
        isOuterLink: false,
        Icon: SettingsIcon,
      },
      {
        title: "Загрузки",
        path: "/downloads",
        isOuterLink: false,
        Icon: DownloadIcon,
      },
      {
        title: "Github",
        path: "https://github.com",
        Icon: GithubIcon,
      },
    ],
    onItemClick: (item, index) => {
      console.log("Clicked:", item.title, "at index:", index);
      alert(`Клик по элементу: ${item.title}`);
    },
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...defaultItems,
      {
        title: "Настройки",
        path: "/settings",
        isOuterLink: false,
        Icon: SettingsIcon,
      },
      {
        title: "Загрузки",
        path: "/downloads",
        isOuterLink: false,
        Icon: DownloadIcon,
      },
    ],
  },
};

export const Playground: Story = {
  args: {
    items: defaultItems,
    defaultItemSize: 80,
    maxScale: 1.5,
    showTitles: true,
    orientation: "horizontal",
  },
};
