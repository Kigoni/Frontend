'use client'

import { LabelList, RadialBar, RadialBarChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { browser: 'zulu', visitors: 275, fill: 'var(--color-zulu)' },
  { browser: 'french', visitors: 200, fill: 'var(--color-french)' },
  { browser: 'english', visitors: 187, fill: 'var(--color-english)' },
  { browser: 'swahili', visitors: 173, fill: 'var(--color-swahili)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  zulu: {
    label: 'Zulu',
    color: 'hsl(var(--chart-1))',
  },
  french: {
    label: 'French',
    color: 'hsl(var(--chart-2))',
  },
  english: {
    label: 'English',
    color: 'hsl(var(--chart-3))',
  },
  swahili: {
    label: 'Swahili',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig
export function RadialChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square h-[300px]'
    >
      <RadialBarChart
        data={chartData}
        startAngle={-90}
        endAngle={380}
        innerRadius={30}
        outerRadius={110}
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
        {/* <ChartLegend
          content={<ChartLegendContent nameKey='browser' />}
          className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
        /> */}
      </RadialBarChart>
    </ChartContainer>
  )
}
