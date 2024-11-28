import { Check, X, HelpCircle } from 'lucide-react';

interface MetadataItemProps {
  label: string;
  value: boolean | undefined;
  description: string;
}

const MetadataItem = ({ label, value, description }: MetadataItemProps) => {
  const Icon = value === true ? Check : value === false ? X : HelpCircle;
  const color = value === true ? "text-green-500" : value === false ? "text-red-500" : "text-amber-500";
  const bgColor = value === true ? "bg-green-50" : value === false ? "bg-red-50" : "bg-amber-50";
  
  return (
    <div className={`${bgColor} rounded-lg p-4 transition-all hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`${color} bg-white rounded-full p-2 shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-medium text-gray-900">{label}</h3>
      </div>
      <p className="text-sm text-gray-600 ml-12">{description}</p>
    </div>
  );
};

interface JournalMetadataProps {
  metadata: {
    open_access_journal?: boolean;
    listed_in_doaj?: boolean;
    publisher_in_cope?: boolean;
    present_issn?: boolean;
    online_publisher_africa?: boolean;
    google_scholar_index?: boolean;
    sjr?: boolean;
    eigen_factor?: boolean;
    snip?: boolean;
    hosted_on_inasps?: boolean;
    aim_identifier?: boolean;
    medline?: boolean;
  };
}

export function JournalMetadata({ metadata }: JournalMetadataProps) {
  const metadataItems = [
    {
      label: "Open Access Journal",
      value: metadata.open_access_journal,
      description: "Journal content is freely available to read"
    },
    {
      label: "Listed in DOAJ",
      value: metadata.listed_in_doaj,
      description: "Present in Directory of Open Access Journals"
    },
    {
      label: "COPE Member",
      value: metadata.publisher_in_cope,
      description: "Publisher follows Committee on Publication Ethics guidelines"
    },
    {
      label: "ISSN Registered",
      value: metadata.present_issn,
      description: "Has International Standard Serial Number"
    },
    {
      label: "African Publisher",
      value: metadata.online_publisher_africa,
      description: "Publisher is based in Africa"
    },
    {
      label: "Google Scholar Indexed",
      value: metadata.google_scholar_index,
      description: "Indexed in Google Scholar"
    },
    {
      label: "Scopus SJR",
      value: metadata.sjr,
      description: "Listed in Scimago Journal & Country Rank"
    },
    {
      label: "Eigen Factor",
      value: metadata.eigen_factor,
      description: "Has Eigen Factor score"
    },
    {
      label: "SNIP",
      value: metadata.snip,
      description: "Has Source Normalized Impact per Paper"
    },
    {
      label: "INASP Journal",
      value: metadata.hosted_on_inasps,
      description: "Hosted on INASP's Journal platform"
    },
    {
      label: "AIM Listed",
      value: metadata.aim_identifier,
      description: "Listed in African Index Medicus"
    },
    {
      label: "Medline Indexed",
      value: metadata.medline,
      description: "Indexed in Medline database"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metadataItems.map((item, index) => (
        <MetadataItem key={index} {...item} />
      ))}
    </div>
  );
}