"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/app/Header";
import { LanguageTutor } from "@/components/app/LanguageTutor";
import { QuizGenerator } from "@/components/app/QuizGenerator";
import { ScholarshipGuidance } from "@/components/app/ScholarshipGuidance";
import { BookOpen, Lightbulb, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <Tabs defaultValue="tutor" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12">
            <TabsTrigger value="tutor" className="py-2">
              <BookOpen className="w-5 h-5 mr-2" />
              Language Tutor
            </TabsTrigger>
            <TabsTrigger value="quiz" className="py-2">
              <Lightbulb className="w-5 h-5 mr-2" />
              Quiz Generation
            </TabsTrigger>
            <TabsTrigger value="guidance" className="py-2">
              <Award className="w-5 h-5 mr-2" />
              Personalized Guidance
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tutor" className="mt-6">
            <LanguageTutor />
          </TabsContent>
          <TabsContent value="quiz" className="mt-6">
            <QuizGenerator />
          </TabsContent>
          <TabsContent value="guidance" className="mt-6">
            <ScholarshipGuidance />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© ShikshaAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
