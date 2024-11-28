import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface SearchSectionProps {
  searchType: string
  searchQuery: string
  onSearchTypeChange: (type: string) => void
  onSearchQueryChange: (query: string) => void
  onSearch: () => void
}

export function SearchSection({
  searchType,
  searchQuery,
  onSearchTypeChange,
  onSearchQueryChange,
  onSearch,
}: SearchSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-background px-6 py-12"
    >
      <div className="mx-auto max-w-3xl">
        <RadioGroup
          value={searchType}
          onValueChange={onSearchTypeChange}
          className="mb-6 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="abstract" id="abstract" />
            <Label htmlFor="abstract">Search by abstract</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="keyword" id="keyword" />
            <Label htmlFor="keyword">Search by keywords, title, discipline...</Label>
          </div>
        </RadioGroup>

        <div className="relative">
          <Input
            className="h-14 rounded-full bg-background pl-6 pr-16 text-lg shadow-lg"
            placeholder={searchType === 'abstract' ? 'Search by abstract...' : 'Enter keywords, journal title, discipline...'}
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
          <Button
            size="icon"
            className="absolute right-2 top-2 h-10 w-10 rounded-full"
            onClick={onSearch}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </motion.section>
  )
}