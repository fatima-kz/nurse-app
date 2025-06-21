// "use client"

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Question } from "@/entities/Question";
// import { TestResult } from "@/entities/TestResult";
// import { User, UserProfile } from "@/entities/User";
// import { InvokeLLM } from "@/integrations/Core";
// import { createPageUrl } from "@/lib/utils";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { 
//   ArrowLeft, 
//   CheckCircle, 
//   XCircle, 
//   Brain, 
//   Clock,
//   ArrowRight,
//   BookOpen
// } from "lucide-react";
// import Layout from "@/components/Layout";

// interface TestSession {
//   totalQuestions: number;
//   correctAnswers: number;
//   startTime: number;
// }

// export default function Test() {
//   const router = useRouter();
//   const [currentQuestion, setCurrentQuestion] = useState<any>(null);
//   const [nextQuestion, setNextQuestion] = useState<any>(null); // Store next question from Make.com
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [showResult, setShowResult] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [aiExplanation, setAiExplanation] = useState("");  
//   const [loading, setLoading] = useState(true);
//   const [loadingAI, setLoadingAI] = useState(false);
//   const [submittingAnswer, setSubmittingAnswer] = useState(false);
//   const [loadingNextQuestion, setLoadingNextQuestion] = useState(false);
//   const [finishingTest, setFinishingTest] = useState(false);  const [user, setUser] = useState<UserProfile | null>(null);
//   const [waitingForMakeQuestion, setWaitingForMakeQuestion] = useState(false); // Control polling
//   const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`); // Unique session ID
//   const [testSession, setTestSession] = useState<TestSession>({
//     totalQuestions: 0,
//     correctAnswers: 0,
//     startTime: Date.now()
//   });  useEffect(() => {
//     initializeTest();
//   }, []); // Empty dependency array - only run once on mount  useEffect(() => {
//     // Set up polling for next question from Make.com
//     if (!waitingForMakeQuestion || nextQuestion) {
//       return; // Don't poll if we're not waiting for Make.com or already have a question
//     }

//     console.log('Starting to poll for next question from Make.com...');

//     const pollForNextQuestion = () => {
//       fetch(`/api/get-next-question?user_email=${user?.email}&session_id=${sessionId}&current_question_id=${currentQuestion?.question_id}`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.question) {
//             console.log('Received next question from Make.com:', data.question.question_id);
//             setNextQuestion(data.question);
//             setWaitingForMakeQuestion(false); // Stop polling
//           }
//         })
//         .catch(err => console.error('Error polling for next question:', err));
//     };
    
//     // Poll immediately, then every 3 seconds
//     pollForNextQuestion();
//     const pollInterval = setInterval(pollForNextQuestion, 3000);
    
//     return () => {
//       console.log('Cleaning up polling interval');
//       clearInterval(pollInterval);
//     };
//   }, [waitingForMakeQuestion, nextQuestion, currentQuestion?.question_id, user?.email, sessionId]);

//   const initializeTest = async () => {
//     try {
//       const currentUser = await User.me();
//       setUser(currentUser);
//       await loadRecentQuestion();
//     } catch (error) {
//       console.error("Error initializing test:", error);
//     }
//   };
//   const loadRecentQuestion = async () => {
//     setLoading(true);
//     setShowResult(false);
//     setSelectedAnswer("");
//     setAiExplanation("");
    
//     // Start with hardcoded initial question for demo
//     const initialQuestion = {
//       id: "demo_start",
//       question_id: "demo_start",
//       question_text: "A 65-year-old patient is admitted with chest pain and shortness of breath. The ECG shows ST-elevation in leads II, III, and aVF. What is the most likely location of the myocardial infarction?",
//       option_a: "Anterior wall",
//       option_b: "Posterior wall", 
//       option_c: "Lateral wall",
//       option_d: "Inferior wall",
//       correct_answer: "D",
//       difficulty: "Medium"
//     };
    
//     setCurrentQuestion(initialQuestion);
//     console.log("Loaded hardcoded initial question");
//     setLoading(false);
//   };

//   const loadRandomQuestion = async () => {
//     setLoading(true);
//     setShowResult(false);
//     setSelectedAnswer("");
//     setAiExplanation("");
    
