// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/app/dashboard/DashboardContent.tsx (create this new file)
// "use client"; // This component will be client-side

// import React, { useState, useEffect, useCallback } from "react";
// import { User, UserProfile } from "@/entities/User";
// import { TestResult } from "@/entities/TestResult";
// import { createPageUrl } from "@/lib/utils";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import CheckoutButton from "@/components/CheckoutButton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   PlayCircle,
//   TrendingUp,
//   Calendar,
//   Award,
//   BookOpen,
//   Target,
//   Clock,
//   CheckCircle
// } from "lucide-react";
// import { format } from "date-fns";
// import Layout from "@/components/Layout";

// // Define the type for your test results based on what TestResult.filter returns
// interface TestResultDisplay {
//   id: string;
//   test_date: string; // Assuming ISO string from your backend
//   percentage_score: number;
//   correct_answers: number;
//   questions_answered: number;
//   time_spent: number;
//   user_email: string; // Add if it's part of the TestResult object
// }

// const getSubscriptionBadge = (user: UserProfile | null) => {
//   if (!user) return null;

//   const status = user.subscription_status || "trial";
//   const colors: { [key: string]: string } = {
//     trial: "bg-yellow-100 text-yellow-800",
//     active: "bg-green-100 text-green-800",
//     expired: "bg-red-100 text-red-800",
//   };

//   return (
//     <Badge className={`${colors[status]} border-0 font-medium`}>
//       {status === "trial" ? "Free Trial" : status === "active" ? "Premium" : "Expired"}
//     </Badge>
//   );
// };

// const calculateAverageScore = (testHistory: TestResultDisplay[]) => {
//   if (testHistory.length === 0) return 0;
//   const sum = testHistory.reduce((acc, test) => acc + test.percentage_score, 0);
//   return Math.round(sum / testHistory.length);
// };

// export default function DashboardContent() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [testHistory, setTestHistory] = useState<TestResultDisplay[]>([]);
//   const [loading, setLoading] = useState(true);

//   const loadDashboardData = useCallback(async () => {
//     try {
//       const currentUser = await User.me();
//       setUser(currentUser);

//       const rawResults = await TestResult.filter(
//         { user_email: currentUser.email },
//         "-test_date",
//         10
//       );
//       const results: TestResultDisplay[] = rawResults.map((test: any) => ({
//         ...test,
//         time_spent: test.time_spent ?? 0,
//       }));
//       setTestHistory(results);
//     } catch (error: unknown) {
//       console.error("Error loading dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadDashboardData();
//   }, []); // Only run once on mount

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       </Layout>
//     );
//   }
//   // ... rest of your Dashboard component's return JSX
//   return (
//      <Layout currentPageName="Dashboard">
//          <div className="min-h-screen py-8">
//              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                  {/* Welcome Header */}
//                  <div className="mb-8">
//                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                          <div>
//                              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                                  Welcome back, {user?.full_name?.split(' ')[0] || 'Student'} 👋
//                              </h1>
//                              <p className="text-gray-600 text-lg">
//                                  Ready to continue your nursing exam preparation?
//                              </p>
//                          </div>
//                          <div className="flex items-center gap-3">
//                              {getSubscriptionBadge(user)}
//                              <Link href={createPageUrl("Test")}>
//                                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
//                                      <PlayCircle className="w-5 h-5" />
//                                      Start Test
//                                  </Button>
//                              </Link>
//                          </div>
//                      </div>
//                  </div>

//                  {/* Stats Overview */}
//                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
//                          <CardContent className="p-6">
//                              <div className="flex items-center justify-between">
//                                  <div>
//                                      <p className="text-blue-600 text-sm font-medium">Total Questions</p>
//                                      <p className="text-2xl font-bold text-blue-900">
//                                          {user?.total_questions_answered || 0}
//                                      </p>
//                                  </div>
//                                  <BookOpen className="w-8 h-8 text-blue-600" />
//                              </div>
//                          </CardContent>
//                      </Card>

//                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
//                          <CardContent className="p-6">
//                              <div className="flex items-center justify-between">
//                                  <div>
//                                      <p className="text-green-600 text-sm font-medium">Best Score</p>
//                                      <p className="text-2xl font-bold text-green-900">
//                                          {user?.best_score || 0}%
//                                      </p>
//                                  </div>
//                                  <Award className="w-8 h-8 text-green-600" />
//                              </div>
//                          </CardContent>
//                      </Card>

//                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
//                          <CardContent className="p-6">
//                              <div className="flex items-center justify-between">
//                                  <div>
//                                      <p className="text-purple-600 text-sm font-medium">Average Score</p>
//                                      <p className="text-2xl font-bold text-purple-900">
//                                          {calculateAverageScore(testHistory)}%
//                                      </p>
//                                  </div>
//                                  <Target className="w-8 h-8 text-purple-600" />
//                              </div>
//                          </CardContent>
//                      </Card>

//                      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
//                          <CardContent className="p-6">
//                              <div className="flex items-center justify-between">
//                                  <div>
//                                      <p className="text-orange-600 text-sm font-medium">Tests Taken</p>
//                                      <p className="text-2xl font-bold text-orange-900">
//                                          {testHistory.length}
//                                      </p>
//                                  </div>
//                                  <CheckCircle className="w-8 h-8 text-orange-600" />
//                              </div>
//                          </CardContent>
//                      </Card>
//                  </div>

