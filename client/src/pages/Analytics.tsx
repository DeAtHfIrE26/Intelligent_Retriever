import { useQuery } from "@tanstack/react-query";
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Search, 
  Clock, 
  FileText, 
  Calendar,
  Download,
  ArrowUpDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, 
  BarChart,
  LineChart,
  PieChart,
  Area, 
  Bar, 
  Line,
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { AnalyticsData, FormattedActivityLog } from "../../../shared/schema";

// Example data - would come from API in real app
const dailyUsageData = [
  { day: "Mon", searches: 45, documents: 12 },
  { day: "Tue", searches: 52, documents: 15 },
  { day: "Wed", searches: 49, documents: 11 },
  { day: "Thu", searches: 63, documents: 18 },
  { day: "Fri", searches: 58, documents: 21 },
  { day: "Sat", searches: 48, documents: 16 },
  { day: "Sun", searches: 38, documents: 10 },
];

const categoryDistribution = [
  { name: "Technical", value: 35 },
  { name: "Finance", value: 25 },
  { name: "Product", value: 20 },
  { name: "Research", value: 15 },
  { name: "Other", value: 5 },
];

const userEngagementData = [
  { month: "Jan", activeUsers: 120, documentViews: 340, queries: 280 },
  { month: "Feb", activeUsers: 132, documentViews: 362, queries: 301 },
  { month: "Mar", activeUsers: 141, documentViews: 406, queries: 352 },
  { month: "Apr", activeUsers: 154, documentViews: 448, queries: 389 },
  { month: "May", activeUsers: 162, documentViews: 490, queries: 412 },
  { month: "Jun", activeUsers: 182, documentViews: 521, queries: 458 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("area");

  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics'],
  });

  const { data: activityLogs, isLoading: isLoadingActivity } = useQuery<FormattedActivityLog[]>({
    queryKey: ['/api/activity'],
  });

  // Get search activity from logs
  const searchActivity = activityLogs?.filter(log => log.type === 'search') || [];
  const documentActivity = activityLogs?.filter(log => log.type === 'document_viewed') || [];
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
            <p className="text-slate-600">Track usage, performance and engagement</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingAnalytics ? (
                  <div className="h-8 bg-slate-100 rounded w-16 animate-pulse"></div>
                ) : (
                  analyticsData?.documentsIndexed || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(Math.random() * 10)}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Searches Performed
              </CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingAnalytics ? (
                  <div className="h-8 bg-slate-100 rounded w-16 animate-pulse"></div>
                ) : (
                  analyticsData?.searchesPerformed || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(Math.random() * 15)}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Query Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingAnalytics ? (
                  <div className="h-8 bg-slate-100 rounded w-16 animate-pulse"></div>
                ) : (
                  analyticsData?.averageQueryTime || "0ms"
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                -{Math.floor(Math.random() * 20)}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingAnalytics ? (
                  <div className="h-8 bg-slate-100 rounded w-16 animate-pulse"></div>
                ) : (
                  Math.floor(Math.random() * 100) + 20
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(Math.random() * 12)}% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Usage</CardTitle>
                  <CardDescription>
                    Search queries and document uploads over time
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="area">Area</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "area" ? (
                    <AreaChart data={dailyUsageData}>
                      <defs>
                        <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDocuments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="searches" stroke="#8884d8" fillOpacity={1} fill="url(#colorSearches)" name="Searches" />
                      <Area type="monotone" dataKey="documents" stroke="#82ca9d" fillOpacity={1} fill="url(#colorDocuments)" name="Documents" />
                    </AreaChart>
                  ) : chartType === "line" ? (
                    <LineChart data={dailyUsageData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="searches" stroke="#8884d8" name="Searches" strokeWidth={2} />
                      <Line type="monotone" dataKey="documents" stroke="#82ca9d" name="Documents" strokeWidth={2} />
                    </LineChart>
                  ) : (
                    <BarChart data={dailyUsageData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="searches" fill="#8884d8" name="Searches" />
                      <Bar dataKey="documents" fill="#82ca9d" name="Documents" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Document Categories</CardTitle>
              <CardDescription>
                Distribution of documents by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: { name: string; percent: number }) => 
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {categoryDistribution.map((entry, index) => (
                        <rect key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                User activity metrics over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="activeUsers" fill="#8884d8" name="Active Users" />
                    <Bar dataKey="documentViews" fill="#82ca9d" name="Document Views" />
                    <Bar dataKey="queries" fill="#ffc658" name="Search Queries" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabbed content */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Detailed Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="search">
              <TabsList className="mb-4">
                <TabsTrigger value="search">
                  <Search className="h-4 w-4 mr-2" />
                  Search Activity
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  Document Activity
                </TabsTrigger>
                <TabsTrigger value="performance">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  System Performance
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="search" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Query</TableHead>
                      <TableHead className="text-right">Results</TableHead>
                      <TableHead className="text-right">Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchActivity.length > 0 ? (
                      searchActivity.map((log, index) => (
                        <TableRow key={log.id || index}>
                          <TableCell className="font-medium">{log.time}</TableCell>
                          <TableCell>{log.user || "Anonymous"}</TableCell>
                          <TableCell>{log.query || "N/A"}</TableCell>
                          <TableCell className="text-right">{Math.floor(Math.random() * 20) + 1}</TableCell>
                          <TableCell className="text-right">{(Math.random() * 200).toFixed(0)}ms</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No search activity data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Document</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead className="text-right">Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentActivity.length > 0 ? (
                      documentActivity.map((log, index) => (
                        <TableRow key={log.id || index}>
                          <TableCell className="font-medium">{log.time}</TableCell>
                          <TableCell>{log.user || "Anonymous"}</TableCell>
                          <TableCell>{log.document || "Unknown document"}</TableCell>
                          <TableCell>Viewed</TableCell>
                          <TableCell className="text-right">{(Math.random() * 60).toFixed(0)}s</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No document activity data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Peak</TableHead>
                      <TableHead className="text-right">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Search Response Time</TableCell>
                      <TableCell>{(Math.random() * 100).toFixed(0)}ms</TableCell>
                      <TableCell>{(Math.random() * 150).toFixed(0)}ms</TableCell>
                      <TableCell>{(Math.random() * 300).toFixed(0)}ms</TableCell>
                      <TableCell className="text-right text-green-600">↓ 12%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Indexing Speed</TableCell>
                      <TableCell>{(Math.random() * 5).toFixed(1)} docs/s</TableCell>
                      <TableCell>{(Math.random() * 4).toFixed(1)} docs/s</TableCell>
                      <TableCell>{(Math.random() * 10).toFixed(1)} docs/s</TableCell>
                      <TableCell className="text-right text-green-600">↑ 8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cache Hit Rate</TableCell>
                      <TableCell>{(Math.random() * 100).toFixed(0)}%</TableCell>
                      <TableCell>{(Math.random() * 100).toFixed(0)}%</TableCell>
                      <TableCell>{(Math.random() * 100).toFixed(0)}%</TableCell>
                      <TableCell className="text-right text-green-600">↑ 5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">API Response Time</TableCell>
                      <TableCell>{(Math.random() * 80).toFixed(0)}ms</TableCell>
                      <TableCell>{(Math.random() * 100).toFixed(0)}ms</TableCell>
                      <TableCell>{(Math.random() * 200).toFixed(0)}ms</TableCell>
                      <TableCell className="text-right text-green-600">↓ 9%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}