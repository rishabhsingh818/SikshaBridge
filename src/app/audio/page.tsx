"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { Textarea } from "@/components/ui/textarea";

export default function AudioPage() {
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
             <Textarea
              placeholder="Paste content to generate audio from..."
              className="min-h-[200px]"
            />
            <Button className="w-full">Generate Audio</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
