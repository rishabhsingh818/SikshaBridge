"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

function getFirebaseAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email address is already in use by another account.';
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled. Please enable it in the Firebase console.';
        case 'auth/weak-password':
            return 'The password is too weak. It must be at least 6 characters long.';
        default:
            return 'An unknown error occurred. Please try again.';
    }
}

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      const passwordError = "Password should be at least 6 characters";
      setError(passwordError);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: passwordError,
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Signup Successful",
        description: "Your account has been created.",
      });
      router.push('/'); // Redirect to a dashboard or home page after signup
    } catch (error: any) {
      const errorMessage = getFirebaseAuthErrorMessage(error.code);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm">
          <p>Already have an account? <Link href="/login" className="underline">Login</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
