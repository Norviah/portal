"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Shield, Users, User, Copy, Check, ArrowRight, Sparkles } from "lucide-react";

import { InlineLink } from "@/components/InlineLink";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { ModernLayout, ModernCard, ModernGrid, ModernSection } from "@/components/layout/ModernLayout";
import { SignInFormSchema, DEMO_ACCOUNTS, type UserRole } from "@/sections/auth";

import type { z } from "zod";

const ROLE_CONFIG = {
  admin: { icon: Shield, color: 'destructive' as const },
  manager: { icon: Users, color: 'default' as const },
  client: { icon: User, color: 'secondary' as const }
} as const;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSignIn = async (values: z.infer<typeof SignInFormSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Check against demo accounts
      const account = DEMO_ACCOUNTS.find(acc => 
        acc.email === values.email && acc.password === values.password
      );
      
      if (account) {
        // Store user info in localStorage for demo purposes
        localStorage.setItem('user', JSON.stringify({
          email: account.email,
          name: account.name,
          role: account.role
        }));
        
        toast.success(`Welcome back, ${account.name}!`);
        
        // Route based on role
        const roleRoutes = {
          admin: '/dashboard/admin',
          manager: '/dashboard/manager',
          client: '/dashboard/client'
        } as const;
        
        router.push(roleRoutes[account.role] || '/dashboard');
      } else {
        toast.error("Invalid email or password. Please try again or use a demo account.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, accountEmail: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(accountEmail);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDemoAccountClick = (account: typeof DEMO_ACCOUNTS[number]) => {
    form.setValue('email', account.email);
    form.setValue('password', account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Welcome to Trio Portal
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            Sign in to access your project dashboard
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Modern project management made simple</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {/* Sign In Form */}
          <div className="order-2 xl:order-1">
            <ModernCard variant="elevated" className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600">Enter your credentials to access your dashboard</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-5">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="user@email.com" 
                                disabled={isLoading}
                                className="h-11 text-base"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your password" 
                                disabled={isLoading}
                                className="h-11 text-base"
                                type="password"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full h-11 text-base font-medium" loading={isLoading}>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Don't have an account? <InlineLink href="/auth/signup" text="Sign up here" />
                  </p>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* Demo Accounts */}
          <div className="order-1 xl:order-2">
            <ModernCard variant="glass" className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Accounts</h2>
                  <p className="text-gray-600">Try out different user roles</p>
                </div>

                <div className="space-y-4">
                  {DEMO_ACCOUNTS.map((account) => {
                    const { icon: Icon, color } = ROLE_CONFIG[account.role];
                    const isCopied = copiedAccount === account.email;
                    
                    return (
                      <div
                        key={account.email}
                        className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                        onClick={() => handleDemoAccountClick(account)}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                                <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                              </div>
                              <div>
                                <Badge variant={color} className="text-xs font-medium">
                                  {account.role.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 px-3 text-sm"
                            >
                              Use Account
                            </Button>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-900">{account.name}</p>
                            <p className="text-sm text-gray-600 mt-1">{account.description}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-500 w-12">Email:</span>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 font-mono text-gray-700">
                                {account.email}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-gray-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(account.email, account.email);
                                }}
                              >
                                {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-500 w-12">Pass:</span>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 font-mono text-gray-700">
                                {account.password}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-gray-200"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(account.password, account.email);
                                }}
                              >
                                {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">Quick Access</p>
                  <p className="text-xs text-gray-500">
                    Click any demo account to auto-fill credentials
                  </p>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      </div>
    </div>
  );
}