//                  {/* Main Content */}
//                  <div className="grid lg:grid-cols-3 gap-8">
//                      {/* Test History */}
//                      <div className="lg:col-span-2">
//                          <Card className="shadow-lg">
//                              <CardHeader>
//                                  <CardTitle className="flex items-center gap-2 text-xl">
//                                      <TrendingUp className="w-5 h-5 text-blue-600" />
//                                      Your Test History
//                                  </CardTitle>
//                              </CardHeader>
//                              <CardContent>
//                                  {testHistory.length > 0 ? (
//                                      <div className="overflow-x-auto">
//                                          <Table>
//                                              <TableHeader>
//                                                  <TableRow>
//                                                      <TableHead>Date</TableHead>
//                                                      <TableHead>Score</TableHead>
//                                                      <TableHead>Questions</TableHead>
//                                                      <TableHead>Time</TableHead>
//                                                  </TableRow>
//                                              </TableHeader>
//                                              <TableBody>
//                                                  {testHistory.map((test) => (
//                                                      <TableRow key={test.id}>
//                                                          <TableCell>
//                                                              <div className="flex items-center gap-2">
//                                                                  <Calendar className="w-4 h-4 text-gray-400" />
//                                                                  {format(new Date(test.test_date), "MMM d, yyyy")}
//                                                              </div>
//                                                          </TableCell>
//                                                          <TableCell>
//                                                              <div className="flex items-center gap-2">
//                                                                  <Badge
//                                                                      className={`${
//                                                                          test.percentage_score >= 80
//                                                                              ? "bg-green-100 text-green-800"
//                                                                              : test.percentage_score >= 60
//                                                                                  ? "bg-yellow-100 text-yellow-800"
//                                                                                  : "bg-red-100 text-red-800"
//                                                                      } border-0`}
//                                                                  >
//                                                                      {test.percentage_score}%
//                                                                  </Badge>
//                                                              </div>
//                                                          </TableCell>
//                                                          <TableCell>
//                                                              {test.correct_answers}/{test.questions_answered}
//                                                          </TableCell>
//                                                          <TableCell>
//                                                              <div className="flex items-center gap-2">
//                                                                  <Clock className="w-4 h-4 text-gray-400" />
//                                                                  {test.time_spent || 0}m
//                                                              </div>
//                                                          </TableCell>
//                                                      </TableRow>
//                                                  ))}
//                                              </TableBody>
//                                          </Table>
//                                      </div>
//                                  ) : (
//                                      <div className="text-center py-12">
//                                          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                                          <h3 className="text-lg font-medium text-gray-900 mb-2">No tests taken yet</h3>
//                                          <p className="text-gray-600 mb-4">Start your first practice test to track your progress</p>
//                                          <Link href={createPageUrl("Test")}>
//                                              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                                                  Take Your First Test
//                                              </Button>
//                                          </Link>
//                                      </div>
//                                  )}
//                              </CardContent>
//                          </Card>
//                      </div>

//                      {/* Sidebar */}
//                      <div className="space-y-6">
//                          {/* Subscription Status */}
//                          <Card className="shadow-lg">
//                              <CardHeader>
//                                  <CardTitle className="text-lg">Subscription Status</CardTitle>
//                              </CardHeader>
//                              <CardContent>
                                 
//                                  <div className="space-y-4">
//                                      {getSubscriptionBadge(user)}
//                                      {user?.subscription_status === "trial" && user?.subscription_end_date && (
//                                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                                              <p className="text-sm text-yellow-800 mb-2">
//                                                  <strong>Trial ends:</strong> {format(new Date(user.subscription_end_date), "MMM d, yyyy")}
//                                              </p>
//                                              <CheckoutButton
//                                                  userEmail={user.email}
//                                                  userId={user.id}
//                                                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm"
//                                              />
//                                          </div>
//                                      )}
                                     
//                                      {user?.subscription_status === "active" && (
//                                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                                              <p className="text-sm text-green-800">
//                                                  You have full access to all features! Keep up the great work.
//                                              </p>
//                                          </div>
//                                      )}
//                                  </div>
//                              </CardContent>
//                          </Card>

//                          {/* Progress Overview */}
//                          <Card className="shadow-lg">
//                              <CardHeader>
//                                  <CardTitle className="text-lg">Learning Progress</CardTitle>
//                              </CardHeader>
//                              <CardContent>
//                                  <div className="space-y-4">
//                                      <div>
//                                          <div className="flex justify-between text-sm mb-2">
//                                              <span>Overall Progress</span>
//                                              <span>{Math.min(100, Math.round((user?.total_questions_answered || 0) / 10))}%</span>
//                                          </div>
//                                          <Progress value={Math.min(100, Math.round((user?.total_questions_answered || 0) / 10))} className="h-2" />
//                                      </div>
                                     
//                                      <div className="text-sm text-gray-600">
//                                          <p>Questions answered: {user?.total_questions_answered || 0}/1000+</p>
//                                          <p>Tests completed: {testHistory.length}</p>
//                                      </div>
//                                  </div>
//                              </CardContent>
//                          </Card>
//                      </div>
//                  </div>
//              </div>
//          </div>
//      </Layout>
//   );
// }