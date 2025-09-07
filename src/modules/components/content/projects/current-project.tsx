import Image from "next/image";
import Link from "next/link";
import type { ProjectHighlight } from "@/modules/types/sanity";

type CurrentProjectProps = {
  projectHighlights: ProjectHighlight[];
  className?: string;
};

export default function CurrentProject({
  projectHighlights,
  className,
}: CurrentProjectProps) {
  // Get the current year project or the latest one
  const currentYear = new Date().getFullYear().toString();
  const currentProject =
    projectHighlights.find((p) => p.projectYear === currentYear) ||
    projectHighlights[0];

  if (!currentProject) {
    return null;
  }
  return (
    <section className={`bg-[#fbf5eb] py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Project card */}
          <div className="relative">
            {/* Timeline indicator */}
            <div className="absolute -left-16 top-0 space-y-8">
              {projectHighlights
                .sort(
                  (a, b) => parseInt(b.projectYear) - parseInt(a.projectYear)
                )
                .map((highlight, index) => (
                  <div
                    key={highlight.projectYear}
                    className="flex items-center space-x-4"
                  >
                    <div
                      className={`${index === 0 ? "w-16 h-px bg-black" : "w-8 h-px bg-[#e0a619]"}`}
                    ></div>
                    <span
                      className={`${index === 0 ? "text-lg font-bold text-[#e0a619]" : "text-sm text-[#e0a619]"}`}
                    >
                      {highlight.projectYear}
                    </span>
                  </div>
                ))}
            </div>

            {/* Project card */}
            <div className="bg-white rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg">
              {/* Image placeholder - using front-hero.jpg as placeholder */}
              <div className="h-80 bg-gray-200 relative overflow-hidden">
                <Image
                  src="/front-hero.jpg"
                  alt={currentProject.titel}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card footer */}
              <div className="bg-[#fbf5eb] p-6">
                <h3 className="text-2xl font-normal text-black uppercase tracking-wide">
                  {currentProject.titel}
                </h3>
              </div>
            </div>
          </div>

          {/* Right side - Project details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-black uppercase tracking-wide">
                PROJEKT {currentProject.projectYear}
              </h2>
              <h3 className="text-2xl font-normal text-black tracking-wide">
                {currentProject.titel}
              </h3>
            </div>

            <p className="text-xl text-black leading-relaxed">
              {currentProject.beskrivelse}
            </p>

            <Link
              href={`/projects/${currentProject.slug.current}`}
              className="inline-block bg-black text-white px-8 py-3 text-lg font-bold tracking-wide hover:bg-gray-800 transition-colors"
            >
              LÆS MERE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
