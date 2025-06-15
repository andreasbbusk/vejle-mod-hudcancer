import Link from "next/link";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand and mission */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">VMH</span>
              </div>
              <h3 className="text-lg font-bold">Vejle mod Hudcancer</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Siden 2017 har vi samlet fællesskabet om at bekæmpe hudcancer
              gennem forskning, oplysning og støtte. 100% af donationer går til
              forskning.
            </p>
            <div className="text-sm text-gray-400">
              <p>CVR: 123456789</p>
              <p>Registreret non-profit forening</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hurtige Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/donation"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Donér Nu
                </Link>
              </li>
              <li>
                <Link
                  href="/projekter"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Vores Projekter
                </Link>
              </li>
              <li>
                <Link
                  href="/om-hudcancer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Om Hudcancer
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/om-os"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Om Os
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-gray-300">
              <p>Email: kontakt@vejlemodhudcancer.dk</p>
              <p>Tlf: +45 12 34 56 78</p>
              <div className="mt-4">
                <p className="text-sm text-gray-400">
                  Følg os på sociale medier:
                </p>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L6.17 14.643c.636.749 1.568 1.217 2.602 1.217c1.297 0 2.337-.749 2.337-2.22V8.449h1.568v5.192c-.001 2.219-1.568 3.347-3.228 3.347z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Vejle mod Hudcancer. Alle rettigheder forbeholdes.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privatlivspolitik"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privatlivspolitik
            </Link>
            <Link
              href="/handelsbetingelser"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Handelsbetingelser
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
