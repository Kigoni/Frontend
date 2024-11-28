import { Button } from '@/components/ui/button'
import { Download, Upload } from 'lucide-react'

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into academic journals across Africa
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="default" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  )
}