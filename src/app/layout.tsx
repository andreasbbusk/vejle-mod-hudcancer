import type { Metadata } from "next";
import "./globals.css";
import Header from "@/modules/components/layout/header/header";
import Footer from "@/modules/components/layout/footer/footer";
import { getLayoutData } from "@/modules/actions/actions";

export const metadata: Metadata = {
  title: "Vejle mod Hudcancer - Sammen bekæmper vi hudcancer",
  description:
    "Vejle mod Hudcancer er en non-profit forening, der siden 2017 har samlet fællesskabet om at finansiere forskning, øge oplysningen og støtte dem, der er ramt af hudcancer.",
  keywords: [
    "hudcancer",
    "forskning",
    "donation",
    "vejle",
    "non-profit",
    "støtte",
    "forebyggelse",
  ],
  authors: [{ name: "Vejle mod hudcancer" }],
  creator: "Vejle mod hudcancer",
  openGraph: {
    title: "Vejle mod hudcancer - Sammen bekæmper vi hudcancer",
    description:
      "Siden 2017 har vi indsamlet 3,4 millioner DKK til hudcancerforskning. 100% af donationer går til forskning - ingen administrationsfee.",
    type: "website",
    locale: "da_DK",
    siteName: "Vejle mod hudcancer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vejle mod hudcancer - Sammen bekæmper vi hudcancer",
    description:
      "Siden 2017 har vi indsamlet 3,4 millioner DKK til hudcancerforskning. 100% af donationer går til forskning - ingen administrationsfee.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { projects, galleries } = await getLayoutData();

  return (
    <html lang="da">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/jpp5tuy.css" />
      </head>
      <body className="antialiased min-h-screen bg-vmh-light-cream flex flex-col">
        <Header projects={projects} galleries={galleries} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
