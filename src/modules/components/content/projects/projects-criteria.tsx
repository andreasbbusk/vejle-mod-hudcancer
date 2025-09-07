import Image from "next/image";

type ProjectsCriteriaProps = {
  className?: string;
};

const criteria = [
  {
    title: "FOREBYGGELSE & BEHANDLING",
    description:
      "Projektet skal styrke det samlede kræftcenter i Vejle ved at fremme og forbedre forebyggelse og behandlingsmulighederne inden for hudkræft. Gennem oplysning og tidlig opdagelse kan risikoen for alvorlige tilfælde reduceres.",
    icon: "/icons/target-hit.svg",
  },
  {
    title: "MÅLBARHED",
    description:
      "For at sikre projektets succes er det afgørende at opstille konkrete resultater der kan vise effekten af indsatsen. Projekterne skal samtidig bidrage til at øge kendskabet til hudcancer i Region Syddanmark, dette gør det muligt at vurdere projekternes indflydelse og justere indsatsen løbende.",
    icon: "/icons/bar-chart.svg",
  },
  {
    title: "LOKAL FORANKRING",
    description:
      "Projektet skal styrke samarbejdet mellem sundhedspersonale og borgere i Region Syddanmark ved at skabe en tættere dialog og øget tillid mellem parterne.",
    icon: "/icons/vmh-local.svg",
  },
  {
    title: "SAMARBEJDE",
    description:
      "Projekterne skal fremme et tæt samarbejde mellem sundhedspersonalet, borgerene og lokale midler i Region Syddanmark. Ved at inddrage forskellige interessenter skabes der en fælles indsats for at øge opmærksomheden omkring hudcancer.",
    icon: "/icons/puzzle.svg",
  },
];

export default function ProjectsCriteria({ className }: ProjectsCriteriaProps) {
  return (
    <section className={`bg-white py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Sticky title */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold text-black uppercase tracking-wide">
                HVORDAN VÆLGER VI STØTTESAGER?
              </h2>
              <div className="h-px w-40 bg-black"></div>
              <p className="text-xl text-black leading-relaxed">
                Der er et sæt kriterier for udvælgelsen af nye projekter
              </p>
            </div>
          </div>

          {/* Right side - Criteria list */}
          <div className="space-y-16">
            {criteria.map((criterion, index) => (
              <div key={criterion.title} className="relative">
                <div className="flex items-start space-x-8">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center">
                    <Image
                      src={criterion.icon}
                      alt={criterion.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-normal text-black uppercase tracking-wide">
                      {criterion.title}
                    </h3>
                    <p className="text-xl text-black leading-relaxed">
                      {criterion.description}
                    </p>
                  </div>
                </div>

                {/* Divider line (except for last item) */}
                {index < criteria.length - 1 && (
                  <div className="mt-12 h-px w-full bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
