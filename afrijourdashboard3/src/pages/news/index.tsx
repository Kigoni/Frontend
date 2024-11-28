import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layout } from '@/components/custom/layout';
import { NewsCard } from '@/components/custom/NewsCard';
import { CategoryTabs } from '@/components/custom/CategoryTabs';

type Article = {
  id: number;
  title: string;
  summary: string;
  date: string;
  link: string;
  category: string;
  imageUrl?: string;
};

const mockArticles: Article[] = [
  {
    id: 1,
    title: "New Research Funding Initiative for African Scholars",
    summary: "A major foundation announces $10M in research grants specifically for African journal publications and academic research projects.",
    date: "2024-01-15",
    link: "#",
    category: "funding",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Digital Transformation in African Academic Publishing",
    summary: "How African journals are embracing digital technologies to increase global visibility and impact.",
    date: "2024-01-14",
    link: "#",
    category: "blog",
    imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80"
  },
];

export default function NewsUpdates() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <Layout.Header className="relative min-h-[25vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 -z-10 bg-[#AFEEEE]" />
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-6 bg-gray-{shade}">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold bg-gradient-to-r from-[#412c9e] to-[#080808] font-bold bg-clip-text text-transparent leading-tight"
            >
              Afrika Journals News & Updates
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-black font-bold text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Stay informed with the latest developments in African academic publishing,
              research opportunities, and scholarly achievements.
            </motion.p>
          </div>
        </div>
      </Layout.Header>

      <Layout.Body className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <CategoryTabs 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search updates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-28rem)]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-[400px] bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => (
                    <NewsCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </Layout.Body>
    </Layout>
  );
}