import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events - Vejle mod Hudcancer",
  description: "Kommende events og arrangementer fra Vejle mod Hudcancer",
};

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vmh-dark-gray mb-6">Events</h1>
      <p className="text-vmh-gray mb-4">
        Her finder du information om vores kommende events og arrangementer.
      </p>
      <p className="text-vmh-gray">
        Følg med for opdateringer om vores årlige gala og torvearrangementer.
      </p>
    </div>
  );
}
