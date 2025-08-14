"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HelpCircle, Lightbulb, Mic } from "lucide-react";
import Link from 'next/link';

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="bg-card/80 backdrop-blur-sm border-primary/20 text-card-foreground shadow-lg rounded-lg overflow-hidden flex-1 basis-full md:basis-1/4 min-w-[280px]">
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <BookOpen className="h-8 w-auto text-primary" />
              <span className="ml-3 text-2xl font-bold">ShikshaAI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="text-foreground border-primary hover:bg-primary hover:text-primary-foreground">Login</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="relative pt-32 pb-32 flex content-center items-center justify-center min-h-[90vh]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://firebasestudio.googleapis.com/v0/b/studioc-727a2.appspot.com/o/cache%2Fuser%2F12a50a7c-a49e-4e42-9988-152069818817%2Fupload%2FvPik44eE4q6B.png?alt=media&token=c19ac750-a92c-41be-9f93-41c3c6d73dfa')",
            }}
            data-ai-hint="mountain night"
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-20 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center lg:text-left">
                <div className="pr-0 lg:pr-12">
                  <h1 className="text-white font-extrabold text-5xl md:text-6xl my-4">
                    Unlock Your Learning Potential
                  </h1>
                  <h2 className="text-white font-semibold text-3xl md:text-4xl">
                    AI-Powered Education for Every Student
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    ShikshaAI simplifies textbooks, generates quizzes, and provides personalized guidance to help you succeed.
                  </p>
                  <Button size="lg" className="mt-8">Get Started</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section id="features" className="py-20 bg-background">
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
