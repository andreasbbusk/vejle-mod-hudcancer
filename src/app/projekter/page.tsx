import Breadcrumb from "@/modules/components/layout/navigation/breadcrumb";
import {
  ProjectsHero,
  ProjectsCharts,
  ProjectsCriteria,
  CurrentProject,
} from "@/modules/components/content/projects";
import { getMainProjectLanding } from "@/modules/actions/actions";
import type { ProjectLanding } from "@/modules/types/sanity";

export default async function ProjekterPage() {
  // Fetch data from Sanity
  const data: ProjectLanding | null = await getMainProjectLanding();

  // If no data is available, show error state
  if (!data) {
    return (
      <div className="bg-[#fbf5eb] min-h-screen">
        <div className="container mx-auto px-4 pt-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-black mb-4">
              Siden kunne ikke indlæses
            </h1>
            <p className="text-lg text-black">
              Der opstod en fejl ved indlæsning af projektdata. Prøv igen
              senere.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Breadcrumb */}
      <div>
        <Breadcrumb items={[{ label: data.title || "Projekter" }]} />
      </div>

      {/* Hero Section */}
      <ProjectsHero totalAmount={data.totalAmountRaised} />

      {/* Charts Section */}
      <ProjectsCharts charts={data.charts} />

      {/* Project Selection Criteria */}
      <ProjectsCriteria />

      {/* Current Project 2025 */}
      <CurrentProject projectHighlights={data.projectHighlights} />
    </main>
  );
}
