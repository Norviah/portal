"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "milestone" | "message" | "decision" | "upload" | "payment" | "system";
  title: string;
  description?: string;
  timestamp: string;
  status?: "completed" | "pending" | "in_progress" | "cancelled";
  user?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxItems?: number;
  className?: string;
}

const activityIcons = {
  milestone: "🎯",
  message: "💬", 
  decision: "✅",
  upload: "📁",
  payment: "💰",
  system: "⚙️"
};

const statusColors = {
  completed: "bg-green-500",
  pending: "bg-yellow-500", 
  in_progress: "bg-blue-500",
  cancelled: "bg-red-500"
};

export function ActivityFeed({ 
  activities, 
  title = "Recent Activity",
  maxItems = 5,
  className 
}: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent activity
            </p>
          ) : (
            displayActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  activity.status ? statusColors[activity.status] : "bg-gray-400"
                )} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{activityIcons[activity.type]}</span>
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    {activity.status && (
                      <Badge variant="outline" className="text-xs">
                        {activity.status.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                  {activity.description && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {activity.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                    {activity.user && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">
                          by {activity.user}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
