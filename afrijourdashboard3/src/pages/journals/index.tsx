import { Layout } from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import { IconSearch, IconFilter, IconRefresh } from '@tabler/icons-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useState, useEffect } from 'react'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { FilterPanel } from '@/components/filters/FilterPanel'

interface Article {
  title: string;
  authors: string;
  citation_count: number;
  url: string;
  abstract: string;
}

interface Country {
  id: number;
  country: string;
}

interface ThematicArea {
  id: number;
  thematic_area: string;
}

interface Language {
  id: number;
  language: string;
}

export default function Journals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const pageSize = 10;

  const [countries, setCountries] = useState<Country[]>([]);
  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [selectedThematicAreas, setSelectedThematicAreas] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);

  const fetchArticles = async (page = 1) => {
    try {
      const response = await fetch(
        `https://aphrc.site/journal_api/articles/search/?query=${searchTerm}&page=${page}&page_size=${pageSize}`
      );
      const data = await response.json();
      // Assuming the API now returns abstracts. If not, you'll need to modify this
      setArticles(data.results.map((article: any) => ({
        ...article,
        abstract: article.abstract || 'Abstract not available. This is a placeholder text that would normally contain 2-3 sentences describing the main points of the research article.',
      })));
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, thematicRes, languagesRes] = await Promise.all([
          fetch('https://aphrc.site/journal_api/api/country/'),
          fetch('https://aphrc.site/journal_api/api/thematic/'),
          fetch('https://aphrc.site/journal_api/api/languages/'),
        ]);

        setCountries(await countriesRes.json());
        setThematicAreas(await thematicRes.json());
        setLanguages(await languagesRes.json());
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };

    fetchData();
    fetchArticles(currentPage);
  }, [searchTerm, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchArticles(page);
  };

  const handleCountryChange = (id: number) => {
    setSelectedCountries(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleThematicAreaChange = (id: number) => {
    setSelectedThematicAreas(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleLanguageChange = (id: number) => {
    setSelectedLanguages(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleApplyFilter = () => {
    fetchArticles(1);
    setShowFilterForm(false);
  };

  return (
    <Layout>
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
                  onClick={() => setShowFilterForm(!showFilterForm)}
                />
                <IconSearch
                  className='h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary'
                  onClick={() => fetchArticles(1)}
                />
              </div>
            </div>
          </div>

          <FilterPanel
            showFilterForm={showFilterForm}
            toggleFilterForm={() => setShowFilterForm(!showFilterForm)}
            countries={countries}
            thematicAreas={thematicAreas}
            languages={languages}
            selectedCountries={selectedCountries}
            selectedThematicAreas={selectedThematicAreas}
            selectedLanguages={selectedLanguages}
            onCountryChange={handleCountryChange}
            onThematicAreaChange={handleThematicAreaChange}
            onLanguageChange={handleLanguageChange}
            onApplyFilter={handleApplyFilter}
          />

          <div className='space-y-6'>
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>

          <div className='mt-6'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    aria-disabled={currentPage <= 1}
                  />
                </PaginationItem>

                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href='#'
                        isActive={currentPage === 1}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(1);
                        }}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationEllipsis />
                  </>
                )}

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
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {currentPage < totalPages - 2 && (
                  <>
                    <PaginationEllipsis />
                    <PaginationItem>
                      <PaginationLink
                        href='#'
                        isActive={currentPage === totalPages}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(totalPages);
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) handlePageChange(currentPage + 1);
                    }}
                    aria-disabled={currentPage >= totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
}
