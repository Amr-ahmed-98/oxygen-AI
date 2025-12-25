"use client";

import { ConfigProvider } from "antd";
import { createAntdTheme } from "@atomic-ai/ui-antd/theme";
import "@atomic-ai/tokens/css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createAntdTheme({ persona: "enterprise", rtl: false });

  return (
    <html lang="en">
      <head>
        <title>Atomic AI Playground</title>
        <meta name="description" content="Playground for Atomic AI UI components" />
      </head>
      <body>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}

