// @ts-ignore
// @ts-nocheck
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '@/components/ui/table'
import { useMemo, useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
// import { IconSearch } from '@tabler/icons-react'
import { IconSearch, IconFilter, IconRefresh } from '@tabler/icons-react'

import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Journals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)
  const [selectedJournals, setSelectedJournals] = useState([])
  const [journals, setJournals] = useState([])
  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showFilterForm, setShowFilterForm] = useState(false)
  const pageSize = 10 // Number of items per page

  const [countries, setCountries] = useState<Country[]>([])
  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [selectedThematicAreas, setSelectedThematicAreas] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  
  // Fetch articles with search and pagination
  const fetchArticles = async (page = 1) => {
    const response = await fetch(
      `https://aphrc.site/journal_api/articles/search/?query=${searchTerm}&page=${page}&page_size=${pageSize}`
    )
    const data = await response.json()
    setArticles(data.results) // Assuming the API returns articles
    setTotalPages(Math.ceil(data.count / pageSize)) // Assuming the API returns total pages
  }

  

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await fetch('https://aphrc.site/journal_api/api/country/');
        const thematicResponse = await fetch('https://aphrc.site/journal_api/api/thematic/');
        const languagesResponse = await fetch('https://aphrc.site/journal_api/api/languages/');

        setCountries(await countriesResponse.json());
        setThematicAreas(await thematicResponse.json());
        setLanguages(await languagesResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchArticles(currentPage);
  }, [searchTerm,currentPage]);
  
  

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchArticles(page)
  }

  // Toggle filter form visibility
  const toggleFilterForm = () => {
    setShowFilterForm((prev) => !prev)
  }

 

  return (
    <Layout>
      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='p-4 md:p-6'>
         
          <div className='mb-4 flex items-center'>
            <div className='relative w-full'>
              <Input
                type='search'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='block w-full rounded-lg border border-muted bg-background py-2 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:ring-primary'
              />

              <div className='absolute inset-y-0 right-0 flex items-center space-x-3 pr-3'>
                <IconRefresh
                  className='h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary'
                  onClick={() => fetchArticles(currentPage)}
                />
                <IconFilter
                  className='h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary'
                  onClick={toggleFilterForm}
                />
                <IconSearch
                  className='h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary'
                  onClick={() => fetchArticles(1)}
                />
              </div>
            </div>
          </div>

          {/* Filter Form - Conditional rendering based on showFilterForm state */}
          <div
            className={`fixed left-0 top-0 h-full transform bg-white p-4 shadow-lg transition-transform ${
              showFilterForm ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ width: '300px', zIndex: 50 }}
          >
            <button
              className='mb-4 text-red-500'
              onClick={toggleFilterForm}
            >
              Close
            </button>
            <h3 className='text-lg font-semibold'>Filter Options</h3>

            
            <div className='max-h-[calc(100vh-150px)] overflow-y-auto'>
              <form>
               
                <div className='mb-4'>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium'
                  >
                    Country:
                  </label>
                  <div>
                    {countries.map((country) => (
                      <div key={country.id} className='flex items-center'>
                        <Checkbox
                          id={`country-${country.id}`}
                          className='rounded-full'
                         
                          onChange={() => handleCountryChange(country.id)}
                        />
                        <label
                          htmlFor={`country-${country.id}`}
                          className='ml-2 text-sm'
                        >
                          {country.country}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                
                <div className='mb-4'>
                  <label
                    htmlFor='thematic-area'
                    className='block text-sm font-medium'
                  >
                    Thematic Area:
                  </label>
                  <div>
                    {thematicAreas.map((area) => (
                      <div key={area.id} className='flex items-center'>
                        <Checkbox
                          id={`thematic-${area.id}`}
                          className='rounded-full'
                          
                          onChange={() => handleThematicAreaChange(area.id)}
                        />
                        <label
                          htmlFor={`thematic-${area.id}`}
                          className='ml-2 text-sm'
                        >
                          {area.thematic_area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                
                <div className='mb-4'>
                  <label
                    htmlFor='language'
                    className='block text-sm font-medium'
                  >
                    Language:
                  </label>
                  <div>
                    {languages.map((language) => (
                      <div key={language.id} className='flex items-center'>
                        <Checkbox
                          id={`language-${language.id}`}
                          className='rounded-full'
                         
                          onChange={() => handleLanguageChange(language.id)}
                        />
                        <label
                          htmlFor={`language-${language.id}`}
                          className='ml-2 text-sm'
                        >
                          {language.language}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type='submit'
                  className='rounded bg-blue-500 px-4 py-2 text-white'
                >
                  Apply Filter
                </button>
              </form>
            </div>
          



          </div>

          <div className='overflow-x-auto'>
            {articles.map((article, index) => (
              <div key={index} className='mb-6 border-b border-gray-300 pb-4'>
                <h1 className='mb-2 text-xl font-bold text-gray-900'>
                  {article.title}
                </h1>
                <p className='mb-1 text-sm text-gray-700'>
                  <span className='font-semibold'>Authors:</span>{' '}
                  {article.authors}
                </p>
                <p className='mb-3 text-sm text-green-700'>
                  <span className='font-semibold '>Citations Count:</span>{' '}
                  {article.citation_count}
                </p>
                <a
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm font-medium text-blue-600 transition-colors hover:text-blue-800'
                >
                  Read more →
                </a>
              </div>
            ))}

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={(event) => {
                      event.preventDefault()
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1)
                      }
                    }}
                    disabled={currentPage <= 1} // Disable if on the first page
                  />
                </PaginationItem>

                {/* Show first page */}
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href='#'
                        isActive={currentPage === 1}
                        onClick={(event) => {
                          event.preventDefault()
                          handlePageChange(1)
                        }}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationEllipsis />
                  </>
                )}

                {/* Show previous, current, and next page neighbors */}
                {[...Array(totalPages)]
                  .map((_, index) => index + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                  )
                  .map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href='#'
                        isActive={currentPage === page}
                        onClick={(event) => {
                          event.preventDefault()
                          handlePageChange(page)
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Show ellipsis before last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    <PaginationEllipsis />
                    <PaginationItem>
                      <PaginationLink
                        href='#'
                        isActive={currentPage === totalPages}
                        onClick={(event) => {
                          event.preventDefault()
                          handlePageChange(totalPages)
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={(event) => {
                      event.preventDefault()
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1)
                      }
                    }}
                    disabled={currentPage >= totalPages} // Disable if on the last page
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
  // Other nav items...
]
