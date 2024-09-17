'use client'

import { LabelList, Pie, PieChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChartLegend, ChartLegendContent } from '../../../components/ui/chart'
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

export function LanguagePiechart() {
  return (
    <ChartContainer config={chartConfig} className='mx-auto aspect-square'>
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey='visitors' hideLabel />}
        />
        <Pie data={chartData} dataKey='visitors'>
          <LabelList
            dataKey='browser'
            className='fill-background'
            stroke='none'
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey='browser' />}
          className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
        />
      </PieChart>
    </ChartContainer>
  )
}
