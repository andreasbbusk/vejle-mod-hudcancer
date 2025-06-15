import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekter - Vejle mod Hudcancer",
  description: "Se de projekter vi har finansieret og deres resultater",
};

export default function ProjekterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-vmh-light-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
