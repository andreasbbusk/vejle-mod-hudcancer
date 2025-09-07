import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvad er hudcancer - Vejle mod Hudcancer",
  description: "Lær om hudcancer, symptomer, forebyggelse og behandling",
};

export default function HvadErHudcancerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vmh-dark-gray mb-6">
        Hvad er hudcancer?
      </h1>
      <p className="text-vmh-gray mb-4">
        Få viden om hudcancer, dens årsager, symptomer og hvordan du kan
        forebygge det.
      </p>
      <p className="text-vmh-gray">
        Her finder du omfattende information om forskellige typer hudcancer og
        behandlingsmuligheder.
      </p>
    </div>
  );
}