//     try {
//       const questions = await Question.list("?", 50);
//       if (questions.length > 0) {
//         const randomIndex = Math.floor(Math.random() * questions.length);
//         setCurrentQuestion(questions[randomIndex]);
//       }
//     } catch (error) {
//       console.error("Error loading question:", error);
//     }
//     setLoading(false);
//   };  const handleAnswerSubmit = async () => {
//     if (!selectedAnswer || !currentQuestion || submittingAnswer) return;

//     setSubmittingAnswer(true);
//     const correct = selectedAnswer === currentQuestion.correct_answer;
    
//     // Send data to webhook - Make.com will call back with next question
//     fetch('https://hook.us2.make.com/mes4xll9rgrosp3plsd7ycplfo162v66', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         question_id: currentQuestion.question_id,
//         selected_option: selectedAnswer,
//         current_difficulty: currentQuestion.difficulty,
//         user_email: user?.email,
//         session_id: sessionId,
//         is_correct: correct,
//         callback_url: `${window.location.origin}/api/receive-question`
//       })
//     })
//     .then(() => {
//       console.log('Answer sent to Make.com, starting to wait for next question');
//       setWaitingForMakeQuestion(true); // Start waiting for Make.com response
//     })
//     .catch(error => {
//       console.error('Webhook error:', error);
//     });

//     setIsCorrect(correct);
//     setShowResult(true);
//     setLoadingAI(true);

//     setTestSession(prev => ({
//       ...prev,
//       totalQuestions: prev.totalQuestions + 1,
//       correctAnswers: prev.correctAnswers + (correct ? 1 : 0)
//     }));

//     try {
//       const aiResponse = await InvokeLLM({
//         prompt: `You are an AI tutor helping nursing students prepare for their NCLEX exam. 

// Question: ${currentQuestion.question_text}
// Options: 
// A) ${currentQuestion.option_a}
// B) ${currentQuestion.option_b}
// C) ${currentQuestion.option_c}  
// D) ${currentQuestion.option_d}

// Correct Answer: ${currentQuestion.correct_answer}
// Student's Answer: ${selectedAnswer}
// Student was: ${correct ? "CORRECT" : "INCORRECT"}

// Provide a brief, encouraging explanation (2-3 sentences) that:
// 1. Explains why the correct answer is right
// 2. If student was wrong, briefly explain the mistake
// 3. Give a helpful tip for remembering this concept
// 4. Keep it positive and educational`,
//         response_json_schema: {
//           type: "object",
//           properties: {
//             explanation: { type: "string" }
//           }
//         }
//       });
      
//       setAiExplanation(aiResponse.explanation);
//     } catch (error) {
//       console.error("Error getting AI explanation:", error);
//       setAiExplanation("Great job working through this question! Keep practicing to improve your skills.");    }
    
//     setLoadingAI(false);
//     setSubmittingAnswer(false);
//   };
//   const handleNextQuestion = async () => {
//     if (loadingNextQuestion) return;
    
//     setLoadingNextQuestion(true);
    
//     if (user) {
//       try {
//         const currentPercentageScore = testSession.totalQuestions > 0 
//           ? Math.round((testSession.correctAnswers / testSession.totalQuestions) * 100) 
//           : 0;

//         await User.updateMyUserData({
//           total_questions_answered: (user.total_questions_answered || 0) + 1,
//           best_score: Math.max(user.best_score || 0, currentPercentageScore)
//         });
        
//         // Update local user state
//         setUser(prev => prev ? ({
//           ...prev,
//           total_questions_answered: (prev.total_questions_answered || 0) + 1,
//           best_score: Math.max(prev.best_score || 0, currentPercentageScore)
//         }) : null);
//       } catch (error) {
//         console.error("Error updating user data:", error);
//       }    }

//     // Use next question from Make.com if available, otherwise fallback to database
//     if (nextQuestion) {
//       setCurrentQuestion(nextQuestion);
//       setNextQuestion(null); // Clear the next question
//       setShowResult(false);
//       setSelectedAnswer("");
//       setAiExplanation("");    } else {
//       // Fallback: load question from database (not the hardcoded initial question)
//       console.log('No next question from Make.com, falling back to database');
//       setLoading(true);
//       setShowResult(false);
//       setSelectedAnswer("");
//       setAiExplanation("");
      
