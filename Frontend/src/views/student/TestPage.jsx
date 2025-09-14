import React, { useEffect, useState } from 'react';
import { useCheckExamAttemptQuery } from 'src/slices/attemptApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
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
import { toast } from 'react-toastify';

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitStudentResult] = useSubmitStudentResultMutation();
  const [answers, setAnswers] = useState([]); // {questionId, selectedOptionIndex}
  const [answeredAndMoved, setAnsweredAndMoved] = useState([]); // questionId[]
  const { examId, testId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const studentId = userInfo?._id;
  const { data: attemptData, isLoading: isAttemptLoading } = useCheckExamAttemptQuery({ examId, studentId });

  const [selectedExam, setSelectedExam] = useState([]);
  const [examDurationInSeconds, setexamDurationInSeconds] = useState(0);
  const { data: userExamdata } = useGetExamsQuery();

  useEffect(() => {
    if (userExamdata) {
      const exam = userExamdata.filter((exam) => {
        return exam.examId === examId;
      });
      setSelectedExam(exam);
      setexamDurationInSeconds(exam[0].duration * 60);
    }
  }, [userExamdata]);

  const [questions, setQuestions] = useState([]);
  const { data, isLoading } = useGetQuestionsQuery(examId);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const [saveCheatingLogMutation] = useSaveCheatingLogMutation();
  // userInfo already declared above
  const [cheatingLog, setCheatingLog] = useState({
    noFaceCount: 0,
    multipleFaceCount: 0,
    cellPhoneCount: 0,
    prohibitedObjectCount: 0,
    examId: examId,
    username: '',
    email: '',
  });

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  // Collect answers from child component
  const handleAnswer = (questionId, selectedOptionIndex) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, selectedOptionIndex }];
    });
  };

  // Called when student moves to next question
  const handleNextQuestion = () => {
    const currentQ = questions[currentQuestion];
    const answerObj = answers.find(a => a.questionId === currentQ?._id);
    if (answerObj && !answeredAndMoved.includes(currentQ._id)) {
      setAnsweredAndMoved(prev => [...prev, currentQ._id]);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const handleTestSubmission = async () => {
    if (submitted) return;
    setSubmitError(null);
    try {
      const logToSend = {
        ...cheatingLog,
        username: userInfo.name,
        email: userInfo.email,
      };
      await saveCheatingLogMutation(logToSend).unwrap();
      // Submit answers to backend for result creation
      await submitStudentResult({ studentId, examId, answers }).unwrap();
      setSubmitted(true);
      toast.success('Test submitted! Your result will be available soon.');
      navigate(`/Success`);
    } catch (error) {
      setSubmitError(error);
      if (error && error.data) {
        console.error('Submission error details:', error.data);
      } else {
        console.error('Submission error:', error);
      }
      toast.error('Error submitting test or saving logs. Please check your network and try again.');
      setSubmitted(true);
      navigate(`/`);
    }
  };

  const saveCheatingLog = async (cheatingLog) => {
    console.log(cheatingLog);
  };
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
