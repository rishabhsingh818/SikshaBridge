
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, HelpCircle, Lightbulb } from "lucide-react";
import Link from 'next/link';

const FeatureCard = ({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => (
  <Link href={href} className="flex-1 basis-full md:basis-1/4 min-w-[280px]">
    <Card className="bg-white/10 text-card-foreground shadow-lg rounded-2xl overflow-hidden h-full backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-300">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center items-center mb-6 h-12 w-12 mx-auto text-primary">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <BookOpen className="h-8 w-auto text-primary" />
              <span className="ml-3 text-2xl font-bold">ShikshaAI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="#features" className="hover:text-primary transition-colors">
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
              <Link href="/login">
                <Button variant="outline" className="text-foreground border-primary hover:bg-primary hover:text-primary-foreground">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <div className="relative pt-32 pb-32 flex content-center items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center lg:text-left">
                <div className="pr-0 lg:pr-12">
                  <h1 className="font-extrabold text-5xl md:text-6xl my-4 text-gray-200">
                    Unlock Your Learning Potential
                  </h1>
                  <h2 className="font-semibold text-3xl md:text-4xl text-gray-300">
                    AI-Powered Education for Every Student
                  </h2>
                  <p className="mt-4 text-lg text-gray-400">
                    ShikshaAI simplifies textbooks, generates quizzes, and provides personalized guidance to help you succeed.
                  </p>
                  <Link href="/signup">
                    <Button size="lg" className="mt-8">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 justify-center">
              <FeatureCard
                href="/simplify"
                icon={<BookOpen size={48} />}
                title="Textbook Simplification"
                description="Understand complex topics with AI-powered explanations."
              />
              <FeatureCard
                href="/quiz"
                icon={<HelpCircle size={48} />}
                title="Quiz Generation"
                description="Test your knowledge with interactive multiple-choice quizzes from any content."
              />
              <FeatureCard
                href="/guidance"
                icon={<Lightbulb size={48} />}
                title="Personalized Guidance"
                description="Get matched with scholarships and receive motivational support."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
