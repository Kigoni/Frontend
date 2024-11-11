// @ts-ignore
// @ts-nocheck
import { Layout } from '@/components/custom/layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import AnalyticsForm from './components/analytics-form'
import { RadialStacked } from '../dashboard/components/radial-stacked'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '@/components/ui/table'
import {  useState, useEffect } from 'react'
export default function Analytics() {
  const [journals, setJournals] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedThematicArea, setSelectedThematicArea] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const[selectedDoaj,setSelectedDoaj]=useState('')
  const[selectedOaj,setSelectedOaj]=useState('')
  const[selectedAfricanPublisher,setSelectedAfricanPublisher]=useState('')
  const[selectedInasps,setSelectedInasps]=useState('')
  const[selectedCope,setCope]=useState('')
  const[selectedIssn,setIssn]=useState('')
  const [selectedGoogleScholar, setSelectedGoogleScholar] = useState('');
  const [selectedScopus, setSelectedScopus] = useState('');
  // Fetch journals with search and pagination
  //http://198.211.110.243/journal_api/journals/search/


  // const fetchJournals = async () => {
  //   const response = await fetch(`https://aphrc.site/journal_api/journals/search/`);
  //   const data = await response.json();
  //   setJournals(data.results); // Assuming the API returns paginated data
  //   //setTotalPages(Math.ceil(data.count / pageSize)); // Assuming the API returns total pages
  //   console.log(data.results);
  // };

  // Fetch journals with search URL
  const fetchJournals = async (url = 'https://aphrc.site/journal_api/journals/search/') => {
    const response = await fetch(url);
    const data = await response.json();
    setJournals(data.results);
  };

  useEffect(() => {
    fetchJournals();
  },[journals]);

  // Function to handle form submission and updating selected criteria
  // const handleCriteriaChange = (country: string, thematicArea: string, language: string,doaj:string,oaj:string,ap:string,inasps:string,cope:string,issn:string) => {
  //   setSelectedCountry(country);
  //   setSelectedThematicArea(thematicArea);
  //   setSelectedLanguage(language);
  //   setSelectedDoaj(doaj);
  //   setSelectedOaj(oaj);
  //   setSelectedAfricanPublisher(ap);
  //   setSelectedInasps(inasps);
  //   setCope(cope)
  //   setIssn(issn)
  // };
  const handleCriteriaChange = (
    country: string,
    thematicArea: string,
    language: string,
    doaj: string,
    oaj: string,
    ap: string,
    inasps: string,
    cope: string,
    issn: string,
    googleScholar: string,
    scopus: string
  ) => {
    setSelectedCountry(country);
    setSelectedThematicArea(thematicArea);
    setSelectedLanguage(language);
    setSelectedDoaj(doaj);
    setSelectedOaj(oaj);
    setSelectedAfricanPublisher(ap);
    setSelectedInasps(inasps);
    setCope(cope);
    setIssn(issn);
    setSelectedGoogleScholar(googleScholar);
    setSelectedScopus(scopus);
  };
  
  const generateSearchUrl = () => {
    const baseUrl = 'https://aphrc.site/journal_api/journals/search/?';
    const params = new URLSearchParams();
  
    // Boolean filters with "Yes" and "No" interpretation
    params.append('directory_of_african_journals', selectedDoaj === 'Yes' ? 'true' : 'false');
    params.append('open_access_journal', selectedOaj === 'Yes' ? 'true' : 'false');
    params.append('online_publisher_in_africa', selectedAfricanPublisher === 'Yes' ? 'true' : 'false');
    params.append('hosted_on_INASPS', selectedInasps === 'Yes' ? 'true' : 'false');
    params.append('member_of_Committee_on_publication_Ethics', selectedCope === 'Yes' ? 'true' : 'false');
    params.append('Present_on_ISSN', selectedIssn === 'Yes' ? 'true' : 'false');
    params.append('indexed_on_google_scholar', selectedGoogleScholar === 'Yes' ? 'true' : 'false');
    params.append('indexed_on_scopus', selectedScopus === 'Yes' ? 'true' : 'false');
  
    // Combine country, thematic area, and language into a single query parameter
    const queryParts = [];
    if (selectedCountry) queryParts.push(selectedCountry);
    if (selectedThematicArea) queryParts.push(selectedThematicArea);
    if (selectedLanguage) queryParts.push(selectedLanguage);
  
    if (queryParts.length > 0) {
      params.append('query', queryParts.join(' ')); // Join with spaces for URL encoding
    }
  
    return baseUrl + params.toString();
  };
  

 // Fetch journals based on selected criteria
 const fetchFilteredJournals = async () => {
  const url = generateSearchUrl();
  const response = await fetch(url);
  const data = await response.json();
  setJournals(data.results);
  console.log('url:-',url)
  console.log('data:-',data.results)
};

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
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Analytics</h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Analytics</TabsTrigger>
              {/* <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            {' '}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-8'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Explore our Journals</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <Overview /> */}
                  <AnalyticsForm onCriteriaChange={handleCriteriaChange} />
                  <div className='my-6'>
                    <h3 className='text-lg font-bold'>Selected Criteria</h3>
                    {/* <p className='text-sm text-muted-foreground'>
                      Listed on International Standard Serial Number (ISSN)
                      Portal Listed on International Standard Serial Number
                      (ISSN) Portal Listed on International Standard Serial
                      Number (ISSN) Portal Listed on International Standard
                      Serial Number (ISSN) Portal
                    </p> */}
                     <p className="text-sm text-muted-foreground">
                      <strong>Country:</strong> {selectedCountry || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Thematic Area:</strong> {selectedThematicArea || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Language:</strong> {selectedLanguage || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Listed on Directory of Open Access Journal (DOAJ):</strong> {selectedDoaj || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Listed on Open Access Journal (OAJ):</strong> {selectedOaj || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Online Publisher Based in Africa:</strong> {selectedAfricanPublisher || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Hosted on INASP's Journals Online:</strong> {selectedInasps || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Member of Committee on Publication Ethics (COPE):</strong> {selectedCope || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Listed on International Standard Serial Number (ISSN) Portal:</strong> {selectedIssn || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Listed on Google Scholar:</strong> {selectedGoogleScholar || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Listed on Scopus:</strong> {selectedScopus || 'Not selected'}
                    </p>
                    {/* <button
                    // onClick={generateSearchUrl}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Search Journals
                  </button> */}
                  <button onClick={fetchFilteredJournals}>Search Journals</button>
                  </div>
                </CardContent>
              </Card>
              <div className='col-span-1 grid grid-cols-2 gap-4 lg:col-span-4'>
                <Card className='col-span-1 lg:col-span-2'>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Explore our Journals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>TITLE</TableHead>
                          <TableHead>PUBLISHER</TableHead>
                          <TableHead>CATEGORY</TableHead>
                          {/* <TableHead>CITATION COUNT</TableHead>
                          <TableHead>PUBLISHED</TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {journals.map((journal, index) => (
                        <TableRow key={index}>
                        
                          <TableCell>{journal.journal_title?journal.journal_title:"journal title unspecified"}</TableCell>
                          <TableCell>{journal.publishers_name?journal.publishers_name:"publisher unspecified"}</TableCell>
                          <TableCell>{journal.thematic_area?journal.thematic_area.thematic_area:"thematic area not specified"}</TableCell>
                          {/* <TableCell>25</TableCell>
                          <TableCell>Yes</TableCell> */}
                        </TableRow>))}
                        {/* <TableRow>
                          <TableCell>Journal 2</TableCell>
                          <TableCell>Author 2</TableCell>
                          <TableCell>Medicine</TableCell>
                          <TableCell>42</TableCell>
                          <TableCell>Yes</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Journal 3</TableCell>
                          <TableCell>Author 3</TableCell>
                          <TableCell>Psychology</TableCell>
                          <TableCell>18</TableCell>
                          <TableCell>Yes</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Journal 4</TableCell>
                          <TableCell>Author 4</TableCell>
                          <TableCell>Engineering</TableCell>
                          <TableCell>36</TableCell>
                          <TableCell>Yes</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Journal 5</TableCell>
                          <TableCell>Author 5</TableCell>
                          <TableCell>Economics</TableCell>
                          <TableCell>30</TableCell>
                          <TableCell>Yes</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Journal 6</TableCell>
                          <TableCell>Author 6</TableCell>
                          <TableCell>Education</TableCell>
                          <TableCell>22</TableCell>
                          <TableCell>Yes</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Journal 7</TableCell>
                          <TableCell>Author 7</TableCell>
                          <TableCell>History</TableCell>
                          <TableCell>14</TableCell>
                          <TableCell>Yes</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Journal 8</TableCell>
                          <TableCell>Author 8</TableCell>
                          <TableCell>Environmental Science</TableCell>
                          <TableCell>28</TableCell>
                          <TableCell>Yes</TableCell>
                        </TableRow> */}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className='col-span-1 lg:col-span-1'>
                  <CardHeader>
                    <CardTitle>Journals Distribution per Country</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadialStacked
                      percentage={65}
                      title='Journals Distribution per Country'
                    />
                  </CardContent>
                </Card>
                <Card className='col-span-1 lg:col-span-1'>
                  <CardHeader>
                    <CardTitle>Journals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadialStacked percentage={87} title='Scopus' />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  // {
  //   title: 'Customers',
  //   href: 'dashboard/customers',
  //   isActive: false,
  // },
  // {
  //   title: 'Products',
  //   href: 'dashboard/products',
  //   isActive: false,
  // },
  // {
  //   title: 'Settings',
  //   href: 'dashboard/settings',
  //   isActive: false,
  // },
]
