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
  // Fetch journals with search and pagination
  //http://198.211.110.243/journal_api/journals/search/
  const fetchJournals = async () => {
    const response = await fetch(`https://aphrc.site/journal_api/journals/search/`);
    const data = await response.json();
    setJournals(data.results); // Assuming the API returns paginated data
    //setTotalPages(Math.ceil(data.count / pageSize)); // Assuming the API returns total pages
    console.log(data.results);
  };

  useEffect(() => {
    fetchJournals();
  });
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
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
                  <AnalyticsForm />
                  <div className='my-6'>
                    <h3 className='text-lg font-bold'>Selected Criteria</h3>
                    <p className='text-sm text-muted-foreground'>
                      Listed on International Standard Serial Number (ISSN)
                      Portal Listed on International Standard Serial Number
                      (ISSN) Portal Listed on International Standard Serial
                      Number (ISSN) Portal Listed on International Standard
                      Serial Number (ISSN) Portal
                    </p>
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
