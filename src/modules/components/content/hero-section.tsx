import Link from "next/link";
import { Button } from "../ui/button";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={`bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24 ${
        className || ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Sammen Bekæmper Vi <span className="text-blue-600">Hudcancer</span>
          </h1>

          {/* Mission statement */}
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Vejle mod Hudcancer er en non-profit forening, der siden 2017 har
            samlet fællesskabet om at finansiere forskning, øge oplysningen og
            støtte dem, der er ramt af hudcancer.
          </p>

          {/* Key value proposition */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-4">
              <strong className="text-gray-900">100% af dine donationer</strong>{" "}
              går direkte til hudcancerforskning. Vi tror på fuldstændig
              gennemsigtighed i alt hvad vi gør.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Ingen administrationsfee
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Fuld gennemsigtighed
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/donation">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                Donér Nu
              </Button>
            </Link>
            <Link href="/projekter">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg"
              >
                Se Vores Projekter
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Siden 2017 har vi opnået:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm font-medium text-gray-700">
              <span>🎯 3,4 millioner DKK indsamlet</span>
              <span>🔬 5 store forskningsprojekter finansieret</span>
              <span>👥 Tusindvis af støtter i fællesskabet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
