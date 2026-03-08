import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { AntdFeedbackBridge } from "@/components/providers/AntdFeedbackBridge";
import { theme } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Admin Template",
  description:
    "A modern admin template built with Next.js, Ant Design, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <App>
              <AntdFeedbackBridge>{children}</AntdFeedbackBridge>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