//       try {
//         const questions = await Question.list("-created_date", 10);
//         if (questions.length > 0) {
//           // Get a random question from the available ones
//           const randomIndex = Math.floor(Math.random() * questions.length);
//           setCurrentQuestion(questions[randomIndex]);
//         }
//       } catch (error) {
//         console.error("Database fallback failed:", error);
//       }
      
//       setLoading(false);
//     }
    
//     setLoadingNextQuestion(false);
//   };
//   const finishTest = async () => {
//     if (testSession.totalQuestions === 0 || !user || finishingTest) return;
    
//     setFinishingTest(true);
//     const percentageScore = Math.round((testSession.correctAnswers / testSession.totalQuestions) * 100);
//     const timeSpent = Math.round((Date.now() - testSession.startTime) / 60000);

//     try {
//       await TestResult.create({
//         user_email: user.email,
//         questions_answered: testSession.totalQuestions,
//         correct_answers: testSession.correctAnswers,
//         percentage_score: percentageScore,
//         test_date: new Date().toISOString(),
//         time_spent: timeSpent
//       });      await User.updateMyUserData({
//         best_score: Math.max(user.best_score || 0, percentageScore)
//       });

//       router.push('/dashboard');
//     } catch (error) {
//       console.error("Error saving test result:", error);
//     }
//   };

