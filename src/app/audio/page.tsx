"use client";

import * as React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from 'next/link';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";


export default function AudioPage() {
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  const handleGenerateAudio = async () => {
    // Placeholder for future implementation
    toast({
        title: "Coming Soon!",
        description: "Audio generation from content is not yet implemented.",
    });
  }

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
            <h1 className="text-2xl font-bold">Audio Explanations</h1>
             <div className="w-8"></div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Listen to Explanations</CardTitle>
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
              placeholder="Paste content to generate audio from..."
              className="min-h-[200px]"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
            <Button className="w-full" onClick={handleGenerateAudio} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Audio
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
