import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, Search, Edit, Eye, Terminal
} from "lucide-react";

interface ActivityLogProps {
  activities: Array<{
    id: number;
    type: string;
    user?: string;
    document?: string;
    query?: string;
    message?: string;
    time: string;
  }>;
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  if (!activities || activities.length === 0) {
    return (
      <Card className="bg-white shadow rounded-lg mt-6">
        <CardHeader className="border-b border-slate-200">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="text-sm text-slate-500">No recent activity</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden">
      <CardHeader className="px-4 py-5 border-b border-slate-200">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-5">
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className="flex-shrink-0">
                {activity.type === 'document_added' && (
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-green-100 text-green-600">
                    <PlusCircle className="h-5 w-5" />
                  </span>
                )}
                {activity.type === 'search' && (
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-primary-100 text-primary-600">
                    <Search className="h-5 w-5" />
                  </span>
                )}
                {activity.type === 'document_updated' && (
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-yellow-100 text-yellow-600">
                    <Edit className="h-5 w-5" />
                  </span>
                )}
                {activity.type === 'document_accessed' && (
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-violet-100 text-violet-600">
                    <Eye className="h-5 w-5" />
                  </span>
                )}
                {activity.type === 'system' && (
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-slate-100 text-slate-600">
                    <Terminal className="h-5 w-5" />
                  </span>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="text-sm font-medium text-slate-900">
                  {activity.type === 'document_added' && activity.user && activity.document && (
                    <span>{activity.user} added document "{activity.document}"</span>
                  )}
                  {activity.type === 'search' && activity.user && activity.query && (
                    <span>{activity.user} searched for "{activity.query}"</span>
                  )}
                  {activity.type === 'document_updated' && activity.user && activity.document && (
                    <span>{activity.user} updated document "{activity.document}"</span>
                  )}
                  {activity.type === 'document_accessed' && activity.user && activity.document && (
                    <span>{activity.user} accessed document "{activity.document}"</span>
                  )}
                  {activity.type === 'system' && activity.message && (
                    <span>{activity.message}</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-slate-500">{activity.time}</div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t border-slate-200 px-4 py-4">
        <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
          View all activity <span aria-hidden="true">→</span>
        </a>
      </CardFooter>
    </Card>
  );
}
