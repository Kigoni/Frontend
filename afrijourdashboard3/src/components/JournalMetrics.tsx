import { HelpCircle, TrendingUp, Award, Hash, Brain } from 'lucide-react';

interface MetricItemProps {
  label: string;
  value: number | string | null;
  description: string;
  icon: React.ComponentType<any>;
}

const MetricItem = ({ label, value, description, icon: Icon }: MetricItemProps) => {
  const displayValue = value === null || value === 'nan' ? (
    <HelpCircle className="w-6 h-6 text-amber-500" />
  ) : (
    <span className="text-2xl font-bold text-blue-600">
      {typeof value === 'number' ? value.toFixed(4) : value}
    </span>
  );

  return (
    <div className="bg-[#BFEFFF] rounded-xl p-6 shadow-lg transition-all hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-white p-3 shadow-md">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{label}</h3>
          <div className="mb-3">{displayValue}</div>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface JournalMetricsProps {
  metrics: {
    snip_metrix: number | null;
    impact_factor: number | null;
    h_index: number | null;
    eigen_metrix: string | null;
  };
}

export function JournalMetrics({ metrics }: JournalMetricsProps) {
  const metricItems = [
    {
      label: "SNIP",
      value: metrics.snip_metrix,
      description: "Source Normalized Impact per Paper",
      icon: TrendingUp
    },
    {
      label: "Impact Factor",
      value: metrics.impact_factor,
      description: "Journal Impact Factor Score",
      icon: Award
    },
    {
      label: "H-Index",
      value: metrics.h_index,
      description: "H-index Score",
      icon: Hash
    },
    {
      label: "Eigen Factor",
      value: metrics.eigen_metrix,
      description: "Eigen Factor Score",
      icon: Brain
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricItems.map((item, index) => (
        <MetricItem key={index} {...item} />
      ))}
    </div>
  );
}