import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
//import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { DistributionChart } from './components/distribution-chart'
import { LanguagePiechart } from './components/langauage-piechart'
import { RadialChart } from './components/radial-chart'
import { RadialStacked } from './components/radial-stacked'
import JournalTable from './components/journal-table'
import {
  IconBook,
  IconDatabase,
  IconLanguage,
  IconUsers,
} from '@tabler/icons-react'
import { FileTextIcon, GlobeIcon, ListBulletIcon } from '@radix-ui/react-icons'

export default function Dashboard() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              {/* <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Journals
                  </CardTitle>
                  <IconBook className='size-8 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>2004</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +20.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    African Countries
                  </CardTitle>
                  <GlobeIcon className='size-8 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>54</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +180.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Abstracts
                  </CardTitle>
                  <FileTextIcon className='size-8 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>1.45K</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Languages
                  </CardTitle>
                  <IconLanguage className='size-8 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>5</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p> */}
                </CardContent>
              </Card>
            </div>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Repositories
                  </CardTitle>
                  <IconDatabase className='size-8 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>3</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +20.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Indexes</CardTitle>
                  <ListBulletIcon className='size-8 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>7</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +180.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Reviewers
                  </CardTitle>
                  <IconUsers className='size-8 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>433</div>
                  {/* <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p> */}
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Journals Distribution</CardTitle>
                  <CardDescription>Distribution per Country.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <Overview /> */}
                  <DistributionChart />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle>Language Distribution</CardTitle>
                  <CardDescription>Languages.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <RecentSales /> */}
                  <LanguagePiechart />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle>Journals Disciplines Distribution</CardTitle>
                  <CardDescription>Disciplines.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadialChart />
                </CardContent>
              </Card>
            </div>
            <div className='*: grid grid-cols-1 gap-4 lg:grid-cols-12'>
              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle>Google Scholar</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadialStacked percentage={50} title='Google Scholar' />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle>Scopus</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadialStacked percentage={43} title='Scopus' />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-2'>
                <CardHeader>
                  <CardTitle>Open Access Journal</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadialStacked percentage={64} title='Open Access Journal' />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-6'>
                <CardHeader>
                  <CardTitle>Journals Disciplines Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <JournalTable />
                </CardContent>
              </Card>
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
