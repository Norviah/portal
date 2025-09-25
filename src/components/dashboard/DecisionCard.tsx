"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

interface DecisionOption {
  id: string;
  name: string;
  price?: number;
  color?: string;
  description: string;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  status: "urgent" | "pending" | "completed";
  deadline: string;
  options: DecisionOption[];
  selectedOption?: string;
  onSelect?: (optionId: string) => void;
  onSubmit?: () => void;
}

interface DecisionCardProps {
  decision: Decision;
  className?: string;
}

export function DecisionCard({ decision, className }: DecisionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "destructive";
      case "pending":
        return "secondary";
      case "completed":
        return "default";
      default:
        return "outline";
    }
  };

  const isOverdue = new Date(decision.deadline) < new Date();

  return (
    <Card className={cn("hover:shadow-md transition-shadow duration-200", className)}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={decision.id} className="border-none">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2 text-left">
              <span className="font-medium">{decision.title}</span>
              <Badge variant={getStatusColor(decision.status)}>
                {decision.status.toUpperCase()}
              </Badge>
              {isOverdue && decision.status !== "completed" && (
                <Badge variant="destructive">OVERDUE</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {decision.description}
              </p>
              
              <div className="space-y-3">
                {decision.options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id={`${decision.id}-${option.id}`}
                        name={`decision-${decision.id}`}
                        value={option.id}
                        checked={decision.selectedOption === option.id}
                        onChange={() => decision.onSelect?.(option.id)}
                        className="w-4 h-4"
                      />
                      <label 
                        htmlFor={`${decision.id}-${option.id}`}
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        {option.name}
                        {option.price && (
                          <span className="ml-2 text-muted-foreground">
                            - ${option.price.toLocaleString()}
                          </span>
                        )}
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      {option.description}
                    </p>
                    {option.color && (
                      <div className="ml-6">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: option.color }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm font-medium">Deadline:</span>
                <span className={cn(
                  "text-sm",
                  isOverdue && decision.status !== "completed" 
                    ? "text-red-600 font-semibold" 
                    : "text-muted-foreground"
                )}>
                  {new Date(decision.deadline).toLocaleDateString()}
                  {isOverdue && decision.status !== "completed" && " (OVERDUE)"}
                </span>
              </div>
              
              {decision.status !== "completed" && (
                <Button 
                  onClick={decision.onSubmit}
                  disabled={!decision.selectedOption}
                  className="w-full"
                >
                  Submit Decision
                </Button>
              )}
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
