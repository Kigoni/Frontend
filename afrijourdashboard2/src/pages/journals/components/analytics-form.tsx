/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FAt2GlkdQrf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
export default function AnalyticsForm() {
  return (
    <section>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='country'>Country</Label>
          <Select>
            <SelectTrigger id='country'>
              <SelectValue placeholder='All Countries' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='discipline'>Discipline</Label>
          <Select>
            <SelectTrigger id='discipline'>
              <SelectValue placeholder='All Disciplines' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='language'>Language</Label>
          <Select>
            <SelectTrigger id='language'>
              <SelectValue placeholder='All Languages' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='indexed-on'>Indexed on</Label>
          <div className='flex items-center space-x-2'>
            <Checkbox id='google-scholar' />
            <Label htmlFor='google-scholar'>Google Scholar</Label>
            <Checkbox id='scopus' />
            <Label htmlFor='scopus'>Scopus</Label>
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='doaj'>
            Listed on Directory of Open Access Journal (DOAJ)
          </Label>
          <Select>
            <SelectTrigger id='doaj'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='oaj'>Listed on Open Access Journal (OAJ)</Label>
          <Select>
            <SelectTrigger id='oaj'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='publisher-africa'>
            Online Publisher Based in Africa
          </Label>
          <Select>
            <SelectTrigger id='publisher-africa'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='inasp'>Hosted on INASP's Journals Online</Label>
          <Select>
            <SelectTrigger id='inasp'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='cope'>
            Member of Committee on Publication Ethics (COPE)
          </Label>
          <Select>
            <SelectTrigger id='cope'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='issn'>
            Listed on International Standard Serial Number (ISSN) Portal
          </Label>
          <Select>
            <SelectTrigger id='issn'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
          </Select>
        </div>
      </div>
    </section>
  )
}
