"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, Loader2 } from "lucide-react";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { useToast } from "@/hooks/use-toast";

interface AudioButtonProps {
  textToSpeak: string;
}

export function AudioButton({ textToSpeak }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Create an audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, []);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    
    // If we already have the audio, just play it
    if (audioSrc) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await textToSpeech({ text: textToSpeak });
      const newAudioSrc = response.audio;
      setAudioSrc(newAudioSrc);
      audioRef.current.src = newAudioSrc;
      audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        variant: "destructive",
        title: "Audio Error",
        description: "Failed to generate audio. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handlePlayPause}
      disabled={isLoading}
      aria-label={isPlaying ? "Stop audio" : "Play audio explanation"}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isPlaying ? (
        <Pause className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </Button>
  );
}
