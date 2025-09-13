import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  Clock, 
  Check, 
  X,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Target
} from "lucide-react";

const mockAssessment = {
  id: 1,
  title: "Advanced Mathematics Quiz - Chapter 5",
  subject: "Mathematics",
  teacher: "Dr. Sarah Smith",
  timeLimit: 30,
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      question: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
      options: [
        "3x² + 4x - 5",
        "3x² + 4x + 5", 
        "x² + 4x - 5",
        "3x³ + 2x² - 5x"
      ],
      correctAnswer: 0,
      explanation: "Using the power rule: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5, d/dx(3) = 0"
    },
    {
      id: 2,
      question: "Which of the following is the correct integral of ∫2x dx?",
      options: [
        "x² + C",
        "2x² + C",
        "x² + 2C",
        "2x + C"
      ],
      correctAnswer: 0,
      explanation: "∫2x dx = 2∫x dx = 2(x²/2) + C = x² + C"
    },
    {
      id: 3,
      question: "What is the limit of (x² - 4)/(x - 2) as x approaches 2?",
      options: [
        "0",
        "2", 
        "4",
        "undefined"
      ],
      correctAnswer: 2,
      explanation: "Factor the numerator: (x² - 4) = (x + 2)(x - 2). Cancel (x - 2): limit = x + 2 = 2 + 2 = 4"
    },
    {
      id: 4,
      question: "Which method is used to find the area between two curves?",
      options: [
        "Differentiation",
        "Integration",
        "Substitution only",
        "L'Hôpital's rule"
      ],
      correctAnswer: 1,
      explanation: "Integration is used to find areas under curves and between curves by calculating definite integrals."
    },
    {
      id: 5,
      question: "What is the second derivative of f(x) = 4x³ - 6x² + 2x?",
      options: [
        "12x² - 12x + 2",
        "24x - 12",
        "12x - 12",
        "24x² - 12x"
      ],
      correctAnswer: 1,
      explanation: "f'(x) = 12x² - 12x + 2, then f''(x) = 24x - 12"
    }
  ]
};

export default function Assessments() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(mockAssessment.timeLimit * 60); // in seconds
  const [assessmentStarted, setAssessmentStarted] = useState(false);

  const question = mockAssessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockAssessment.totalQuestions) * 100;

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < mockAssessment.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    mockAssessment.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: mockAssessment.totalQuestions,
      percentage: Math.round((correct / mockAssessment.totalQuestions) * 100)
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!assessmentStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="gradient-card border-0 shadow-primary">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">{mockAssessment.title}</CardTitle>
                <p className="text-muted-foreground">
                  {mockAssessment.subject} • by {mockAssessment.teacher}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{mockAssessment.totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{mockAssessment.timeLimit}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Award className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">100</div>
                    <div className="text-sm text-muted-foreground">Max Points</div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Instructions:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Answer all questions within the time limit</li>
                    <li>• You can navigate between questions freely</li>
                    <li>• Select the best answer for each question</li>
                    <li>• Submit when ready or when time runs out</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => setAssessmentStarted(true)}
                  className="w-full gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce py-6 text-lg font-semibold"
                >
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="gradient-card border-0 shadow-primary mb-6">
              <CardHeader className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  score.percentage >= 80 ? 'bg-success/10' : score.percentage >= 60 ? 'bg-secondary/10' : 'bg-destructive/10'
                }`}>
                  <Award className={`h-10 w-10 ${
                    score.percentage >= 80 ? 'text-success' : score.percentage >= 60 ? 'text-secondary' : 'text-destructive'
                  }`} />
                </div>
                <CardTitle className="text-3xl mb-2">Assessment Complete!</CardTitle>
                <div className="text-4xl font-bold text-gradient mb-2">{score.percentage}%</div>
                <p className="text-muted-foreground">
                  You scored {score.correct} out of {score.total} questions correctly
                </p>
              </CardHeader>
            </Card>

            {/* Detailed Results */}
            <div className="space-y-4">
              {mockAssessment.questions.map((q, index) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <Card key={q.id} className="gradient-card border-0">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span>Question {index + 1}</span>
                          {isCorrect ? (
                            <Check className="h-5 w-5 text-success" />
                          ) : (
                            <X className="h-5 w-5 text-destructive" />
                          )}
                        </CardTitle>
                        <Badge className={isCorrect ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                          {isCorrect ? "Correct" : "Incorrect"}
                        </Badge>
                      </div>
                      <p className="text-foreground">{q.question}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {q.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 ${
                              optionIndex === q.correctAnswer 
                                ? 'border-success bg-success/10' 
                                : optionIndex === userAnswer && !isCorrect
                                ? 'border-destructive bg-destructive/10'
                                : 'border-border bg-muted/30'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {optionIndex === q.correctAnswer && (
                                <Check className="h-4 w-4 text-success" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <X className="h-4 w-4 text-destructive" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                        <h4 className="font-semibold text-accent mb-2">Explanation:</h4>
                        <p className="text-sm text-muted-foreground">{q.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                  setAssessmentStarted(false);
                }}
                className="gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <Card className="gradient-card border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-foreground">{mockAssessment.title}</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {mockAssessment.totalQuestions}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="gradient-card border-0 mb-6">
            <CardHeader>
              <CardTitle className="text-xl">
                {question.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <RadioGroup
                value={answers[question.id]?.toString() || ""}
                onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value))}
                className="space-y-4"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-foreground hover:text-primary transition-smooth"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {mockAssessment.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 ${answers[mockAssessment.questions[index].id] !== undefined ? 'bg-success/20 border-success' : ''}`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {currentQuestion === mockAssessment.totalQuestions - 1 ? (
              <Button
                onClick={handleSubmit}
                className="gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce"
                disabled={Object.keys(answers).length !== mockAssessment.totalQuestions}
              >
                Submit Assessment
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentQuestion === mockAssessment.totalQuestions - 1}
                className="gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}