"use client";

import * as React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from 'next/link';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { simplifyTextbookContent } from '@/ai/flows/simplify-textbook-content';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";


export default function SimplifyPage() {
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [simplifiedContent, setSimplifiedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimplify = async () => {
    if (!textContent && !imageFile) {
        toast({
            variant: "destructive",
            title: "Input Required",
            description: "Please provide text or upload an image to simplify.",
        });
        return;
    }
    
    setIsLoading(true);
    setSimplifiedContent('');

    try {
        let image_data_uri = '';
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            image_data_uri = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        }
        
        const result = await simplifyTextbookContent({
            photoDataUri: image_data_uri,
            description: textContent,
        });

        setSimplifiedContent(result.simplifiedText);
    } catch (error) {
        console.error("Simplification failed:", error);
        toast({
            variant: "destructive",
            title: "Simplification Failed",
            description: "An error occurred while simplifying the content.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Textbook Simplification</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Simplify Your Textbook</CardTitle>
              <CardDescription>Upload an image of a page or paste text to get a simplified explanation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Upload Image (Optional)</Label>
                <div className="flex items-center space-x-2">
                   <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="w-full"/>
                </div>
              </div>

              {imagePreview && (
                  <div className="mt-4">
                      <Image src={imagePreview} alt="Image preview" width={500} height={500} className="rounded-md object-contain" />
                  </div>
              )}
              
              <Textarea
                placeholder="Or paste your textbook content here..."
                className="min-h-[200px]"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
              <Button onClick={handleSimplify} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Simplify Text
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simplified Content</CardTitle>
              <CardDescription>Your easy-to-understand explanation will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                     <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="prose dark:prose-invert max-w-none">
                        {simplifiedContent ? <p>{simplifiedContent}</p> : <p className="text-muted-foreground">Your simplified content will be displayed here.</p>}
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
