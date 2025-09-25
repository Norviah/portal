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

export default function SignInForm() {
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
    <div className="w-full max-w-7xl mx-auto">
      {/* Compact Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Trio Portal</h1>
        <p className="text-sm text-muted-foreground mb-3">Sign in to access your project dashboard</p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          <span className="text-xs">Modern project management made simple</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sign In Form */}
        <ModernCard variant="elevated" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Sign In</h2>
            <p className="text-sm text-muted-foreground">Enter your credentials to access your dashboard</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="user@email.com" 
                          disabled={isLoading}
                          className="h-9"
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
                      <FormLabel className="text-sm">Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your password" 
                          disabled={isLoading}
                          className="h-9"
                          type="password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full h-9" loading={isLoading}>
                Sign In
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Don't have an account? <InlineLink href="/auth/signup" text="Sign up here" />
            </p>
          </div>
        </ModernCard>

        {/* Demo Accounts */}
        <ModernCard variant="glass" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Demo Accounts</h2>
            <p className="text-sm text-muted-foreground">Try out different user roles</p>
          </div>

          <div className="space-y-3">
            {DEMO_ACCOUNTS.map((account) => {
              const { icon: Icon, color } = ROLE_CONFIG[account.role];
              const isCopied = copiedAccount === account.email;
              
              return (
                <div 
                  key={account.email} 
                  className="hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => handleDemoAccountClick(account)}
                >
                  <ModernCard 
                    variant="outlined" 
                    padding="sm"
                  >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3 w-3" />
                        <Badge variant={color} className="text-xs">
                          {account.role.toUpperCase()}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2 text-xs"
                      >
                        Use
                      </Button>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{account.name}</p>
                      <p className="text-xs text-muted-foreground">{account.description}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Email:</span>
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded flex-1 font-mono">
                          {account.email}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(account.email, account.email);
                          }}
                        >
                          {isCopied ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">Password:</span>
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded flex-1 font-mono">
                          {account.password}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(account.password, account.email);
                          }}
                        >
                          {isCopied ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  </ModernCard>
                </div>
              );
            })}
          </div>
          
          <Separator />
          
          <div className="text-center space-y-1">
            <p className="text-xs font-medium">Quick Access</p>
            <p className="text-xs text-muted-foreground">
              Click any demo account to auto-fill credentials
            </p>
          </div>
        </ModernCard>
      </div>
    </div>
  );
}
