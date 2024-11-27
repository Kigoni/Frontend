import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Newspaper, Award } from 'lucide-react';

type CategoryTabsProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-3 h-14">
        <TabsTrigger value="all" className="flex items-center gap-2">
          <Newspaper className="w-4 h-4" />
          All Updates
        </TabsTrigger>
        <TabsTrigger value="blog" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Blog Articles
        </TabsTrigger>
        <TabsTrigger value="funding" className="flex items-center gap-2">
          <Award className="w-4 h-4" />
          Funding
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}