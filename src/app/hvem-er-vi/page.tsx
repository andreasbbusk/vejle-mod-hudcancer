import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvem er vi - Vejle mod Hudcancer",
  description: "Lær om Vejle mod Hudcancer og vores mission",
};

export default function HvemErViPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vmh-dark-gray mb-6">
        Hvem er vi?
      </h1>
      <p className="text-vmh-gray mb-4">
        Vejle mod Hudcancer er en dansk non-profit organisation, der kæmper mod
        hudcancer siden 2017.
      </p>
      <p className="text-vmh-gray">
        Læs om vores mission, vision, værdier og det team, der står bag
        organisationen.
      </p>
    </div>
  );
}
