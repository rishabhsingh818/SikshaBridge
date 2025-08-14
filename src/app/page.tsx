"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Search } from "lucide-react";

const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden flex-1">
    <CardContent className="p-8 text-center">
      <div className="flex justify-center items-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const WebDesignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 17l-1-4h4l-1 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);

const GraphicDesignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4" />
    </svg>
);

const SEOIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const DomainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <text x="8" y="15" fontSize="6" fill="currentColor">.COM</text>
    </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <svg
              className="h-8 w-auto text-white"
              viewBox="0 0 40 40"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zm0 38c-9.9 0-18-8.1-18-18S10.1 2 20 2s18 8.1 18 18-8.1 16-18 16z" />
              <path d="M26.7 12.3c-1.4-1.4-3.3-2.3-5.4-2.3h-2.6c-2.1 0-4 .9-5.4 2.3-1.4 1.4-2.3 3.3-2.3 5.4v.6c0 2.1.9 4 2.3 5.4 1.4 1.4 3.3 2.3 5.4 2.3h2.6c2.1 0 4-.9 5.4-2.3 1.4-1.4 2.3-3.3 2.3-5.4v-.6c0-2.1-.9-4-2.3-5.4zm-8 13.4h-2.6c-1.5 0-2.9-.6-3.8-1.7-1-1-1.7-2.3-1.7-3.8v-.6c0-1.5.6-2.9 1.7-3.8 1-1 2.3-1.7 3.8-1.7h2.6c1.5 0 2.9.6 3.8 1.7 1 1 1.7 2.3 1.7 3.8v.6c0 1.5-.6 2.9-1.7 3.8-1 1-2.4 1.7-3.8 1.7z" />
            </svg>
            <span className="ml-3 text-2xl font-bold">Mousmedia.</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <a href="#" className="flex items-center hover:text-primary">
              Layanan <ChevronDown className="w-4 h-4 ml-1" />
            </a>
            <a href="#" className="hover:text-primary">
              Blog
            </a>
            <a href="#" className="hover:text-primary">
              Kontak
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-foreground border-foreground hover:bg-foreground hover:text-background">Login</Button>
            <Button>Daftar</Button>
            <Search className="w-6 h-6 ml-4" />
          </div>
        </div>
      </header>

      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[80vh]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://placehold.co/1920x1080/1a233a/1a233a.png')",
            }}
            data-ai-hint="mountain night"
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-left">
                <div className="pr-12">
                  <p className="text-lg text-gray-300">
                    <span className="border-b-2 border-primary pb-1">
                      Bali Digital Agency
                    </span>
                  </p>
                  <h1 className="text-white font-extrabold text-5xl md:text-6xl my-4">
                    NEXT LEVEL CREATIVE
                  </h1>
                  <h2 className="text-white font-semibold text-3xl md:text-4xl">
                    Bali Web Design & Graphic Design
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Mous Media melayani jasa pembuatan bali web design, graphic
                    design, web hosting, domain name, dengan bergai macam
                    pilihan harga paket
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="pb-20 bg-background -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 justify-center">
              <ServiceCard
                icon={<WebDesignIcon />}
                title="Web Design"
                description="Company Website - E commerce / Online Shop - Web Aplikasi."
              />
              <ServiceCard
                icon={<GraphicDesignIcon />}
                title="Graphic Design"
                description="Semua kebutuhan design pemasaran anda."
              />
              <ServiceCard
                icon={<SEOIcon />}
                title="SEO & Maintenance"
                description="Tingkatkan ranking website di mesin pencari seperti google"
              />
              <ServiceCard
                icon={<DomainIcon />}
                title="Domain Name"
                description="Domain name murah TLD internasional dan Indonesia"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
