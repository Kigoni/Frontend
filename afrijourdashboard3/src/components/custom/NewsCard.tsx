import { motion } from 'framer-motion';
import { Calendar, ExternalLink, BookOpen, Newspaper, Award } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NewsCardProps = {
  article: {
    id: number;
    title: string;
    summary: string;
    date: string;
    link: string;
    category: string;
    imageUrl?: string;
  };
  index: number;
};

const categoryIcons = {
  blog: BookOpen,
  news: Newspaper,
  funding: Award,
};

const categoryColors = {
  blog: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  news: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  funding: 'bg-green-100 text-green-800 hover:bg-green-200',
};

export function NewsCard({ article, index }: NewsCardProps) {
  const Icon = categoryIcons[article.category as keyof typeof categoryIcons];
  const colorClass = categoryColors[article.category as keyof typeof categoryColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="group h-full hover:shadow-lg transition-shadow duration-300">
        {article.imageUrl && (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className={cn('flex items-center gap-1', colorClass)}>
              <Icon className="w-3 h-3" />
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {article.date}
            </div>
          </div>
          <h3 className="text-xl font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground line-clamp-3">{article.summary}</p>
          <Button asChild variant="outline" className="w-full group">
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              Read More
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}