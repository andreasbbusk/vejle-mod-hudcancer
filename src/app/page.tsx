import HeroSection from "@/modules/components/content/hero-section";
import ImpactMetrics from "@/modules/components/content/impact-metrics";
import Link from "next/link";
import { Button } from "@/modules/components/ui/button";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Impact Metrics */}
      <ImpactMetrics />

      {/* Mission & Values Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Vores Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Vi arbejder for en fremtid uden hudcancer gennem målrettet
                forskning, forebyggelse og støtte til dem, der er berørt.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Research */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Forskning
                </h3>
                <p className="text-gray-600">
                  Vi finansierer banebrydende forskning, der kan føre til bedre
                  behandlinger og forhåbentlig en kur mod hudcancer.
                </p>
              </div>

              {/* Education */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Oplysning
                </h3>
                <p className="text-gray-600">
                  Vi spreder viden om forebyggelse, tidlig opdagelse og
                  behandling af hudcancer i vores lokalsamfund.
                </p>
              </div>

              {/* Support */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Støtte</h3>
                <p className="text-gray-600">
                  Vi skaber et fællesskab, hvor patienter, pårørende og støtter
                  kan få hjælp og støtte hinanden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Projekter Vi Har Finansieret
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Se hvordan dine donationer gør en reel forskel i kampen mod
              hudcancer. Hvert projekt er omhyggeligt udvalgt for at maksimere
              impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Example project 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    Finansieret
                  </span>
                  <span className="text-sm text-gray-500">750.000 DKK</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Immunterapi Forskning
                </h3>
                <p className="text-gray-600 mb-4">
                  Forskning i nye immunterapi behandlinger for patienter med
                  fremskreden melanom. Projektet har allerede vist lovende
                  resultater.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Afsluttet 2023
                </div>
              </div>
            </div>

            {/* Example project 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    I gang
                  </span>
                  <span className="text-sm text-gray-500">500.000 DKK</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Tidlig Diagnosticering
                </h3>
                <p className="text-gray-600 mb-4">
                  Udvikling af AI-baserede værktøjer til tidligere og mere
                  præcis diagnosticering af hudcancer gennem billedanalyse.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Forventes afsluttet 2024
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/projekter">
              <Button variant="outline" size="lg">
                Se Alle Projekter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Gør En Forskel I Dag
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Din donation går 100% til forskning. Sammen kan vi bekæmpe
              hudcancer og redde liv. Hver krone tæller.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/donation">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100"
                >
                  Donér Nu
                </Button>
              </Link>
              <Link href="/om-os">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Lær Mere Om Os
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
