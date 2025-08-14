"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
  textToSpeak: string;
}

export function AudioButton({ textToSpeak }: AudioButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Access window.speechSynthesis only on the client
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
    }

    const handleSpeechEnd = () => setIsSpeaking(false);
    
    if(speechSynthesis){
        speechSynthesis.addEventListener('end', handleSpeechEnd);
    }
    
    // Cleanup function
    return () => {
      if(speechSynthesis) {
        speechSynthesis.removeEventListener('end', handleSpeechEnd);
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
        }
      }
    };
  }, [speechSynthesis]);

  const handlePlayPause = () => {
    if (!speechSynthesis) return;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handlePlayPause}
      aria-label={isSpeaking ? "Stop audio" : "Play audio explanation"}
    >
      {isSpeaking ? (
        <Pause className="h-5 w-5 animate-pulse" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </Button>
  );
}
