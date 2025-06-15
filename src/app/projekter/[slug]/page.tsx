import { notFound } from "next/navigation";
import { getProject, getProjectSlugs } from "@/modules/actions/actions";
import Breadcrumb from "@/modules/components/layout/breadcrumb";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const fundingPercentage = project.fundingGoal
    ? Math.round((project.amountRaised / project.fundingGoal) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Projekter", href: "/projekter" },
          { label: project.title },
        ]}
      />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
          >
            {formatStatus(project.status)}
          </span>
        </div>
        <p className="text-xl text-gray-600">{project.description}</p>
      </div>

      {/* Funding Progress */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Finansiering</h3>
            <span className="text-sm text-gray-500">
              {fundingPercentage}% finansieret
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Indsamlet: {project.amountRaised.toLocaleString("da-DK")} DKK
            </span>
            <span className="text-gray-600">
              Mål: {project.fundingGoal.toLocaleString("da-DK")} DKK
            </span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Project Results */}
          {project.results && project.results.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Projektresultater</h3>
              <div className="prose max-w-none">
                {/* This would render portable text - for now just show as text */}
                <p className="text-gray-600">
                  Resultater vil blive vist her når projektet er afsluttet.
                </p>
              </div>
            </div>
          )}

          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Billeder</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Billede {index + 1}</span>
                    </div>
                    {image.caption && (
                      <p className="text-sm text-gray-600">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Projektinfo</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Status</span>
                <p className="font-medium">{formatStatus(project.status)}</p>
              </div>

              {project.startDate && (
                <div>
                  <span className="text-sm text-gray-500">Startdato</span>
                  <p className="font-medium">
                    {new Date(project.startDate).toLocaleDateString("da-DK")}
                  </p>
                </div>
              )}

              {project.completionDate && (
                <div>
                  <span className="text-sm text-gray-500">Afslutningsdato</span>
                  <p className="font-medium">
                    {new Date(project.completionDate).toLocaleDateString(
                      "da-DK"
                    )}
                  </p>
                </div>
              )}

              <div>
                <span className="text-sm text-gray-500">Publiceret</span>
                <p className="font-medium">
                  {new Date(project.publishedAt).toLocaleDateString("da-DK")}
                </p>
              </div>
            </div>
          </div>

          {/* Donation CTA */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Støt dette projekt</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Din donation hjælper os med at nå målet og gøre en forskel.
            </p>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Donér nu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    planning: "Planlagt",
    fundraising: "Aktivt fundraising",
    funded: "Finansieret",
    "in-progress": "I gang",
    completed: "Afsluttet",
    "on-hold": "På hold",
  };
  return statusMap[status] || status;
}

function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    planning: "bg-yellow-100 text-yellow-800",
    fundraising: "bg-blue-100 text-blue-800",
    funded: "bg-purple-100 text-purple-800",
    "in-progress": "bg-indigo-100 text-indigo-800",
    completed: "bg-green-100 text-green-800",
    "on-hold": "bg-gray-100 text-gray-800",
  };
  return colorMap[status] || "bg-gray-100 text-gray-800";
}
