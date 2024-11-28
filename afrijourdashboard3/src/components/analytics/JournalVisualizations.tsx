import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BarChart2, PieChart as PieChartIcon } from 'lucide-react'

export function JournalVisualizations({ journals }: { journals: any[] }) {
  const [activeChart, setActiveChart] = useState<'bar' | 'pie'>('bar')

  // Process data for visualizations
  const thematicAreaData = journals.reduce((acc: { [x: string]: any }, journal: { thematic_area: { thematic_area: string } }) => {
    const area = journal.thematic_area?.thematic_area || 'Unspecified'
    acc[area] = (acc[area] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(thematicAreaData).map(([name, value]) => ({
    name,
    value
  }))

  const colors = [
    '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6',
    '#6366f1', '#14b8a6', '#f43f5e', '#84cc16', '#06b6d4'
  ]
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card className="transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Distribution by Thematic Area</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={activeChart === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveChart('bar')}
          >
            <BarChart2 className="h-4 w-4" />
          </Button>
          <Button
            variant={activeChart === 'pie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveChart('pie')}
          >
            <PieChartIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === 'bar' ? (
              <BarChart data={chartData} margin={{ bottom: 70 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                />
                <Bar dataKey="value" fill="#8b5cf6">
                  {chartData.map((_entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((_entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}