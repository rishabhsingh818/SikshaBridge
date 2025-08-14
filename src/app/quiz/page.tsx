"use client";

import * as React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from 'next/link';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { generateMCQs, QuizQuestion } from '@/ai/flows/generate-mcqs';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from '@/lib/utils';


export default function QuizPage() {
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
  const [submitted, setSubmitted] = useState(false);

  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!textContent && !imageFile) {
        toast({
            variant: "destructive",
            title: "Input Required",
            description: "Please provide text or upload an image to generate a quiz.",
        });
        return;
    }
    
    setIsLoading(true);
    setQuiz(null);
    setUserAnswers({});
    setSubmitted(false);

    try {
        let image_data_uri = '';
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            image_data_uri = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        }
        
        const result = await generateMCQs({
            photoDataUri: image_data_uri,
            description: textContent,
        });

        setQuiz(result.questions);
    } catch (error) {
        console.error("Quiz generation failed:", error);
        toast({
            variant: "destructive",
            title: "Quiz Generation Failed",
            description: "An error occurred while generating the quiz.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({...prev, [questionIndex]: answer}));
  }

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  }

  const getScore = () => {
    if (!quiz) return 0;
    return quiz.reduce((score, question, index) => {
        return userAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  }

  const renderQuizResult = () => {
    if (!quiz || !submitted) return null;
    const score = getScore();
    return (
        <Card className="mt-6 bg-transparent border-none shadow-none">
            <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>You scored {score} out of {quiz.length}!</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => {
                    setQuiz(null);
                    setSubmitted(false);
                    setUserAnswers({});
                    setTextContent('');
                    setImageFile(null);
                    setImagePreview(null);
                }}>Take Another Quiz</Button>
            </CardContent>
        </Card>
    );
  }


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
            <h1 className="text-2xl font-bold">Quiz Generation</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/60 backdrop-blur-sm border border-white/10">
                <CardHeader>
                    <CardTitle>Generate a Quiz</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="image-upload">Upload Image (Optional)</Label>
                        <div className="flex items-center space-x-2">
                        <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="w-full"/>
                        </div>
                    </div>

                    {imagePreview && (
                        <div className="mt-4">
                            <Image src={imagePreview} alt="Image preview" width={500} height={500} className="rounded-md object-contain" />
                        </div>
                    )}
                    <Textarea
                        placeholder="Paste content to generate a quiz from..."
                        className="min-h-[200px]"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                    />
                    <Button className="w-full" onClick={handleGenerateQuiz} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Generate Quiz
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border border-white/10">
                <CardHeader>
                    <CardTitle>Your Quiz</CardTitle>
                    <CardDescription>Test your knowledge.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && <div className="flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                    
                    {!isLoading && quiz && !submitted && (
                        <div className="space-y-6">
                            {quiz.map((q, i) => (
                                <div key={i} className="space-y-2">
                                    <p><strong>{i+1}. {q.questionText}</strong></p>
                                    <RadioGroup onValueChange={(value) => handleAnswerChange(i, value)} value={userAnswers[i] || ''}>
                                        {q.options.map((option, j) => (
                                            <div key={j} className="flex items-center space-x-2">
                                                <RadioGroupItem value={option} id={`q${i}o${j}`} />
                                                <Label htmlFor={`q${i}o${j}`}>{option}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            ))}
                            <Button className="w-full" onClick={handleSubmitQuiz}>Submit Quiz</Button>
                        </div>
                    )}

                    {!isLoading && submitted && quiz && (
                        <div className="space-y-6">
                            {renderQuizResult()}
                            {quiz.map((q, i) => (
                                <div key={i} className="p-4 rounded-md border space-y-2 bg-black/20"
                                     style={{ borderColor: userAnswers[i] === q.correctAnswer ? 'rgba(74, 222, 128, 0.4)' : 'rgba(248, 113, 113, 0.4)' }}>
                                    <p><strong>{i+1}. {q.questionText}</strong></p>
                                    <div className="space-y-2">
                                        {q.options.map((option, j) => {
                                            const isCorrect = option === q.correctAnswer;
                                            const isUserAnswer = userAnswers[i] === option;
                                            return (
                                                <div key={j} className={cn("flex items-center space-x-2 p-2 rounded-md",
                                                    isCorrect && "bg-green-500/30",
                                                    isUserAnswer && !isCorrect && "bg-red-500/30"
                                                )}>
                                                    {isCorrect ? <CheckCircle className="h-4 w-4 text-green-400" /> : (isUserAnswer ? <XCircle className="h-4 w-4 text-red-400"/> : <div className="w-4 h-4" />) }
                                                    <span>{option}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-2 p-2 bg-white/5 rounded-md">
                                        <p className="font-bold">Explanation:</p>
                                        <p>{q.explanation}</p>
                                    </div>
                                </div>
                            ))}
                             <Button onClick={() => {
                                setQuiz(null);
                                setSubmitted(false);
                                setUserAnswers({});
                                setTextContent('');
                                setImageFile(null);
                                setImagePreview(null);
                            }}>Take Another Quiz</Button>
                        </div>
                    )}

                    {!isLoading && !quiz && (
                        <p className="text-muted-foreground">Your generated quiz will appear here.</p>
                    )}

                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
