"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { generateMCQs, type GenerateMCQsOutput } from "@/ai/flows/generate-mcqs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  textbookContent: z.string().min(50, "Content must be at least 50 characters."),
  numberOfQuestions: z.coerce.number().min(1).max(10).default(5),
});

type MCQ = GenerateMCQsOutput["mcqs"][0];

export function QuizGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<MCQ[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textbookContent: "",
      numberOfQuestions: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setQuizData(null);
    resetQuiz();
    try {
      const response = await generateMCQs(values);
      if (response.mcqs.length > 0) {
        setQuizData(response.mcqs);
      } else {
        toast({
          variant: "destructive",
          title: "No questions generated",
          description: "Could not generate a quiz from the provided text. Please try with different content.",
        });
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate the quiz. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || !quizData) return;
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setIsAnswered(true);
  };
  
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const resetQuiz = () => {
    setQuizData(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  };

  const currentQuestion = quizData?.[currentQuestionIndex];
  const isQuizFinished = quizData && currentQuestionIndex === quizData.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Quiz Generator</CardTitle>
        <CardDescription>
          Paste a lesson from your textbook to generate a practice quiz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!quizData && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="textbookContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Textbook Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your textbook chapter content here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Quiz"}
                <Lightbulb className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        )}

        {isLoading && (
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}

        {currentQuestion && !isQuizFinished && (
          <div className="mt-8">
            <Progress value={(currentQuestionIndex / quizData.length) * 100} className="mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Question {currentQuestionIndex + 1} of {quizData.length}</p>
            <h3 className="text-lg font-semibold font-headline mb-4">{currentQuestion.question}</h3>
            
            <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ""} disabled={isAnswered}>
              {currentQuestion.options.map((option, index) => {
                const isCorrect = option === currentQuestion.answer;
                const isSelected = option === selectedAnswer;
                return (
                  <FormItem key={index} className={cn("flex items-center space-x-3 space-y-0 p-3 rounded-md border transition-all",
                    isAnswered && isCorrect && "bg-green-100 border-green-400 dark:bg-green-900",
                    isAnswered && isSelected && !isCorrect && "bg-red-100 border-red-400 dark:bg-red-900"
                  )}>
                    <FormControl>
                      <RadioGroupItem value={option} />
                    </FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer flex justify-between items-center">
                      {option}
                      {isAnswered && isCorrect && <CheckCircle2 className="text-green-600 dark:text-green-400" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-600 dark:text-red-400" />}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>

            <div className="mt-6">
              {!isAnswered ? (
                <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>Submit Answer</Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Show Results'}
                </Button>
              )}
            </div>
          </div>
        )}

        {isQuizFinished && (
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold font-headline mb-2">Quiz Complete!</h3>
            <p className="text-lg text-muted-foreground mb-4">You scored</p>
            <p className="text-5xl font-bold text-primary mb-6">{score} / {quizData.length}</p>
            <Button onClick={resetQuiz}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Take Another Quiz
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
