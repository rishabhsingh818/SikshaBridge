"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HelpCircle, Lightbulb, Mic } from "lucide-react";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden flex-1 basis-1/4">
    <CardContent className="p-8 text-center">
      <div className="flex justify-center items-center mb-6 h-12 w-12 mx-auto text-primary">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <BookOpen className="h-8 w-auto text-primary" />
            <span className="ml-3 text-2xl font-bold">ShikshaAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <a href="#" className="hover:text-primary">
              Features
            </a>
            <a href="#" className="hover:text-primary">
              About
            </a>
            <a href="#" className="hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-foreground border-primary hover:bg-primary hover:text-primary-foreground">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[80vh]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://placehold.co/1920x1080.png')",
            }}
            data-ai-hint="learning education students"
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-20 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-left">
                <div className="pr-12">
                  <h1 className="text-foreground font-extrabold text-5xl md:text-6xl my-4">
                    Unlock Your Learning Potential
                  </h1>
                  <h2 className="text-foreground font-semibold text-3xl md:text-4xl">
                    AI-Powered Education for Every Student
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    ShikshaAI simplifies textbooks, generates quizzes, and provides personalized guidance to help you succeed.
                  </p>
                  <Button size="lg" className="mt-8">Get Started</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="pb-20 bg-background -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 justify-center">
              <FeatureCard
                icon={<BookOpen size={48} />}
                title="Textbook Simplification"
                description="Understand complex topics with AI-powered explanations in your native language."
              />
              <FeatureCard
                icon={<HelpCircle size={48} />}
                title="Quiz Generation"
                description="Test your knowledge with interactive multiple-choice quizzes from any content."
              />
              <FeatureCard
                icon={<Lightbulb size={48} />}
                title="Personalized Guidance"
                description="Get matched with scholarships and receive motivational support."
              />
              <FeatureCard
                icon={<Mic size={48} />}
                title="Audio Explanations"
                description="Listen to your textbook chapters and explanations on the go."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
