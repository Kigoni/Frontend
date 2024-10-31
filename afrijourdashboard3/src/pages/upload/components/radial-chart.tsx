'use client';

import { useEffect, useState } from 'react';
import { LabelList, RadialBar, RadialBarChart } from 'recharts';
import { AiOutlineInbox } from 'react-icons/ai'; // Import the "no data" icon
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Define types for your chart data
interface ThematicAreaData {
  thematic_area: string;
  journal_count: number;
}

interface FormattedChartData {
  browser: string; // Thematic area name for the radial chart
  fullThematicArea: string; // Full name for the legend
  visitors: number; // Count of journals
  fill: string; // Color for the bar
}

// Define a type for auth tokens
interface AuthTokens {
  access: string;
  refresh: string;
}

// Define the chart configuration
const chartConfig: ChartConfig = {
  visitors: {
    label: 'Journal Count',
  },
  // Define colors for your thematic areas as needed
  science: {
    label: 'Science',
    color: 'hsl(var(--chart-1))',
  },
  theology: {
    label: 'Theology',
    color: 'hsl(var(--chart-2))',
  },
  // Add more thematic areas as needed...
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

export function RadialChart() {
  const [chartData, setChartData] = useState<FormattedChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authTokens = getAuthTokens();
        const accessToken = authTokens?.access; // Retrieve the access token
        const response = await fetch('https://aphrc.site/journal_api/api/user-thematic/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: ThematicAreaData[] = await response.json();
        const formattedData: FormattedChartData[] = data.map((item, index) => ({
          browser: item.thematic_area, // Use full thematic area name for the radial chart
          fullThematicArea: item.thematic_area, // Full name for the legend
          visitors: item.journal_count,
          fill: generateRandomColor(index), // Generate a random color for each thematic area
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
    <ChartContainer config={chartConfig} className='mx-auto aspect-square h-[300px]'>
      <RadialBarChart
        data={chartData}
        startAngle={-90}
        endAngle={380}
        innerRadius={30}
        //outerRadius={110}
        outerRadius={90}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey='browser' />}
        />
        <RadialBar dataKey='visitors' background>
          <LabelList
            position='insideStart'
            dataKey='browser'
            className='fill-white capitalize mix-blend-luminosity'
            fontSize={11}
          />
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
  );
}
