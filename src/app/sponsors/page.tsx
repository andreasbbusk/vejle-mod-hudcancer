import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor - Vejle mod Hudcancer",
  description: "Bliv sponsor og støt kampen mod hudcancer",
};

export default function SponsorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vmh-dark-gray mb-6">Sponsor</h1>
      <p className="text-vmh-gray mb-4">
        Bliv en del af kampen mod hudcancer ved at blive sponsor.
      </p>
      <p className="text-vmh-gray">
        Vi tilbyder forskellige sponsorpakker til virksomheder og
        organisationer.
      </p>
    </div>
  );
}
