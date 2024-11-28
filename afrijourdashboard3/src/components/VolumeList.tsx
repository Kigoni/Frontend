import { useState } from 'react';
import { Download, ChevronRight, ChevronDown } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  authors: string;
  pdf: string;
}

interface Volume {
  id: number;
  volume_number: number;
  issue_number: number;
  year: number;
  articles: Article[];
}

interface VolumeListProps {
  volumes: Volume[];
}

export function VolumeList({ volumes }: VolumeListProps) {
  const [expandedVolume, setExpandedVolume] = useState<number | null>(null);

  const handleDownload = async (pdf: string, title: string) => {
    try {
      const response = await fetch(`https://aphrc.site${pdf}`);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {volumes.map((volume) => (
        <div key={volume.id} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedVolume(expandedVolume === volume.id ? null : volume.id)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              {expandedVolume === volume.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <span className="font-medium">
                Volume {volume.volume_number} (Issue {volume.issue_number}, {volume.year})
              </span>
            </div>
            <span className="text-sm text-gray-500">{volume.articles.length} articles</span>
          </button>

          {expandedVolume === volume.id && (
            <div className="divide-y">
              {volume.articles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{article.authors}</p>
                    </div>
                    <button
                      onClick={() => handleDownload(article.pdf, article.title)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}