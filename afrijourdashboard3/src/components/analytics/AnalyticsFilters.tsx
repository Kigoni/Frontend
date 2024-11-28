import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface Filters {
  country: string
  thematicArea: string
  language: string
  doaj: string
  oaj: string
  africanPublisher: string
  inasps: string
  cope: string
  issn: string
  googleScholar: boolean
  scopus: boolean
}

interface AnalyticsFiltersProps {
  filters: Filters
  onCriteriaChange: (filters: Filters) => void
  onSearch: () => void
  loading: boolean
}

export function AnalyticsFilters({
  filters,
  onCriteriaChange,
  onSearch,
  loading,
}: AnalyticsFiltersProps) {
  const handleChange = (key: keyof Filters, value: string | boolean) => {
    onCriteriaChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Journals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={filters.country}
              onChange={(e) => handleChange('country', e.target.value)}
              placeholder="Enter country name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thematicArea">Thematic Area</Label>
            <Input
              id="thematicArea"
              value={filters.thematicArea}
              onChange={(e) => handleChange('thematicArea', e.target.value)}
              placeholder="Enter thematic area"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              value={filters.language}
              onChange={(e) => handleChange('language', e.target.value)}
              placeholder="Enter language"
            />
          </div>
        </div>

        {/* Dropdown Selections */}
        <div className="space-y-4">
          {[
            { id: 'doaj', label: 'Directory of Open Access Journal (DOAJ)' },
            { id: 'oaj', label: 'Open Access Journal (OAJ)' },
            { id: 'africanPublisher', label: 'Online Publisher in Africa' },
            { id: 'inasps', label: "Hosted on INASP's Journals" },
            { id: 'cope', label: 'Member of COPE' },
            { id: 'issn', label: 'Listed on ISSN Portal' },
          ].map((item) => (
            <div key={item.id} className="space-y-2">
              <Label htmlFor={item.id}>{item.label}</Label>
              <Select
                value={filters[item.id as keyof Filters] as string}
                onValueChange={(value) => handleChange(item.id as keyof Filters, value)}
              >
                <SelectTrigger id={item.id}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* Toggle Switches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="googleScholar">Google Scholar Indexed</Label>
            <Switch
              id="googleScholar"
              checked={filters.googleScholar}
              onCheckedChange={(checked) => handleChange('googleScholar', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="scopus">Scopus Indexed</Label>
            <Switch
              id="scopus"
              checked={filters.scopus}
              onCheckedChange={(checked) => handleChange('scopus', checked)}
            />
          </div>
        </div>

        {/* Search Button */}
        <Button
          className="w-full"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search Journals'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}