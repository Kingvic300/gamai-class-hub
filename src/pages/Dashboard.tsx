import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Users, GraduationCap, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/AuthContext";

type Role = "admin" | "teacher" | "student" | "parent";

interface SurveyQuestion {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    icon?: React.ElementType;
    role?: Role;
  }>;
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: "primary-role",
    question: "What best describes your primary role in education?",
    options: [
      { value: "admin", label: "Administrator / Principal", icon: Users, role: "admin" },
      { value: "teacher", label: "Teacher / Educator", icon: GraduationCap, role: "teacher" },
      { value: "student", label: "Student / Learner", icon: BookOpen, role: "student" },
      { value: "parent", label: "Parent / Guardian", icon: Heart, role: "parent" }
    ]
  },
  {
    id: "institution-type",
    question: "What type of educational institution are you associated with?",
    options: [
      { value: "k12", label: "K-12 School" },
      { value: "university", label: "University / College" },
      { value: "training", label: "Training Center" },
      { value: "tutoring", label: "Private Tutoring" },
      { value: "other", label: "Other" }
    ]
  },
  {
    id: "class-size",
    question: "What's your typical class or group size?",
    options: [
      { value: "small", label: "1-10 students" },
      { value: "medium", label: "11-30 students" },
      { value: "large", label: "31-100 students" },
      { value: "xlarge", label: "100+ students" }
    ]
  },
  {
    id: "tech-comfort",
    question: "How comfortable are you with educational technology?",
    options: [
      { value: "beginner", label: "Beginner - New to educational tech" },
      { value: "intermediate", label: "Intermediate - Some experience" },
      { value: "advanced", label: "Advanced - Very comfortable" },
      { value: "expert", label: "Expert - I'm a tech enthusiast" }
    ]
  },
  {
    id: "main-goal",
    question: "What's your main goal with Gamai?",
    options: [
      { value: "organize", label: "Better organization of classes and materials" },
      { value: "engagement", label: "Increase student engagement" },
      { value: "assessment", label: "Streamline assessments and feedback" },
      { value: "communication", label: "Improve parent-teacher communication" },
      { value: "analytics", label: "Track and analyze learning progress" }
    ]
  }
];

export default function Register() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = surveyQuestions[step];
  const isFirstStep = step === 0;
  const isLastStep = step === surveyQuestions.length - 1;
  const isSurveyComplete = step >= surveyQuestions.length;

  const determineRole = (): Role => {
    // Priority given to the first question's role mapping
    const primaryRole = currentQuestion?.options.find(opt => opt.value === answers["primary-role"])?.role;
    return primaryRole || "student";
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (step < surveyQuestions.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleUserInfoChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Here you would integrate with your backend/Supabase
    console.log("User registration:", { userInfo, answers, role: determineRole() });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Redirect to appropriate dashboard based on role
    window.location.href = `/${determineRole()}`;
  };

  if (isSurveyComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md gradient-card border-0 shadow-primary">
          <CardHeader className="text-center pb-2">
            <Logo className="mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-gradient">Complete Your Registration</CardTitle>
            <p className="text-muted-foreground">
              Based on your answers, you'll be registered as a <span className="font-semibold text-primary">{determineRole()}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={userInfo.fullName}
                onChange={(e) => handleUserInfoChange("fullName", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => handleUserInfoChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userInfo.password}
                onChange={(e) => handleUserInfoChange("password", e.target.value)}
                placeholder="Create a password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={userInfo.confirmPassword}
                onChange={(e) => handleUserInfoChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
              />
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce"
              disabled={isLoading || !userInfo.fullName || !userInfo.email || !userInfo.password || userInfo.password !== userInfo.confirmPassword}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl gradient-card border-0 shadow-primary">
        <CardHeader className="text-center pb-2">
          <Logo className="mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gradient">Join Gamai</CardTitle>
          <p className="text-muted-foreground">
            Let's personalize your experience with a few quick questions
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {surveyQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-smooth ${
                    index <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-foreground">
              {currentQuestion.question}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth">
                    <RadioGroupItem value={option.value} id={option.value} />
                    {Icon && (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <Label 
                      htmlFor={option.value} 
                      className="flex-1 cursor-pointer text-foreground hover:text-primary transition-smooth"
                    >
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isFirstStep}
              className="px-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className="px-6 gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce"
            >
              {isLastStep ? "Continue to Registration" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}