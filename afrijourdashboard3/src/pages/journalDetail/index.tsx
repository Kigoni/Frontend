import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { Layout } from '@/components/custom/layout'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { IconDownload } from '@tabler/icons-react' // Import the download icon
import {
  IconCircleCheck,
  IconCircleX,
  IconQuestionMark,
} from '@tabler/icons-react'

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
  id: number
  title: string
  authors: string // Assuming authors is a string
  keywords: string
  pdf: string
  publication_date: string
}
interface Volume {
  id: number
  volume_number: number
  created_at: string
  issue_number: number
  year: number
  articles: Article[]
}
interface Journal {
  journal_title?: string
  summary?: string
  open_access_journal?:boolean
  listed_in_doaj?:boolean
  publisher_in_cope?:boolean
  present_issn?:boolean
  online_publisher_africa?:boolean
  google_scholar_index?:boolean
  sjr?:boolean
  eigen_factor?:boolean
  snip?:boolean
  hosted_on_inasps?:boolean
  aim_identifier?:boolean
  medline?:boolean
  eigen_metrix?:string
  h_index:number
  impact_factor:number
  snip_metrix:number
  link?: string
  volumes?: Volume[]
  image?: {
    id: number
    image: string
    description: string
    uploaded_at: string
  }
}

export default function JournalDetail() {
  const { journalId } = useParams() // This retrieves the journalId from the URL
  //const [journal, setJournal] = useState(null)
  const [expandedVolume, setExpandedVolume] = useState<number | null>(null)

  const [journal, setJournal] = useState<Journal | null>(null)
  //const [journal, setJournal] = useState<{ journal_title?: string } | null>(null); // Inline type for journal

  useEffect(() => {
    // Fetch the specific journal data using the journalId
    //https://aphrc.site/journal_api/api/journals/${journalId}/
    //http://127.0.0.1:8000/
    const fetchJournal = async () => {
      const response = await fetch(
        `https://aphrc.site/journal_api/api/journals/${journalId}/`
      )
      const data = await response.json()
      setJournal(data)
      console.log(data.journal_title)
      console.log(data)
      // Use to generate a description
      //console.log(description)
      //await generateDescription(data.journal_title)
      //console.log(data.language)
      //console.log(journal)
    }
    fetchJournal()
  }, [journalId])

  if (!journal)
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-20 w-20 animate-ping rounded-full bg-violet-800'></div>
      </div>
    )
  // Split the link string into an array of URLs
  const links = journal.link ? journal.link.split(', ') : []

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
        {/* //https://aphrc.site${journal.image.image} */}
        {/* http://127.0.0.1:8000${journal.image.image} */}
        <div className='space-y-4'>
          <ScrollArea className='h-[1200px]'>
            <Card className='mb-4'>
              <CardContent className='pt-6'>
                {journal.image ? (
                  <img
                    src={`https://aphrc.site${journal.image.image}`}
                    alt={journal.image.description || 'Image'}
                    className='h-auto w-48'
                  />
                ) : null}{' '}
                {/* Render nothing if the image is unavailable */}
                <h2 className='mb-2 text-lg font-semibold text-blue-800'>
                  {journal.journal_title
                    ? journal.journal_title
                    : 'journal title unspecified'}
                </h2>
                <p className='mb-2 text-sm'>
                  {journal ? (
                    journal.summary
                  ) : (
                    <div role='status'>
                      <svg
                        aria-hidden='true'
                        className='h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  )}
                </p>
                <h3 className='mt-6 text-lg font-bold'>Journal Metadata</h3>
                {/* Open Access Journal */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>Open Access Journal</span>
                  <div className='group relative'>
                    {journal.open_access_journal === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.open_access_journal === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.open_access_journal === true
                        ? 'This journal is open access'
                        : journal.open_access_journal === false
                          ? 'This journal is not open access'
                          : 'Open Access status is unspecified'}
                    </span>
                  </div>
                </div>
                {/* Journal Listed in DOAJ */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                    Journal listed in the Directory of Open Access (DOAJ)
                  </span>
                  <div className='group relative'>
                    {journal.listed_in_doaj === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.listed_in_doaj === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.listed_in_doaj === true
                        ? 'This journal is listed in DOAJ'
                        : journal.listed_in_doaj === false
                          ? 'This journal is not listed in DOAJ'
                          : 'DOAJ listing status is unspecified'}
                    </span>
                  </div>
                </div>
                {/* Journal Listed in COPE */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                    The publisher is a member of Committee on publication Ethics
                    (C.O.P.E)
                  </span>
                  <div className='group relative'>
                    {journal.publisher_in_cope === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.publisher_in_cope === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.publisher_in_cope === true
                        ? 'This journal is listed in COPE'
                        : journal.publisher_in_cope === false
                          ? 'This journal is not listed in COPE'
                          : 'COPE listing status is unspecified'}
                    </span>
                  </div>
                </div>
                {/* Present on ISSN Portal */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>Present on ISSN Portal</span>
                  <div className='group relative'>
                    {journal.present_issn === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.present_issn === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.present_issn === true
                        ? 'This journal is listed in COPE'
                        : journal.present_issn === false
                          ? 'This journal is not listed in COPE'
                          : 'ISSN status is unspecified'}
                    </span>
                  </div>
                </div>
                {/* Online publisher based in Africa */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                    Online publisher Based in Africa
                  </span>
                  <div className='group relative'>
                    {journal.online_publisher_africa === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.online_publisher_africa === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.online_publisher_africa === true
                        ? 'This journal is listed in COPE'
                        : journal.online_publisher_africa === false
                          ? 'This journal is not listed in COPE'
                          : 'Online publisher based in Africa status is unspecified'}
                    </span>
                  </div>
                </div>
                {/* Indexed On Google Scholar */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                    Indexed On Google Scholar
                  </span>
                  <div className='group relative'>
                    {journal.google_scholar_index === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.google_scholar_index === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.google_scholar_index === true
                        ? 'This journal is listed in COPE'
                        : journal.google_scholar_index === false
                          ? 'This journal is not listed in COPE'
                          : 'Indexed On Google Scholar status is unspecified'}
                    </span>
                  </div>
                </div>
                {/* Scimago Jornal and Country Rank (SJR); Scopus */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                    Scimago Jornal and Country Rank -SJR(Scopus)
                  </span>
                  <div className='group relative'>
                    {journal.sjr === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.sjr === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.sjr === true
                        ? 'This journal is listed in COPE'
                        : journal.sjr === false
                          ? 'This journal is not listed in COPE'
                          : 'SJR status is unspecified'}
                    </span>
                  </div>
                </div>
                {/* Eigen Factor */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>Eigen Factor</span>
                  <div className='group relative'>
                    {journal.eigen_factor === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.eigen_factor === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.eigen_factor === true
                        ? 'This journal is listed in COPE'
                        : journal.eigen_factor === false
                          ? 'This journal is not listed in COPE'
                          : 'SJR status is unspecified'}
                    </span>
                  </div>
                </div>

                {/* Source Normalized Impact per Paper (SNIP) */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                    Source Normalized Impact per Paper (SNIP)
                  </span>
                  <div className='group relative'>
                    {journal.snip === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.snip === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.snip === true
                        ? 'This journal is listed in COPE'
                        : journal.snip === false
                          ? 'This journal is not listed in COPE'
                          : 'SJR status is unspecified'}
                    </span>
                  </div>
                </div>

                {/* Hosted on INASP'S Journal online */}
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                    Hosted on INASP'S Journal online
                  </span>
                  <div className='group relative'>
                    {journal.hosted_on_inasps === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.hosted_on_inasps === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.hosted_on_inasps === true
                        ? 'This journal is listed in COPE'
                        : journal.hosted_on_inasps === false
                          ? 'This journal is not listed in COPE'
                          : 'SJR status is unspecified'}
                    </span>
                  </div>
                </div>

                 {/* African Index Medicus */}
                 <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                  African Index Medicus(AIM)
                  </span>
                  <div className='group relative'>
                    {journal.aim_identifier === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.aim_identifier === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.aim_identifier === true
                        ? 'This journal is listed in COPE'
                        : journal.aim_identifier === false
                          ? 'This journal is not listed in COPE'
                          : 'SJR status is unspecified'}
                    </span>
                  </div>
                </div>

                 {/* Medline (Medicine and Health Journals) */}
                 <div className='flex items-center space-x-2'>
                  <span className='text-gray-800'>
                  Medline (Medicine and Health Journals)
                  </span>
                  <div className='group relative'>
                    {journal.medline === true ? (
                      <IconCircleCheck
                        color='#4CAF50'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : journal.medline === false ? (
                      <IconCircleX
                        color='#F44336'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    ) : (
                      <IconQuestionMark
                        color='#FFC107'
                        size={32}
                        className='transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125'
                      />
                    )}
                    <span className='absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                      {journal.medline === true
                        ? 'This journal is listed in  Medline (Medicine and Health Journals)'
                        : journal.medline === false
                          ? ' Medline (Medicine and Health Journals) is not listed in COPE'
                          : ' Medline (Medicine and Health Journals) status is unspecified'}
                    </span>
                  </div>
                </div>
                <h3 className='mt-6 text-lg font-bold'>Journal Metrics</h3>

                {/* Snip Metrix */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-800">Snip Metric</span>
                    <div className="relative group">
                        {journal.snip_metrix === null ? (
                            <IconQuestionMark
                                color="#FFC107"
                                size={32}
                                className="transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125"
                            />
                        ) : (
                            <span className="text-green-600 font-semibold">
                                {journal.snip_metrix.toFixed(4)}
                            </span>  
                        )}
                    </div>
                </div>

                {/* Impact Factor */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-800">Impact Factor</span>
                    <div className="relative group">
                        {journal.impact_factor === null ? (
                            <IconQuestionMark
                                color="#FFC107"
                                size={32}
                                className="transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125"
                            />
                        ) : (
                            <span className="text-green-600 font-semibold">
                                {journal.impact_factor.toFixed(4)}
                            </span>  
                        )}
                    </div>
                </div>

                {/* H_Index */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-800">H-index</span>
                    <div className="relative group">
                        {journal.h_index === null ? (
                            <IconQuestionMark
                                color="#FFC107"
                                size={32}
                                className="transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125"
                            />
                        ) : (
                            <span className="text-green-600 font-semibold">
                                {journal.h_index.toFixed(4)}
                            </span>  
                        )}
                    </div>
                </div>

                {/* Eigen Metrix */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-800">Eigen Metrix</span>
                    <div className="relative group">
                        {journal.eigen_metrix === null || journal.eigen_metrix==='nan' ? (
                            <IconQuestionMark
                                color="#FFC107"
                                size={32}
                                className="transform transition-transform duration-200 group-hover:rotate-12 group-hover:scale-125"
                            />
                        ) : (
                            <span className="text-green-600 font-semibold">
                                {journal.eigen_metrix}
                            </span>  
                        )}
                    </div>
                </div>

                <h3 className='mt-6 text-lg font-bold'>Official Website Links</h3>
                <p>
                  {links.map((link, index) => {
                    // Extract domain name to use as the tag label
                    const label = new URL(link).hostname.replace('www.', '')

                    return (
                      <a
                        key={index}
                        href={link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mb-2 mr-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 transition duration-200 hover:bg-blue-200'
                      >
                        {label}
                      </a>
                    )
                  })}
                </p>
                <h3 className='mt-6 text-lg font-bold'>Volumes and Articles</h3>
                {(journal.volumes || []).length > 0 ? (
                  (journal.volumes || []).map((volume) => (
                    <div key={volume.volume_number} className='my-4'>
                      <h4
                        className='text-md cursor-pointer font-semibold text-blue-600 hover:underline'
                        onClick={() => handleToggleVolume(volume.volume_number)}
                      >
                        Volume {volume.volume_number}(No. {volume.issue_number}
                        ,Year. {volume.year})
                      </h4>

                      {expandedVolume === volume.volume_number && (
                        <ul className='pl-4'>
                          <h2 className='text-md font-semibold  text-blue-600 '>
                            Articles
                          </h2>
                          {volume.articles.length > 0 ? (
                            volume.articles.map((article, index) => (
                              <li
                                key={index}
                                className='mb-2 flex flex-col items-start justify-between border-b border-gray-300 text-sm last:border-b-0 sm:flex-row sm:items-center'
                              >
                                <div className='flex-grow'>
                                  <h1 className='font-semibold'>
                                    {article.title}
                                  </h1>
                                  <h2 className='text-gray-600'>
                                    {article.authors}
                                  </h2>
                                </div>
                                <IconDownload
                                  className='mt-2 cursor-pointer text-blue-600 hover:text-blue-800 sm:ml-4 sm:mt-0'
                                  onClick={async () => {
                                    try {
                                      const response = await fetch(
                                        `https://aphrc.site${article.pdf}`
                                      )
                                      if (!response.ok) {
                                        throw new Error(
                                          'Network response was not ok'
                                        )
                                      }
                                      const blob = await response.blob()
                                      const url =
                                        window.URL.createObjectURL(blob)
                                      const link = document.createElement('a')
                                      link.href = url
                                      link.setAttribute(
                                        'download',
                                        article.title || 'article.pdf'
                                      )
                                      document.body.appendChild(link)
                                      link.click()
                                      document.body.removeChild(link)
                                      window.URL.revokeObjectURL(url)
                                    } catch (error) {
                                      console.error(
                                        'Error downloading the PDF:',
                                        error
                                      )
                                    }
                                  }}
                                />
                              </li>
                            ))
                          ) : (
                            <li className='text-sm'>No articles available</li>
                          )}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p className='text-sm text-gray-600'>
                    No volumes and articles available
                  </p>
                )}
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
