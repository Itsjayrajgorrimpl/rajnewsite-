import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import SEO from "@/components/SEO";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setSubmitting(true);

    if (isSignUp) {
      const { error } = await signUp(email.trim(), password);
      if (error) {
        setError(error.message);
      } else {
        setInfo("Account created! You can now sign in. Ask an admin to grant you access.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setError(error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <SEO title="Admin Login | Raj Industries" description="Admin login for Raj Industries dashboard." />
      <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
        <div className="w-full max-w-sm rounded-2xl bg-background p-8 shadow-premium">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{isSignUp ? "Create Account" : "Admin Login"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isSignUp ? "Create an account to request admin access" : "Sign in to manage quote requests"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {info && <p className="text-sm text-green-600">{info}</p>}
            {user && !isAdmin && <p className="text-sm text-destructive">This account does not have admin access.</p>}
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
            <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(""); setInfo(""); }} className="text-primary underline">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
