//@ts-ignore
 //@ts-nocheck
import { Layout } from '@/components/custom/layout'
//import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState, useEffect } from 'react'

export default function Home() {
  const [results,setResults]=useState(0)
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [journals, setJournals] = useState([]);
  const pageSize = 10; 
  const [numberJournals,setNumberJournals]=useState(0);
 // const[journalDescription,setJournalDescription]=useState('We investigated the effects of junction curvature on adhesion in groups of orange sclerocytes, a type of cell found in the lens of the eye. We found that cells in curved junctions adhered more strongly than cells in straight junctions. This was due to a number of factors, including the increased tension in curved junctions and thepresence of a protein called talin, which isinvolved in cell adhesion. Our results suggest that junction curvature plays an important role in the organization and function of tissues.')
  const [descriptions, setDescriptions] = useState({});
  const [filters, setFilters] = useState({
    Present_on_ISSN: null,
    african_index_medicus: null,
    directory_of_african_journals: null,
    hosted_on_INASPS: null,
    indexed_on_google_scholar: null,
    member_of_Committee_on_publication_Ethics: null,
    online_publisher_in_africa: null,
    open_access_journal: null,
  });
//http://198.211.110.243/journal_api/journals/search/
  const baseUrl = "https://aphrc.site/journal_api/journals/search/";

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };


  const generateUrl = () => {
    const queryParams = Object.entries(filters)
      .filter(([key, value]) => value !== null) // Only include non-null values
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const query = searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : "";
    const page = `&page=${currentPage}`;
    const pageSizeParam = `&page_size=${pageSize}`;

    return `${baseUrl}?${queryParams}${query}${page}${pageSizeParam}`;
  };

  // Function to call the description API
  const fetchDescription = async (journalText, index) => {
    try {
      const response = await fetch('https://aphrc.site/journal_api/generate-description/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          journal_text: journalText
        })
      });
      if (response.ok) {
        const data = await response.json();
        setDescriptions(prev => ({ ...prev, [index]: data.description }));
      } else {
        console.error("Error fetching description:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch description:", error);
    }
  };

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        //generated dynamic url for search filters
        const url = generateUrl();
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data.results);
        //console.log(url)
        console.log(data.results)
        setJournals(data.results);
        setTotalPages(Math.ceil(data.count / pageSize)); // Calculate total pages
        setResults(data.count)
        setNumberJournals(data.count)
        //console.log(results)
        // Fetch descriptions for each journal
        data.results.forEach((journal, i) => {
          const journalText = journal.journal_title ? journal.journal_title : "Journal title unspecified";
          fetchDescription(journalText, i);  // Fetch description and store in state
        });
      } catch (error) {
        
        window.location.reload();
        //setError(`Failed to fetch Journals: ${error.message}`);
        //fetchArticles()
      } finally {
        //setLoading(false);
      }
    };

    fetchJournals();
  }, [currentPage, searchQuery,filters]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when performing a new search
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    // console.log(currentPage)
    // console.log( totalPages)
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          {/* <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='flex min-h-screen flex-col '>
          <header className='flex items-center justify-between bg-primary  text-primary-foreground'></header>
          <main className='flex-grow'>
            <section className='bg-primary px-4 py-20 text-center text-white'>
              <h1 className='mb-4 text-4xl font-bold'>
                Browse our journals that are just right for you
              </h1>
              <p className='mb-8'>
                Choose from over {numberJournals} journals and learning paths, with dozens
                added every week. Top it off with courses that round out your
                skills and enrich your day-to-day.
              </p>
              <div className='relative mx-auto max-w-2xl'>
                <Input
                  className='w-full rounded-full px-8 py-8'
                  placeholder='Search Article'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type='text'
                />
                <Button
                  className='absolute right-5 top-3 rounded-full'
                  size='icon'
                  variant={'ghost'}
                  onClick={handleSearch}
                >
                  <Search className='h-8 w-8' />
                  <span className='sr-only'>Search</span>
                </Button>
              </div>
            </section>
            <section className='px-4 py-12'>
              <div className='mx-auto max-w-6xl'>
                <div className='mb-8 flex items-center justify-between'>
                  <p>{results} results</p>
                  <div className='flex items-center space-x-2'>
                    <Select>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Sort by' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='best-match'>Best match</SelectItem>
                        <SelectItem value='most-recent'>Most recent</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant='outline' size='icon' onClick={handlePreviousPage} disabled={currentPage === 1}>
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button variant='outline' size='icon' onClick={handleNextPage} disabled={currentPage === totalPages}>
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
                <div className='grid gap-8  md:grid-cols-[250px_1fr]'>
                  <aside className='space-y-5'>
                    <Card>
                      <CardHeader>
                        <CardTitle>Filters</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-4'>
                          <div>
                            <h3 className='mb-2 font-semibold'>
                              Articles Hosted
                            </h3>
                            <div className='space-y-2'>
                              <div className='flex items-center'>
                                <Checkbox id='abstract' checked={filters.online_publisher_in_africa === true}
          onCheckedChange={(checked) => handleCheckboxChange('online_publisher_in_africa', checked)} />
                                <label htmlFor='abstract' className='ml-2'>
                                  Publisher is in Africa
                                </label>
                              </div>
                              <div className='flex items-center'>
                                <Checkbox id='fulltext' checked={filters.hosted_on_INASPS === true}
          onCheckedChange={(checked) => handleCheckboxChange('hosted_on_INASPS', checked)}/>
                                <label htmlFor='fulltext' className='ml-2'>
                                Hosted on INASP'S Journal online
                                </label>
                              </div>
                              <div className='flex items-center'>
                                <Checkbox id='fulltext' checked={filters.directory_of_african_journals === true}
          onCheckedChange={(checked) => handleCheckboxChange('directory_of_african_journals', checked)} />
                                <label htmlFor='fulltext' className='ml-2'>
                                Journal listed in the Directory of Open Access (DOAJ)
                                </label>
                              </div>
                              <div className='flex items-center'>
                                <Checkbox id='fulltext'  checked={filters.african_index_medicus === true}
          onCheckedChange={(checked) => handleCheckboxChange('african_index_medicus', checked)}/>
                                <label htmlFor='fulltext' className='ml-2'>
                                African Index Medicus
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className='mb-2 font-semibold'>
                              Indexed
                            </h3>
                            <div className='space-y-2'>
                              <div className='flex items-center'>
                                <Checkbox id='1year' checked={filters.indexed_on_google_scholar === true}
          onCheckedChange={(checked) => handleCheckboxChange('indexed_on_google_scholar', checked)}/>
                                <label htmlFor='1year' className='ml-2'>
                                  Google Scholar
                                </label>
                              </div>
                              <div className='flex items-center'>
                                <Checkbox id='5years' checked={filters.member_of_Committee_on_publication_Ethics === true}
          onCheckedChange={(checked) => handleCheckboxChange('member_of_Committee_on_publication_Ethics', checked)}/>
                                <label htmlFor='5years' className='ml-2'>
                                  Member of C.O.P.E
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                  </aside>
                  <div className='space-y-4'>
                    <ScrollArea className='h-[1200px]'>
                      {journals.map((journal, i) => (
                        <Card key={i} className='mb-4'>
                          <CardContent className='pt-6'>
                            
                            <h2 className='mb-2 text-lg font-semibold text-blue-800'>
                            {journal.journal_title ? journal.journal_title:"journal title unspecified"}
                            </h2>
                            <p className='mb-2 text-sm text-gray-600'>
                            {journal.publishers_name?journal.publishers_name:"publisher unspecified"}
                            </p>
                            <p className='mb-2 text-sm text-green-800'>
                            
                            {journal.thematic_area?journal.thematic_area.thematic_area:"thematic area not specified"}
                            </p>
                            <p className='mb-2 text-sm text-orange-800'>
                            {journal.country?journal.country.country:"country unspecified"}
                            </p>
                            <p className='mb-2 text-sm'>
                             {/* {journalDescription} */}
                             {descriptions[i] ? descriptions[i] : "Generating description..."}
                            
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
                <div className='mt-8 text-center'>
                  <Button className='bg-primary p-6 text-white hover:bg-blue-700'>
                    Show More Results
                  </Button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Home',
    href: '/',
    isActive: true,
  },
]
