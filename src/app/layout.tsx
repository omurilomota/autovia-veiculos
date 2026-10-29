import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Via Veículos — Seminovos em Junqueirópolis/SP",
  description:
    "Há 19 anos em Junqueirópolis. Seminovos com procedência conferida, preço na etiqueta, financiamento facilitado e seu usado na troca. Negocie direto no WhatsApp.",
  openGraph: {
    title: "Auto Via Veículos — Seu próximo carro já está no pátio",
    description:
      "Seminovos com procedência em Junqueirópolis/SP. Financiamento e troca. Rua das Acácias, 100.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
