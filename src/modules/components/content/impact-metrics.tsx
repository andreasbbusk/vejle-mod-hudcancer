interface MetricProps {
  value: string;
  label: string;
  description?: string;
}

function Metric({ value, label, description }: MetricProps) {
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
        {value}
      </div>
      <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
      {description && (
        <div className="text-sm text-gray-600">{description}</div>
      )}
    </div>
  );
}

interface ImpactMetricsProps {
  className?: string;
}

export default function ImpactMetrics({ className }: ImpactMetricsProps) {
  const metrics = [
    {
      value: "3,4 mio. DKK",
      label: "Indsamlet siden 2017",
      description: "Donationer fra fællesskabet",
    },
    {
      value: "5",
      label: "Store projekter",
      description: "Finansieret til hudcancerforskning",
    },
    {
      value: "2017",
      label: "Grundlagt",
      description: "Kæmper mod hudcancer",
    },
    {
      value: "100%",
      label: "Gennemsigtighed",
      description: "Alle midler går til forskning",
    },
  ];

  return (
    <section className={`py-12 bg-gray-50 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Vores Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Siden 2017 har vi arbejdet målrettet for at bekæmpe hudcancer gennem
            forskning og oplysning
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <Metric
              key={index}
              value={metric.value}
              label={metric.label}
              description={metric.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
