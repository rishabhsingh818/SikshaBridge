"use client";

import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="ml-3 text-2xl font-bold font-headline tracking-tight text-primary">
            ShikshaAI
          </h1>
        </div>
      </div>
    </header>
  );
}
