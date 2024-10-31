'use client';

import { useEffect, useState } from 'react';
import { LabelList, Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartLegend } from '../../../components/ui/chart';
import { AiOutlineInbox } from 'react-icons/ai'; // Example of a "no data" icon from react-icons

// Define types for your chart data
interface LanguageData {
  language: string;
  journal_count: number;
}

interface FormattedChartData {
  browser: string; // Shortened name for the pie chart
  fullLanguage: string; // Full name for the legend
  visitors: number;
  fill: string; // Color for the pie slice
}

// Define a type for auth tokens
interface AuthTokens {
  access: string;
  refresh: string;
}

// Define the chart configuration
const chartConfig: ChartConfig = {
  visitors: {
    label: 'Journals',
  },
} satisfies ChartConfig;

// Function to get the auth tokens from local storage
const getAuthTokens = (): AuthTokens | null => {
  const tokens = localStorage.getItem('authTokens'); // Adjust the key based on your implementation
  return tokens ? JSON.parse(tokens) : null;
};

// Generate a random color in HSL format
const generateRandomColor = (index: number): string => {
  const hue = (index * 36) % 360; // Spread colors evenly in the hue circle
  return `hsl(${hue}, 70%, 50%)`; // Adjust saturation and lightness as desired
};

// Function to shorten long language names
const shortenLanguageName = (name: string, maxLength: number = 7): string => {
  return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
};

const CustomLegendContent = ({ data }: { data: FormattedChartData[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div
            style={{ backgroundColor: entry.fill }}
            className="w-4 h-4 mr-1"
          ></div>
          <span>{entry.fullLanguage}</span> {/* Show full language name in the legend */}
        </div>
      ))}
    </div>
  );
};

export function LanguagePiechart() {
  const [chartData, setChartData] = useState<FormattedChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authTokens = getAuthTokens();
        const accessToken = authTokens?.access; // Retrieve the access token
        const response = await fetch('https://aphrc.site/journal_api/api/user-languages/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: LanguageData[] = await response.json();
        const formattedData: FormattedChartData[] = data.map((item, index) => ({
          browser: shortenLanguageName(item.language), // Shortened name for the pie chart
          fullLanguage: item.language, // Full name for the legend
          visitors: item.journal_count,
          fill: generateRandomColor(index), // Generate a random color for each language
        }));

        setChartData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if there's no data to display
  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AiOutlineInbox size={48} className="text-gray-500" />
        <p className="text-gray-500 mt-2">No Data Available</p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className='mx-auto aspect-square'>
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey='visitors' hideLabel />}
        />
        <Pie data={chartData} dataKey='visitors' isAnimationActive={false}>
          <LabelList
            dataKey='browser' // Use shortened names for the labels in the pie chart
            className='fill-background'
            stroke='none'
            fontSize={12}
            formatter={(value: string) => value} // Show shortened language names
          />
        </Pie>
        <ChartLegend
          content={<CustomLegendContent data={chartData} />} // Use full names in the custom legend
          className='-translate-y-2 flex-wrap gap-2'
        />
      </PieChart>
    </ChartContainer>
  );
}
