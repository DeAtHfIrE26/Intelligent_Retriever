import { 
  FileText, Search, Clock, Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  analytics: {
    documentsIndexed: number;
    searchesPerformed: number;
    averageQueryTime: string;
  };
}

export default function StatsCards({ analytics }: StatsCardsProps) {
  if (!analytics) return null;
  
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Document count */}
      <Card className="bg-white overflow-hidden shadow">
        <CardContent className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">Documents Indexed</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">
                    {analytics.documentsIndexed.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Searches */}
      <Card className="bg-white overflow-hidden shadow">
        <CardContent className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-violet-100 rounded-md p-3">
              <Search className="h-6 w-6 text-violet-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">Searches Performed</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">
                    {analytics.searchesPerformed.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Query time */}
      <Card className="bg-white overflow-hidden shadow">
        <CardContent className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">Avg. Query Time</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">
                    {analytics.averageQueryTime}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI features */}
      <Card className="bg-white overflow-hidden shadow">
        <CardContent className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-slate-500 truncate">AI-Powered Features</dt>
                <dd>
                  <div className="text-lg font-semibold text-slate-900">7 Active</div>
                </dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
