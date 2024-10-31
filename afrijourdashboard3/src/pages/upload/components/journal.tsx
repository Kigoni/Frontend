import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Define types for the journal data structure
interface Language {
  id: number;
  language: string;
  created_at: string;
}

interface ThematicArea {
  id: number;
  thematic_area: string;
  created_at: string;
}

interface Journal {
  id: number;
  language: Language | null;
  platform: string | null;
  country: string | null;
  thematic_area: ThematicArea | null;
  volumes: Array<any>;
  image: string | null;
  journal_title: string;
  publishers_name: string;
  issn_number: string;
  link: string;
  aim_identifier: boolean;
  medline: boolean;
  google_scholar_index: string | null;
  impact_factor: number | null;
  sjr: number | null;
  h_index: number | null;
  eigen_factor: number | null;
  eigen_metrix: number | null;
  snip: number | null;
  snip_metrix: number | null;
  open_access_journal: boolean | null;
  listed_in_doaj: boolean | null;
  present_issn: string | null;
  publisher_in_cope: boolean | null;
  online_publisher_africa: boolean | null;
  hosted_on_inasps: boolean | null;
  summary: string;
  user: number;
}
// Define a type for auth tokens
interface AuthTokens {
    access: string;
    refresh: string;
  }

const Journals: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([]);

// Function to get the auth tokens from local storage
    const getAuthTokens = (): AuthTokens | null => {
        const tokens = localStorage.getItem('authTokens'); // Adjust the key based on your implementation
        return tokens ? JSON.parse(tokens) : null;
    };

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const authTokens = getAuthTokens();
        const token = authTokens?.access;
        //const token = "YOUR_ACCESS_TOKEN"; // Replace with the actual token retrieval function if dynamic
        const response = await fetch('https://aphrc.site/journal_api/user/journals/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data: Journal[] = await response.json();
          setJournals(data);
          console.log(data)
        } else {
          console.error('Failed to fetch journals', response.status);
        }
      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {journals.map((journal) => (
        <Card key={journal.id} className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>{journal.journal_title}</CardTitle>
            <CardDescription>
              Language: {journal.language ? journal.language.language : 'Not specified'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Thematic Area:</strong> {journal.thematic_area ? journal.thematic_area.thematic_area : 'Not specified'}</p>
            <p><strong>Publisher:</strong> {journal.publishers_name || 'Not specified'}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Journals;
