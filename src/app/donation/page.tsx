import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation - Vejle mod Hudcancer",
  description: "Støt kampen mod hudcancer med en donation",
};

export default function DonationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vmh-dark-gray mb-6">Støt nu</h1>
      <p className="text-vmh-gray mb-4">
        Din donation gør en forskel i kampen mod hudcancer.
      </p>
      <p className="text-vmh-gray">
        Vælg mellem engangsdonation eller månedlig støtte til vores projekter.
      </p>
    </div>
  );
}
