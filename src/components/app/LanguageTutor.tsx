"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { simplifyTextbookContent } from "@/ai/flows/simplify-textbook-content";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";
import { AudioButton } from "./AudioButton";

const formSchema = z.object({
  image: z.any().refine((file) => file instanceof File, "Image is required."),
  language: z.string().min(1, "Language is required."),
});

const indianLanguages = [
  "Hindi", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", 
  "Urdu", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese"
];

export function LanguageTutor() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    simplifiedExplanation: string;
    imageUrl: string;
  } | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "Hindi",
    },
  });

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const photoDataUri = await toBase64(values.image);
      const response = await simplifyTextbookContent({
        photoDataUri,
        nativeLanguage: values.language,
      });
      setResult({
        simplifiedExplanation: response.simplifiedExplanation,
        imageUrl: URL.createObjectURL(values.image),
      });
    } catch (error) {
      console.error("Error simplifying content:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to simplify the textbook content. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Language Tutor</CardTitle>
        <CardDescription>
          Upload an image of a textbook page to get a simplified explanation in your native language.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Textbook Page Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Native Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indianLanguages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Simplifying..." : "Simplify Content"}
              <UploadCloud className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>

        {isLoading && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <Skeleton className="w-full h-80 rounded-lg" />
          </div>
        )}

        {result && (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold font-headline">Simplified Explanation</h3>
                <AudioButton textToSpeak={result.simplifiedExplanation} />
              </div>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.simplifiedExplanation}</p>
            </div>
            <div className="space-y-4">
               <h3 className="text-xl font-semibold font-headline">Uploaded Image</h3>
              <div className="relative w-full h-80 overflow-hidden rounded-lg border">
                <Image
                  src={result.imageUrl}
                  alt="Uploaded textbook page"
                  layout="fill"
                  objectFit="contain"
                  data-ai-hint="textbook page"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
