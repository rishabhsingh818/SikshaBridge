"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { personalizedScholarshipGuidance } from "@/ai/flows/personalized-scholarship-guidance";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Award, Rocket, MapPin, User } from "lucide-react";

const formSchema = z.object({
  location: z.string().min(2, "Location is required."),
  grade: z.coerce.number().min(1, "Grade must be at least 1").max(12, "Grade cannot be more than 12"),
});

export function ScholarshipGuidance() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      grade: 10,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await personalizedScholarshipGuidance(values);
      setResult(response.scholarshipInfo);
    } catch (error) {
      console.error("Error fetching guidance:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to fetch scholarship guidance. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personalized Guidance</CardTitle>
        <CardDescription>
          Find scholarships and motivational guidance tailored for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-accent/50 border-l-4 border-accent-foreground p-4 rounded-md mb-6">
          <div className="flex items-start">
            <Rocket className="h-6 w-6 mr-3 text-accent-foreground" />
            <div>
              <h4 className="font-semibold">A journey of a thousand miles begins with a single step.</h4>
              <p className="text-sm text-muted-foreground">Keep learning, keep growing. Your future is bright!</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><MapPin className="h-4 w-4 mr-2"/>Your Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rampur village" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><User className="h-4 w-4 mr-2"/>Your Grade</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Find Scholarships"}
              <Award className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>

        {isLoading && (
          <Card className="mt-8">
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="mt-8 bg-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-primary">Available Scholarships</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{result}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
