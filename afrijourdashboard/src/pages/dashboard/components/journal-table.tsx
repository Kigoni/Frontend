/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VifeJR8PCdP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { useState,useEffect } from 'react'
export default function JournalTable() {
  const [openAccessJournal,setOpenAccessJournal]=useState(0);
  const [inasps,setInasps]=useState(0);
  const [hostAfrica,setHostAfrica]=useState(0);
  const [doaj,setDoaj]=useState(0);
  const [cope,setCope]=useState(0);
  const [issn,setIssn]=useState(0);
  // Fetch journals with search and pagination
  const fetchJournalsStats = async () => {
    const response = await fetch(`http://198.211.110.243/journal_api/journal_stats/`);
    const data = await response.json();
    console.log(data); 
    setOpenAccessJournal(data.open_access_journal_count);
    setInasps(data.hosted_on_inasps_count);
    setHostAfrica(data.online_publisher_africa_count);
    setDoaj(data.doaj_count);
    setCope(data.cope_count);
    setIssn(data.issn_count);
  };

  useEffect(() => {
    fetchJournalsStats();
  });
  return (
    <div className='flex flex-col'>
      <div className='rounded-lg border shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Journal Name</TableHead>
              <TableHead>Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <p className='font-medium'>OPEN ACCESS JOURNAL</p>
              </TableCell>
              <TableCell>{openAccessJournal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p className='font-medium'>HOSTED ON INASP'S JOURNAL ONLINE</p>
              </TableCell>
              <TableCell>{inasps}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p className='font-medium'>ONLINE PUBLISHER BASED IN AFRICA</p>
              </TableCell>
              <TableCell>{hostAfrica}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p className='font-medium'>DIRECTORY OF OPEN ACCESS (DOAJ)</p>
              </TableCell>
              <TableCell>{doaj}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p className='font-medium'>PUBLISHER IS A MEMBER OF COPE</p>
              </TableCell>
              <TableCell>{cope}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p className='font-medium'>ON ISSN PORTAL</p>
              </TableCell>
              <TableCell>{issn}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
