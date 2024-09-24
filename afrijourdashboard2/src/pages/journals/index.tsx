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
import { IconSearch } from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react';

export default function Journals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)
  const [selectedJournals, setSelectedJournals] = useState([])
  const [journals, setJournals] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10; // Number of items per page
//https://aphrc.site/journal_api/journals/search/

  // Fetch journals with search and pagination
  const fetchJournals = async (page = 1) => {
    const response = await fetch(`https://aphrc.site/journal_api/journals/search/?query=${searchTerm}&page=${page}&page_size=${pageSize}`);
    const data = await response.json();
    setJournals(data.results); // Assuming the API returns paginated data
    setTotalPages(Math.ceil(data.count / pageSize)); // Assuming the API returns total pages
    //console.log(data.results);
  };

  useEffect(() => {
    fetchJournals(currentPage);
  }, [searchTerm, currentPage]);

  console.log('Current Page:', currentPage);
  console.log('Total Pages:', totalPages);
  


  const filteredJournals = useMemo(() => {
    return journals.filter((journal) =>
      Object.values(journal).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, journals])

  const sortedJournals = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredJournals
    return filteredJournals.sort((a, b) => {
      const valueA = a[sortColumn]
      const valueB = b[sortColumn]
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredJournals, sortColumn, sortDirection])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleSelectJournal = (journal) => {
    if (selectedJournals.includes(journal)) {
      setSelectedJournals(selectedJournals.filter((j) => j !== journal))
    } else {
      setSelectedJournals([...selectedJournals, journal])
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchJournals(page);
  }

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
        <div className='p-4 md:p-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Journal Articles</h1>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <IconSearch className='h-5 w-5 text-muted-foreground' />
              </div>
              <Input
                type='search'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='block w-full rounded-lg border border-muted bg-background py-2 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:ring-primary'
              />
            </div>
          </div>
          <div className='overflow-x-auto'>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox
                        checked={
                          selectedJournals.length === sortedJournals.length
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedJournals(sortedJournals)
                          } else {
                            setSelectedJournals([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                    >
                      Journal Title
                      {sortColumn === 'title' && (
                        <span className='ml-2'>
                          {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                        </span>
                      )}
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                    >
                      Publisher
                      {sortColumn === 'author' && (
                        <span className='ml-2'>
                          {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                        </span>
                      )}
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                    >
                      Country
                      {sortColumn === 'category' && (
                        <span className='ml-2'>
                          {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                        </span>
                      )}
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                    >
                      Platform
                      {sortColumn === 'citationCount' && (
                        <span className='ml-2'>
                          {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                        </span>
                      )}
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                    >
                      Thematic Area
                      {sortColumn === 'keywords' && (
                        <span className='ml-2'>
                          {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                        </span>
                      )}
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                    >
                      Published
                      {sortColumn === 'published' && (
                        <span className='ml-2'>
                          {sortDirection === 'asc' ? '\u25B2' : '\u25BC'}
                        </span>
                      )}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedJournals.map((journal, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          checked={selectedJournals.includes(journal)}
                          onCheckedChange={() => handleSelectJournal(journal)}
                        />
                      </TableCell>
                      <TableCell>{journal.journal_title?journal.journal_title:"journal title unspecified"}</TableCell>
                      <TableCell>{journal.publishers_name?journal.publishers_name:"publisher unspecified"}</TableCell>
                      <TableCell>{journal.country?journal.country.country:"country unspecified"}</TableCell>
                      <TableCell>{journal.platform?journal.platform.platform:"platform not specified"}</TableCell>
                      <TableCell>{journal.thematic_area?journal.thematic_area.thematic_area:"thematic area not specified"}</TableCell>
                      <TableCell>
                        {journal.journal_title ? (
                          <Badge variant='outline'>Published</Badge>
                        ) : (
                          <Badge variant='destructive'>Unpublished</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {/* Show first page */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === 1}
                          onClick={() => handlePageChange(1)}
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
                        page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)
                    )
                    .map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={() => handlePageChange(page)}
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
                          href="#"
                          isActive={currentPage === totalPages}
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                </PaginationContent>
              </Pagination>

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
  // Other nav items...
]
