import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { TopNav } from '@/components/top-nav'
import { useState, useEffect, SetStateAction } from 'react'
import { BarChart3, BookOpen, GraduationCap, Globe2 } from 'lucide-react'
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader'
import { AnalyticsFilters } from '@/components/analytics/AnalyticsFilters'
import { JournalsTable } from '@/components/analytics/JournalsTable'
import { StatsCards } from '@/components/analytics/StatsCards'
import { JournalVisualizations } from '@/components/analytics/JournalVisualizations'

export default function Analytics() {
  const [journals, setJournals] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    country: '',
    thematicArea: '',
    language: '',
    doaj: '',
    oaj: '',
    africanPublisher: '',
    inasps: '',
    cope: '',
    issn: '',
    googleScholar: false,
    scopus: false
  })

  const fetchJournals = async (url = 'https://aphrc.site/journal_api/journals/search/') => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setJournals(data.results)
    } catch (error) {
      console.error('Error fetching journals:', error)
    }
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  const handleCriteriaChange = (newFilters: SetStateAction<{ country: string; thematicArea: string; language: string; doaj: string; oaj: string; africanPublisher: string; inasps: string; cope: string; issn: string; googleScholar: boolean; scopus: boolean }>) => {
    setFilters(newFilters)
  }

  const generateSearchUrl = () => {
    const baseUrl = 'https://aphrc.site/journal_api/journals/search/'
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (typeof value === 'boolean') {
          params.append(key, value.toString())
        } else if (value === 'Yes') {
          params.append(key, 'true')
        } else if (value === 'No') {
          params.append(key, 'false')
        } else {
          params.append('query', value)
        }
      }
    })

    console.log('Generated URL:', `${baseUrl}?${params.toString()}`)
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
  }

  const fetchFilteredJournals = async () => {
    setLoading(true)
    try {
      const url = generateSearchUrl()
      console.log('Fetching filtered journals from:', url)
      const response = await fetch(url)
      const data = await response.json()
      setJournals(data.results)
    } catch (error) {
      console.error('Error fetching filtered journals:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="space-y-8">
          <AnalyticsHeader />

          <StatsCards
            stats={[
              {
                title: "Total Journals",
                value: journals.length,
                icon: BookOpen,
                trend: "+12.5%"
              },
              {
                title: "Academic Fields",
                value: "24",
                icon: GraduationCap,
                trend: "+4.3%"
              },
              {
                title: "Countries",
                value: "38",
                icon: Globe2,
                trend: "+2.1%"
              },
              {
                title: "Citations",
                value: "12.4K",
                icon: BarChart3,
                trend: "+23.1%"
              }
            ]}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <AnalyticsFilters
                filters={filters}
                onCriteriaChange={handleCriteriaChange}
                onSearch={fetchFilteredJournals}
                loading={loading}
              />
            </div>

            <div className="space-y-8 lg:col-span-8">
              <JournalVisualizations journals={journals} />
              <JournalsTable journals={journals} />
            </div>
          </div>
        </div>
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
]
