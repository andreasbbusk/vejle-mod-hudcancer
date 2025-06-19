import Breadcrumb from "@/modules/components/layout/navigation/breadcrumb";
import { getAllProjects } from "@/modules/actions/actions";
import Link from "next/link";

export default async function ProjekterPage() {
  const projects = await getAllProjects();
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Projekter" }]} />

      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Vores Projekter
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Siden 2017 har vi finansieret vigtige projekter i kampen mod
          hudcancer. Se hvordan dine donationer gør en forskel.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">3,4 mio. DKK</div>
            <div className="text-gray-600">Indsamlet siden 2017</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">5</div>
            <div className="text-gray-600">Store projekter finansieret</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">100%</div>
            <div className="text-gray-600">Gennemsigtighed</div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projekter/${project.slug.current}`}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 block"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-vmh-gold transition-colors">
                  {project.title}
                </h3>
                <span
                  className={`text-sm font-medium px-2.5 py-0.5 rounded ${getStatusColor(project.status)}`}
                >
                  {formatStatus(project.status)}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {project.status === "completed" || project.status === "funded"
                    ? `Finansieret: ${project.amountRaised.toLocaleString("da-DK")} DKK`
                    : `Indsamlet: ${project.amountRaised.toLocaleString("da-DK")} / ${project.fundingGoal.toLocaleString("da-DK")} DKK`}
                </span>
                <span>
                  {new Date(project.publishedAt).toLocaleDateString("da-DK")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">Ingen projekter tilgængelige endnu.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Hjælp os med at finansiere flere projekter
        </h2>
        <p className="text-gray-600 mb-4">
          Din donation går direkte til konkrete projekter i kampen mod
          hudcancer.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Donér nu
        </button>
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