//   /*
//    * MAKE.COM QUESTION FLOW:
//    * 
//    * 1. User answers a question and clicks "Submit Answer"
//    * 2. App sends answer data to Make.com webhook including:
//    *    - question_id, selected_option, user_email, session_id, is_correct
//    *    - callback_url: /api/receive-question
//    * 
//    * 3. Make.com processes the answer and calls back to /api/receive-question with:
//    *    - question: next question object
//    *    - user_email, session_id, previous_question_id
//    * 
//    * 4. App stores the next question temporarily and shows "Next question ready!" status
//    * 
//    * 5. When user clicks "Next Question":
//    *    - App displays the stored question from Make.com
//    *    - Clears the stored question and resets UI
//    * 
//    * 6. Cycle continues...
//    * 
//    * Fallback: If Make.com doesn't provide next question, app loads from database
//    */

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading your question...</p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (!currentQuestion) {
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center">
//           <Card className="max-w-md">
//             <CardContent className="text-center p-8">
//               <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No questions available</h3>
//               <p className="text-gray-600 mb-4">Questions are being added to the system.</p>
//               <Link href={createPageUrl("Dashboard")}>
//                 <Button>Return to Dashboard</Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout currentPageName="Test">
//       <div className="min-h-screen py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <Link 
//               href={createPageUrl("Dashboard")}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               Back to Dashboard
//             </Link>
            
//             <div className="flex items-center gap-4">
//               <Badge variant="outline" className="px-3 py-1">
//                 <Clock className="w-4 h-4 mr-1" />
//                 Question {testSession.totalQuestions + 1}
//               </Badge>
//               <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
//                 Score: {testSession.totalQuestions > 0 ? Math.round((testSession.correctAnswers / testSession.totalQuestions) * 100) : 0}%
//               </Badge>
//             </div>
//           </div>

//           <div className="mb-8">
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Progress</span>
//               <span>{testSession.correctAnswers}/{testSession.totalQuestions} correct</span>
//             </div>
//             <Progress 
//               value={testSession.totalQuestions > 0 ? (testSession.correctAnswers / testSession.totalQuestions) * 100 : 0} 
//               className="h-2"
//             />
//           </div>

//           <Card className="shadow-xl mb-6">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-xl">Practice Question</CardTitle>
//                 {currentQuestion.difficulty && (
//                   <Badge 
//                     className={`${
//                       currentQuestion.difficulty === "Easy" ? "bg-green-100 text-green-800" :
//                       currentQuestion.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
//                       "bg-red-100 text-red-800"
//                     } border-0`}
//                   >
//                     {currentQuestion.difficulty}
//                   </Badge>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6">
//                 <p className="text-lg leading-relaxed text-gray-900">
//                   {currentQuestion.question_text}
//                 </p>

//                 <div className="grid gap-3">                  {["A", "B", "C", "D"].map((option) => (
//                     <button
//                       key={option}
//                       onClick={() => !showResult && !submittingAnswer && setSelectedAnswer(option)}
//                       disabled={showResult || submittingAnswer}
//                       className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
//                         selectedAnswer === option
//                           ? showResult
//                             ? option === currentQuestion.correct_answer
//                               ? "border-green-500 bg-green-50"
//                               : "border-red-500 bg-red-50"
//                             : "border-blue-500 bg-blue-50"
//                           : showResult && option === currentQuestion.correct_answer
//                             ? "border-green-500 bg-green-50"
//                             : (showResult || submittingAnswer)
//                               ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
//                               : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
//                           selectedAnswer === option
//                             ? showResult
//                               ? option === currentQuestion.correct_answer
//                                 ? "bg-green-500 text-white"
//                                 : "bg-red-500 text-white"
//                               : "bg-blue-500 text-white"
//                             : showResult && option === currentQuestion.correct_answer
//                               ? "bg-green-500 text-white"
//                               : "bg-gray-100 text-gray-600"
//                         }`}>
//                           {option}
//                         </span>
//                         <span className="flex-1">
//                           {currentQuestion[`option_${option.toLowerCase()}`]}
//                         </span>
//                         {showResult && (
//                           <span className="flex-shrink-0">
//                             {option === currentQuestion.correct_answer ? (
//                               <CheckCircle className="w-5 h-5 text-green-500" />
//                             ) : selectedAnswer === option ? (
//                               <XCircle className="w-5 h-5 text-red-500" />
//                             ) : null}
//                           </span>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>                {!showResult && selectedAnswer && (
//                   <div className="flex justify-center pt-4">
//                     <Button
//                       onClick={handleAnswerSubmit}
//                       disabled={submittingAnswer}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {submittingAnswer ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                           Submitting...
//                         </>
//                       ) : (
//                         'Submit Answer'
//                       )}
//                     </Button>
//                   </div>
//                 )}

//                 {showResult && (
//                   <div className="space-y-4 border-t pt-6">
//                     <Alert className={`${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
//                       <div className="flex items-center gap-2">
//                         {isCorrect ? (
//                           <CheckCircle className="w-5 h-5 text-green-600" />
//                         ) : (
//                           <XCircle className="w-5 h-5 text-red-600" />
//                         )}
//                         <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
//                           {isCorrect ? 'Correct!' : 'Incorrect'}
//                         </span>
//                       </div>
//                     </Alert>

//                     <div className="bg-gray-50 rounded-xl p-6">
//                       <div className="flex items-start gap-3 mb-3">
//                         <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                         <h4 className="font-semibold text-gray-900">AI Explanation</h4>
//                       </div>
//                       {loadingAI ? (
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//                           Generating explanation...
//                         </div>
//                       ) : (
//                         <p className="text-gray-700 leading-relaxed">{aiExplanation}</p>
//                       )}
//                     </div>

//                     {/* Next Question Status */}
//                     {!nextQuestion && showResult && (
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                         <div className="flex items-center gap-2 text-blue-700 text-sm">
//                           <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
//                           Preparing your next question...
//                         </div>
//                       </div>
//                     )}

//                     {nextQuestion && (
//                       <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//                         <div className="flex items-center gap-2 text-green-700 text-sm">
//                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                           Next question ready!
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex gap-3 pt-4">
//                       <Button
//                         onClick={handleNextQuestion}
//                         disabled={loadingNextQuestion}
//                         className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {loadingNextQuestion ? (
//                           <>
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                             Loading...
//                           </>                        ) : (
//                           <>
//                             Next Question
//                             {nextQuestion && <span className="ml-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>}
//                             <ArrowRight className="w-4 h-4" />
//                           </>
//                         )}
//                       </Button>
//                       <Button
//                         onClick={finishTest}
//                         disabled={finishingTest}
//                         variant="outline"
//                         className="px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {finishingTest ? (
//                           <>
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
//                             Finishing...
//                           </>
//                         ) : (
//                           'Finish Test'
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// }
