import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'

interface JournalResultsProps {
  journals: any[]
  loading: boolean
  currentPage: number
  totalPages: number
  totalResults: number
  onPageChange: (page: number) => void
}

export function JournalResults({
  journals,
  loading,
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
}: JournalResultsProps) {
  return (
    <section className='bg-muted/30 px-6 py-12'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 flex items-center justify-between'>
          <p className='text-lg font-medium'>
            {totalResults.toLocaleString()} results found
          </p>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-sm'>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              size='icon'
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <ScrollArea className='h-[800px] rounded-lg border bg-background p-4'>
          <AnimatePresence mode='wait'>
            {loading ? (
              <div className='flex h-40 items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-primary' />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='space-y-4'
              >
                {journals.map((journal, index) => (
                  <motion.div
                    key={journal.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className='overflow-hidden transition-all hover:shadow-lg bg-[#BFEFFF]'>
                      <CardContent className='p-6'>
                        <div className='mb-4 flex items-start justify-between gap-4 '>
                          <div>
                            <Link
                              to={`/journals/${journal.id}`}
                              className='text-xl font-bold text-primary hover:underline'
                            >
                              {journal.journal_title || 'Untitled Journal'}
                            </Link>
                            <p className='mt-1 text-sm text-muted-foreground'>
                              {journal.publishers_name ||
                                'Publisher unspecified'}
                            </p>
                          </div>
                          <div className='flex flex-wrap gap-2'>
                            <Badge className='bg[#b5a343] text-white hover:bg[#e0c73d]'>
                              {journal.language?.language ||
                                'Language unspecified'}
                            </Badge>
                            <Badge className='bg-red-500 text-white hover:bg-red-600'>
                              {journal.thematic_area?.thematic_area ||
                                'Uncategorized'}
                            </Badge>
                            <Badge className='bg-green-500 text-white hover:bg-green-600'>
                              {journal.country?.country ||
                                'Country unspecified'}
                            </Badge>
                          </div>
                        </div>
                        <p className='mb-4 line-clamp-3 text-sm text-muted-foreground'>
                          {journal.summary || 'No summary available'}
                        </p>
                        <Link to={`/journals/${journal.id}`}>
                          <Button
                            className='bg-blue-500 text-white hover:bg-blue-600'
                            size='sm'
                          >
                            View Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </div>
    </section>
  )
}