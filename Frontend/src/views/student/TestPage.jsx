import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from 'src/components/shared/BlankCard';
import MultipleChoiceQuestion from './Components/MultipleChoiceQuestion';
import NumberOfQuestions from './Components/NumberOfQuestions';
import WebCam from './Components/WebCam';
import { useGetExamsQuery, useGetQuestionsQuery } from '../../slices/examApiSlice';
import { useSaveCheatingLogMutation } from 'src/slices/cheatingLogApiSlice';
import { useSelector } from 'react-redux';
import { useSubmitStudentResultMutation } from 'src/slices/resultApiSlice';
import { useCheckExamAttemptQuery } from 'src/slices/attemptApiSlice';
import { toast } from 'react-toastify';

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitStudentResult] = useSubmitStudentResultMutation();
  const [answers, setAnswers] = useState([]); // {questionId, selectedOptionIndex}
  const [answeredAndMoved, setAnsweredAndMoved] = useState([]); // questionId[]
  const { examId, testId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const studentId = userInfo?._id;
  const [selectedExam, setSelectedExam] = useState([]);
  const [examDurationInSeconds, setexamDurationInSeconds] = useState(0);
  const { data: userExamdata } = useGetExamsQuery();
  const [questions, setQuestions] = useState([]);
  const { data, isLoading } = useGetQuestionsQuery(examId);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Collect answers from child component
  const handleAnswer = (questionId, selectedOptionIndex) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, selectedOptionIndex }];
    });
  };

  // Called when student moves to next question
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    if (!answeredAndMoved.includes(questions[currentQuestion]?._id)) {
      setAnsweredAndMoved([...answeredAndMoved, questions[currentQuestion]?._id]);
    }
  };

  // Called when student submits the test
  const handleTestSubmission = async () => {
    try {
      console.log('Submitting cheating log:', cheatingLog);
      const cheatingLogRes = await saveCheatingLogMutation(cheatingLog);
      console.log('Cheating log mutation result:', cheatingLogRes);
      // Submit student result (add your actual logic here)
      await submitStudentResult({ examId, studentId, answers });
      setSubmitted(true);
      toast.success('Test submitted!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting test or cheating log:', error);
      toast.error('Error submitting test or cheating log.');
    }
  };
  const navigate = useNavigate();
  const [saveCheatingLogMutation] = useSaveCheatingLogMutation();
  const [cheatingLog, setCheatingLog] = useState({
    noFaceCount: 0,
    multipleFaceCount: 0,
    cellPhoneCount: 0,
    prohibitedObjectCount: 0,
    examId: examId,
    username: userInfo?.name || userInfo?.username || '',
    email: userInfo?.email || '',
  });
  const { data: attemptData, isLoading: isAttemptLoading } = useCheckExamAttemptQuery({ examId, studentId });

  useEffect(() => {
    if (userExamdata) {
      const exam = userExamdata.filter((exam) => exam.examId === examId);
      setSelectedExam(exam);
      setexamDurationInSeconds(exam[0].duration * 60);
    }
  }, [userExamdata]);

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  // Block teachers from attempting exams
  if (userInfo?.role === 'teacher') {
    return <Navigate to="/dashboard" replace />;
  }
  if (isAttemptLoading) {
    return <Box textAlign="center" mt={8}><CircularProgress /><Typography>Checking exam attempt...</Typography></Box>;
  }
  if (attemptData?.attempted) {
    return <Box textAlign="center" mt={8}><Typography variant="h5" color="error">You have already attempted this exam.</Typography></Box>;
  }

  return (
    <PageContainer title="TestPage" description="This is TestPage">
      <Box pt="3rem">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={7}>
            <BlankCard>
              <Box
                width="100%"
                minHeight="400px"
                boxShadow={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <MultipleChoiceQuestion
                    questions={data}
                    answers={answers}
                    onAnswer={handleAnswer}
                    currentQuestion={currentQuestion}
                    handleNextQuestion={handleNextQuestion}
                    handleTestSubmission={handleTestSubmission}
                  />
                )}
              </Box>
            </BlankCard>
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BlankCard>
                  <Box
                    maxHeight="300px"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'center',
                      overflowY: 'auto',
                      height: '100%',
                    }}
                  >
                    <NumberOfQuestions
                      questionLength={questions.length}
                      submitTest={handleTestSubmission}
                      examDurationInSeconds={examDurationInSeconds}
                      currentQuestion={currentQuestion}
                      onJumpToQuestion={setCurrentQuestion}
                      answers={answers}
                      questions={questions}
                      answeredAndMoved={answeredAndMoved}
                      submitted={submitted}
                    />
                  </Box>
                </BlankCard>
              </Grid>
              <Grid item xs={12}>
                <BlankCard>
                  <Box
                    width="300px"
                    maxHeight="180px"
                    boxShadow={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <WebCam cheatingLog={cheatingLog} updateCheatingLog={setCheatingLog} />
                  </Box>
                </BlankCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TestPage;
