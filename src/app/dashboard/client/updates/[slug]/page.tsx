"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { ManagerLayout } from "@/components/manager/manager-layout";
// import { ManagerOverview } from "@/components/manager/manager-overview";
import { GetBoard, type GetBoards } from "@/actions/test";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { ClientLayout } from "@/components/Layouts";
import { TweetPost } from "./tweet-component";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { AppSidebar } from "@/components/sidebar/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function ManagerPage({ params }: { params: Promise<{ slug: string }> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<typeof GetBoard>> | undefined>(undefined);
  const { slug } = use(params);

  useEffect(() => {
    GetBoard(slug)
      .then((x) => {
        setData(x);
        setIsDataLoading(false);
      })
      .catch((x) => {
        setData(undefined);
        setIsDataLoading(false);
      });
  }, []);

  if (isDataLoading || !data) {
    return (
      <SidebarProvider>
        <AppSidebar role="client" user={user ? { name: user.name || "", email: user.email || "" } : undefined} />
        <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
          <DashboardHeader
            title="Project Messages"
            description="Communicate with your project team and stay updated"
            breadcrumbs={[
              { label: "Client Portal", href: "/dashboard/client" },
              { label: "Project Communication", href: "#" },
              { label: "Updates", isCurrentPage: true },
            ]}
            user={user ? { name: user.name, role: user.role } : undefined}
          />

          <span>Loading...</span>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // return (
  //   <ManagerLayout user={user}>

  //     <Card className="rounded-sm p-10">
  //       <ProjectRadioGroup data={data} />
  //     </Card>
  //   </ManagerLayout>
  // )

  return (
    <SidebarProvider>
      <AppSidebar role="client" user={user ? { name: user.name || "", email: user.email || "" } : undefined} />
      <SidebarInset className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 min-h-screen">
        <DashboardHeader
          title="Project Messages"
          description="Communicate with your project team and stay updated"
          breadcrumbs={[
            { label: "Client Portal", href: "/dashboard/client" },
            { label: "Project Communication", href: "#" },
            { label: "Updates", isCurrentPage: true },
          ]}
          user={user ? { name: user.name, role: user.role } : undefined}
        />

        <div className="space-y-4 w-md grid p-10">
          {data.map((tweet) => (
            <TweetPost data={tweet} key={tweet.id} />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const projects = [
  "E-commerce Website",
  "Task Management App",
  "Weather Dashboard",
  "Social Media Platform",
  "Blog CMS",
  "Portfolio Website",
  "Chat Application",
  "Expense Tracker",
  "Recipe Manager",
  "Fitness Tracker",
];

// export default function ProjectList() {
// }

// function RadioGroup({ data }: { data: Awaited<ReturnType<typeof GetBoards>> }) {
//   return (
// <>
//       <div className="flex items-center mb-4">
//       <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//       <label for="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
//   </div>
//   <div className="flex items-center">
//       <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//       <label for="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
//   </div>
//   </>
//   )
// }
