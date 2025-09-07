import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Text content column */}
          <div className="order-2 lg:order-1">
            {/* Main headline */}
            <h1 className="text-4xl lg:text-5xl font-medium mb-6 font-adelle tracking-wide">
              <span className="font-bold">VEJLE MOD HUDCANCER</span> STØTTER
              KAMPEN MOD HUDCANCER
            </h1>

            {/* Divider */}
            <div className="w-48 h-0.5 bg-vmh-gold mb-8"></div>

            {/* Subtext */}
            <p className="text-lg leading-relaxed text-gray-700 max-w-2xl">
              Vejle mod hudcancer støtter hvert år et nyt lokalt projekt i
              kampen mod hudcancer. Alle midler indsamles gennem lokale
              sponsorer i det Vejlensiske erhvervsliv og alle opgaver udføres
              frivilligt, så det indsamlede beløb går ubeskåret til projektet.
              Vores støtte er til gavn for det samlede kræftcenter i Vejle.
            </p>
          </div>

          {/* Image column */}
          <div className="order-1 lg:order-2">
            <Image
              src="/front-hero.jpg"
              alt="Hero Section Image"
              width={1000}
              height={1000}
              className="w-full rounded-tl-lg rounded-br-lg shadow-md object-cover translate-y-6"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 px-6 py-6 md:px-12 md:py-16 lg:px-16 lg:py-24">
          {/* Statistic 1 */}
          <div className="text-center">
            <div className="text-6xl lg:text-7xl font-adelle text-vmh-gold mb-4">
              50%
            </div>
            <p className="text-sm lg:text-base font-medium text-gray-800 uppercase tracking-wide leading-tight font-adelle">
              AF ALLE NYE KRÆFTTILFÆLDE
              <br />I DANMARK ER HUDCANCER
            </p>
          </div>

          {/* Statistic 2 */}
          <div className="text-center">
            <div className="text-6xl lg:text-7xl font-adelle text-vmh-gold mb-4">
              20.000
            </div>
            <p className="text-sm lg:text-base font-medium text-gray-800 uppercase tracking-wide leading-tight font-adelle">
              BLIVER DIAGNOSTISERET
              <br />
              MED HUDCANCER HVERT ÅR
            </p>
          </div>

          {/* Statistic 3 */}
          <div className="text-center">
            <div className="text-6xl lg:text-7xl font-adelle text-vmh-gold mb-4">
              +75%
            </div>
            <p className="text-sm lg:text-base font-medium text-gray-800 uppercase tracking-wide leading-tight font-adelle">
              RISIKO FOR UDVIKLINGEN AF
              <br />
              HUDCANCER EFTER BRUG AF SOLARIE
            </p>
          </div>
        </div>

        {/* Source citation */}
        <div className="mt-12 text-right">
          <p className="text-sm text-gray-500">
            Kilde: <span className="text-vmh-gold">Kræftens bekæmpelse</span> &{" "}
            <span className="text-vmh-gold">Netdoktor.dk</span>
          </p>
        </div>
      </div>
    </section>
  );
}
