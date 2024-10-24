

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent} from '@/components/ui/card'
import { Layout } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { IconDownload } from '@tabler/icons-react'; // Import the download icon
// interface Volume {
//   volume_number: number;
//   articles: { title: string; }[];
// }

// interface Journal {
//   journal_title?: string;
//   summary?: string; // Add the summary property
//   // Add other properties as needed
//   link?: string;
//  }

// interface Volume {
//   volume_number: number;
//   articles: { title: string }[];
// }

interface Article {
  id: number;
  title: string;
  authors: string; // Assuming authors is a string
  keywords: string;
  pdf: string;
  publication_date: string;
}
interface Volume {
  id: number;
  volume_number: number;
  created_at: string;
  issue_number:number;
  year:number;
  articles: Article[];
}
interface Journal {
  journal_title?: string;
  summary?: string;
  link?: string;
  volumes?: Volume[];
  image?: {
    id: number;
    image: string;
    description: string;
    uploaded_at: string;
  };
  
}

export default function JournalDetail() {
    const { journalId } = useParams() // This retrieves the journalId from the URL
    //const [journal, setJournal] = useState(null)
    const [expandedVolume, setExpandedVolume] = useState<number | null>(null)

    
  const [journal, setJournal] = useState<Journal | null>(null);
    //const [journal, setJournal] = useState<{ journal_title?: string } | null>(null); // Inline type for journal
 
    useEffect(() => {
    // Fetch the specific journal data using the journalId
    const fetchJournal = async () => {
      const response = await fetch(`https://aphrc.site/journal_api/api/journals/${journalId}/`)
      const data = await response.json()
      setJournal(data)
      console.log(data.journal_title )
      console.log(data)
      // Use to generate a description
      //console.log(description)
      //await generateDescription(data.journal_title)
      //console.log(data.language)
      //console.log(journal)
    } 
    fetchJournal()
    }, [journalId])

  if (!journal) return (
    <div className="flex justify-center items-center h-screen">
        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping">
        </div>
    </div>
    )
  // Split the link string into an array of URLs
  const links = journal.link ? journal.link.split(', ') : [];

  const handleToggleVolume = (volumeNumber: number) => {
    setExpandedVolume(expandedVolume === volumeNumber ? null : volumeNumber)
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search />
          <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
       
        <div className='space-y-4'>
                    <ScrollArea className='h-[1200px]'>
                    <Card  className='mb-4'>
                    <CardContent className='pt-6'>
                    {journal.image ? (
                  <img 
                    src={`https://aphrc.site${journal.image.image}`} 
                    alt={journal.image.description || "Image"} 
                    className="w-48 h-auto" 
                   />
                   ) : null} {/* Render nothing if the image is unavailable */}
                    <h2 className='mb-2 text-lg font-semibold text-blue-800'>
                        {journal.journal_title ? journal.journal_title:"journal title unspecified"}
                    </h2>
                    
                    <p className='mb-2 text-sm'>
                        {journal ? journal.summary:<div role="status">
                                                      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                      </svg>
                                                    <span className="sr-only">Loading...</span>
                                                    </div>}
                    </p>
                    
                  
                   <h3 className="text-lg font-bold mt-6">Volumes and Articles</h3>
               
{(journal.volumes || []).length > 0 ? (
  (journal.volumes || []).map((volume) => (
    <div key={volume.volume_number} className="my-4">
      <h4
        className="text-md font-semibold cursor-pointer text-blue-600 hover:underline"
        onClick={() => handleToggleVolume(volume.volume_number)}
      >
        Volume {volume.volume_number}(No. {volume.issue_number},Year. {volume.year})
      </h4>
      
      {expandedVolume === volume.volume_number && (
        <ul className="pl-4">
          <h2 className='text-md font-semibold  text-blue-600 '>Articles</h2>
          {volume.articles.length > 0 ? (
            volume.articles.map((article, index) => (
              <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm mb-2 border-b border-gray-300 last:border-b-0">
                <div className="flex-grow">
                  <h1 className="font-semibold">{article.title}</h1>
                  <h2 className="text-gray-600">{article.authors}</h2>
                </div>
                <IconDownload 
                  className="text-blue-600 hover:text-blue-800 cursor-pointer mt-2 sm:mt-0 sm:ml-4"
                  onClick={async () => {
                    try {
                      const response = await fetch(`https://aphrc.site${article.pdf}`);
                      if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', article.title || 'article.pdf');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error('Error downloading the PDF:', error);
                    }
                  }}
                />
              </li>
            ))
          ) : (
            <li className="text-sm">No articles available</li>
          )}
        </ul>
      )}
    </div>
  ))
) : (
  <p className="text-sm text-gray-600">No volumes and articles available</p>
)}

 <h3 className="text-lg font-bold mt-6">Official Websites</h3>
 <p>
                      {links.map((link, index) => {
                        // Extract domain name to use as the tag label
                        const label = new URL(link).hostname.replace('www.', '');

                        return (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-200 transition duration-200 mr-2 mb-2"
                          >
                            {label}
                          </a>
                        );
                      })}
                   </p>
                  </CardContent>
                    </Card>
                    </ScrollArea>
        </div>
        
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Back ',
    href: '/',
    isActive: true,
  },
]
