import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalyticsPanelProps {
  analytics: {
    topSearchTerms: Array<{term: string, count: number}>;
    usageOverTime: number[];
  };
}

export default function AnalyticsPanel({ analytics }: AnalyticsPanelProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!chartRef.current || !analytics?.usageOverTime) return;
    
    // Make sure Chart.js is loaded
    import('chart.js/auto').then((Chart) => {
      const ctx = chartRef.current?.getContext('2d');
      if (!ctx) return;
      
      // Destroy existing chart if it exists
      const existingChart = (chartRef.current as any)._chart;
      if (existingChart) {
        existingChart.destroy();
      }
      
      // Create new chart
      (chartRef.current as any)._chart = new Chart.default(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Searches',
            data: analytics.usageOverTime,
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: 'rgba(37, 99, 235, 1)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(226, 232, 240, 0.5)'
              },
              ticks: {
                font: {
                  size: 10
                },
                color: '#94a3b8'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 10
                },
                color: '#94a3b8'
              }
            }
          }
        }
      });
    });
    
    return () => {
      // Cleanup
      const existingChart = (chartRef.current as any)?._chart;
      if (existingChart) {
        existingChart.destroy();
      }
    };
  }, [analytics?.usageOverTime]);
  
  if (!analytics) return null;
  
  const maxCount = analytics.topSearchTerms?.[0]?.count || 0;
  
  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden mt-6">
      <CardHeader className="px-4 py-5 border-b border-slate-200">
        <CardTitle className="text-lg font-medium">Search Analytics</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-5">
        <div className="h-48">
          <canvas ref={chartRef} id="analyticsChart"></canvas>
        </div>
        
        <h4 className="text-sm font-medium text-slate-700 mt-6 mb-3">Top Search Terms</h4>
        <div className="space-y-2">
          {analytics.topSearchTerms?.map((term, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{term.term}</span>
              <div className="w-32 bg-slate-200 rounded-full h-2.5">
                <Progress 
                  value={maxCount ? (term.count / maxCount) * 100 : 0} 
                  className="h-2.5 bg-primary-600"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
