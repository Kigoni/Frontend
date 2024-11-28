import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { Link } from 'react-router-dom'
  import { motion } from 'framer-motion'
  import { Badge } from '@/components/ui/badge'
  import { CheckCircle2, XCircle } from 'lucide-react'
  
  export function JournalsTable({ journals }: { journals: Array<{
    id: string;
    journal_title?: string;
    publishers_name?: string;
    thematic_area?: {
      thematic_area: string;
    };
    indexed_on_google_scholar: boolean;
    indexed_on_scopus: boolean;
  }> }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Journals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Publisher</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Indexed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journals.map((journal, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      <Link 
                        to={`/journals/${journal.id}`}
                        className="text-primary hover:underline"
                      >
                        {journal.journal_title || 'Untitled Journal'}
                      </Link>
                    </TableCell>
                    <TableCell>{journal.publishers_name || 'Unspecified'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10">
                        {journal.thematic_area?.thematic_area || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {journal.indexed_on_google_scholar ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        {journal.indexed_on_scopus ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }