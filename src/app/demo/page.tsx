// biome-ignore-all lint: dummy code.

"use client";

import Image from "next/image";

import { DemoCookieSettings } from "./components/cookie-settings";
import { DemoCreateAccount } from "./components/create-account";
import { DemoDatePicker } from "./components/date-picker";
import { DemoGithub } from "./components/github-card";
import { DemoNotifications } from "./components/notifications";
import { DemoPaymentMethod } from "./components/payment-method";
import { DemoReportAnIssue } from "./components/report-an-issue";
import { DemoShareDocument } from "./components/share-document";
import { DemoTeamMembers } from "./components/team-members";
import { Button, IconButton } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { Search } from "./components/search";
import TeamSwitcher from "./components/team-switcher";
import { UserNav } from "./components/user-nav";

import { cn } from "@/lib/utils";
import { Blockquote } from "@/components/ui/Blockquote";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { CircleAlertIcon, CircleCheckIcon, CopyIcon, InfoIcon } from "lucide-react";
import { toast } from "sonner";
import { ThemeSelector } from "@/components/ThemeSelector";

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <Image src="/examples/dashboard-light.png" width={1280} height={866} alt="Dashboard" className="block dark:hidden" />
        <Image src="/examples/dashboard-dark.png" width={1280} height={866} alt="Dashboard" className="hidden dark:block" />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="font-bold text-3xl text-foreground-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />

              <Button variant="primary">Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-card-foreground-light"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground-bold">$45,231.89</div>
                    <p className="text-xs text-card-foreground-light">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-card-foreground-light"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground-bold">+2350</div>
                    <p className="text-xs text-card-foreground-light">+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-card-foreground-light"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground-bold">+12,234</div>
                    <p className="text-xs text-card-foreground-light">+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex items-center flex-row justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-card-foreground-light"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground-bold">+573</div>
                    <p className="text-xs text-card-foreground-light">+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>You made 265 sales this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="hidden items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2 xl:grid-cols-3">
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
              <DemoContainer>
                <DemoCreateAccount />
              </DemoContainer>
              <DemoContainer>
                <DemoPaymentMethod />
              </DemoContainer>
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
              <DemoContainer>
                <DemoTeamMembers />
              </DemoContainer>
              <DemoContainer>
                <DemoShareDocument />
              </DemoContainer>
              <DemoContainer>
                <DemoDatePicker />
              </DemoContainer>
              <DemoContainer>
                <DemoNotifications />
              </DemoContainer>
            </div>
            <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
              <DemoContainer>
                <DemoReportAnIssue />
              </DemoContainer>
              <DemoContainer>
                <DemoGithub />
              </DemoContainer>
              <DemoContainer>
                <DemoCookieSettings />
              </DemoContainer>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-3">
              <p className="text-foreground-bold">
                Ea nisi esse do labore nisi magna eu est magna. Irure fugiat culpa non ullamco aliqua ea. Et anim dolor fugiat ad veniam cupidatat deserunt culpa. Exercitation cupidatat
                commodo ad Lorem velit velit culpa ea do.
              </p>

              <p className="text-foreground">
                Adipisicing nostrud tempor enim ex deserunt. Cupidatat et ullamco officia proident exercitation culpa consectetur in culpa id esse. Consectetur est magna et sit enim veniam
                Lorem ex et culpa eiusmod esse. Eiusmod dolore ea culpa minim mollit tempor amet id ea ipsum minim elit ea. Laborum culpa laboris veniam minim aute amet velit incididunt sit.
              </p>

              <p className="text-foreground-light">
                Excepteur nisi esse aliquip voluptate excepteur voluptate commodo officia quis non incididunt in ut. Deserunt id consectetur id sunt culpa Lorem sint voluptate. Esse Lorem
                ullamco occaecat magna culpa labore eiusmod nostrud.
              </p>

              <p className="text-foreground-lighter">
                Enim culpa nulla pariatur laborum magna officia velit irure enim adipisicing consequat dolor laborum velit. Qui do et in cupidatat irure ut. Tempor non duis elit aliquip id
                nostrud consectetur. Consequat quis exercitation consectetur culpa proident dolor irure elit ad enim minim. Ad adipisicing labore aliquip reprehenderit fugiat veniam aliqua
                aliqua consequat.
              </p>
            </div>

            <div className="flex flex-row gap-5">
              <InfoIcon className="fill-nord-blue text-background" />
              <CircleAlertIcon className="fill-nord-yellow text-background" />
              <CircleAlertIcon className="fill-nord-red text-background" />
              <CircleCheckIcon className="fill-nord-green text-background" />
            </div>

            <div className="space-y-5">
              <div className="flex w-full flex-row gap-2">
                <Button
                  variant="default"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    toast("Default");
                  }}
                >
                  Default
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    toast("Primary");
                  }}
                >
                  Primary
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    toast("Secondary");
                  }}
                >
                  Secondary
                </Button>
                <Button
                  variant="destructive"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    toast.error("Error", {
                      description: "Dolor qui id fugiat labore ea veniam id.",
                    });
                  }}
                >
                  Destructive
                </Button>
                <Button
                  variant="info"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    toast.info("Info", {
                      description: "Id sit duis laborum proident veniam.",
                      action: (
                        <Button variant="default" className="w-28">
                          Undo
                        </Button>
                      ),
                    });
                  }}
                >
                  Info
                </Button>
                <Button
                  variant="success"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    toast.success("Success", {
                      description: "Ea voluptate incididunt veniam duis aliquip occaecat sunt proident duis ipsum laborum quis non.",
                      action: (
                        <Button variant="default" className="w-24">
                          Undo
                        </Button>
                      ),
                    });
                  }}
                >
                  Success
                </Button>
                <Button
                  variant="warn"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    toast.warning("Warn", {
                      description: "Nulla occaecat ad laborum dolore ea quis sint aute.",
                    });
                  }}
                >
                  Warn
                </Button>
                <Button variant="ghost" className="w-full" size="lg">
                  Ghost
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Outline
                </Button>
              </div>

              <div className="flex w-full flex-row gap-2">
                <Button variant="default" className="w-full">
                  Default
                </Button>
                <Button variant="primary" className="w-full">
                  Primary
                </Button>
                <Button variant="secondary" className="w-full">
                  Secondary
                </Button>
                <Button variant="destructive" className="w-full">
                  Destructive
                </Button>
                <Button variant="info" className="w-full">
                  Info
                </Button>
                <Button variant="success" className="w-full">
                  Success
                </Button>
                <Button variant="warn" className="w-full">
                  Warn
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost
                </Button>
                <Button variant="outline" className="w-full">
                  Outline
                </Button>
              </div>

              <div className="flex w-full flex-row gap-2">
                <Button variant="default" className="w-full" size="sm">
                  Default
                </Button>
                <Button variant="primary" className="w-full" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" className="w-full" size="sm">
                  Secondary
                </Button>
                <Button variant="destructive" className="w-full" size="sm">
                  Destructive
                </Button>
                <Button variant="info" className="w-full" size="sm">
                  Info
                </Button>
                <Button variant="success" className="w-full" size="sm">
                  Success
                </Button>
                <Button variant="warn" className="w-full" size="sm">
                  Warn
                </Button>
                <Button variant="ghost" className="w-full" size="sm">
                  Ghost
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Outline
                </Button>
              </div>

              <div className="flex flex-row gap-2">
                <IconButton icon={CopyIcon} size="small" />
                <IconButton icon={CopyIcon} />
              </div>
            </div>

            <Card className="space-y-5 p-4">
              <div className="flex w-full flex-row gap-2">
                <Button variant="default" className="w-full" size="lg">
                  Default
                </Button>
                <Button variant="primary" className="w-full" size="lg">
                  Primary
                </Button>
                <Button variant="secondary" className="w-full" size="lg">
                  Secondary
                </Button>
                <Button variant="destructive" className="w-full" size="lg">
                  Destructive
                </Button>
                <Button variant="info" className="w-full" size="lg">
                  Info
                </Button>
                <Button variant="success" className="w-full" size="lg">
                  Success
                </Button>
                <Button variant="warn" className="w-full" size="lg">
                  Warn
                </Button>
                <Button variant="ghost" className="w-full" size="lg">
                  Ghost
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Outline
                </Button>
              </div>

              <div className="flex w-full flex-row gap-2">
                <Button variant="default" className="w-full">
                  Default
                </Button>
                <Button variant="primary" className="w-full">
                  Primary
                </Button>
                <Button variant="secondary" className="w-full">
                  Secondary
                </Button>
                <Button variant="destructive" className="w-full">
                  Destructive
                </Button>
                <Button variant="info" className="w-full">
                  Info
                </Button>
                <Button variant="success" className="w-full">
                  Success
                </Button>
                <Button variant="warn" className="w-full">
                  Warn
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost
                </Button>
                <Button variant="outline" className="w-full">
                  Outline
                </Button>
              </div>

              <div className="flex w-full flex-row gap-2">
                <Button variant="default" className="w-full" size="sm">
                  Default
                </Button>
                <Button variant="primary" className="w-full" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" className="w-full" size="sm">
                  Secondary
                </Button>
                <Button variant="destructive" className="w-full" size="sm">
                  Destructive
                </Button>
                <Button variant="info" className="w-full" size="sm">
                  Info
                </Button>
                <Button variant="success" className="w-full" size="sm">
                  Success
                </Button>
                <Button variant="warn" className="w-full" size="sm">
                  Warn
                </Button>
                <Button variant="ghost" className="w-full" size="sm">
                  Ghost
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Outline
                </Button>
              </div>

              <div className="flex flex-row gap-2">
                <IconButton icon={CopyIcon} size="small" />
                <IconButton icon={CopyIcon} />
              </div>
            </Card>

            <div className="space-y-5">
              <Blockquote>There are two types of people; those who try to build the future, and those who try to rebuild their past.</Blockquote>

              <CodeBlock className="whitespace-pre" copy content="pnpm install @norviah/bump">
                $ pnpm install @norviah/bump
              </CodeBlock>
            </div>

            <div className="space-y-5">
              <ThemeSelector />
            </div>

            <div className="w-fit rounded bg-card p-5">
              <div className=" mb-2 flex space-x-3 font-normal ">
                <span className="w-full text-foreground-light text-sm">Account</span>
              </div>
              <ul className="space-y-1">
                <a className="block" target="_self" href="/dashboard/account/me">
                  <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                    <span title="Preferences" className="w-full truncate text-foreground text-sm transition group-hover:text-foreground-bold">
                      Preferences
                    </span>
                  </span>
                </a>
                <a className="block" target="_self" href="/dashboard/account/tokens">
                  <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                    <span title="Access Tokens" className="w-full truncate text-foreground text-sm transition group-hover:text-foreground-bold">
                      Access Tokens
                    </span>
                  </span>
                </a>
                <a className="block" target="_self" href="/dashboard/account/security">
                  <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                    <span title="Security" className="w-full truncate text-foreground text-sm transition group-hover:text-foreground-bold">
                      Security
                    </span>
                  </span>
                </a>
                <a className="block" target="_self" href="/dashboard/account/audit">
                  <span className="group flex max-w-full cursor-pointer items-center space-x-2 border-default py-1 font-normal outline-none ring-foreground focus-visible:z-10 focus-visible:ring-1 group-hover:border-foreground-muted">
                    <span title="Audit Logs" className="w-full truncate text-foreground text-sm transition group-hover:text-foreground-bold">
                      Audit Logs
                    </span>
                  </span>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DemoContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-center [&>div]:w-full", className)} {...props} />;
}
