'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { country: 'Kenya', desktop: 186, mobile: 80 },
  { country: 'South Africa', desktop: 305, mobile: 200 },
  { country: 'Nigeria', desktop: 237, mobile: 120 },
  { country: 'Tanzania', desktop: 73, mobile: 190 },
  { country: 'Cameroon', desktop: 209, mobile: 130 },
  { country: 'Ghana', desktop: 214, mobile: 140 },
  { country: 'Ivory Coast', desktop: 214, mobile: 130 },
  { country: 'Senegal', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig

export function DistributionChart() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout='vertical'
          margin={{
            right: 16,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey='country'
            type='category'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey='desktop' type='number' hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator='line' />}
          />
          <Bar
            dataKey='desktop'
            layout='vertical'
            fill='var(--color-desktop)'
            radius={4}
          >
            <LabelList
              dataKey='country'
              position='insideLeft'
              offset={8}
              className='fill-[--color-label]'
              fontSize={12}
            />
            <LabelList
              dataKey='desktop'
              position='right'
              offset={8}
              className='fill-foreground'
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
