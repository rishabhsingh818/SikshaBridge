"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function GuidancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-foreground flex flex-col">
       <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Personalized Guidance</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle>Get Personalized Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Guidance feature coming soon.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
