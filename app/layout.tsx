import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "费用Dashboard - 其他应付款账龄分析",
  description: "基于凭证日期的其他应付款账龄分析Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
