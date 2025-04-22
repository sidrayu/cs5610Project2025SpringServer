import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Table, Badge } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { getAllQuizAttempts } from '../client';
import { QuizAttempt } from '../reducer';

interface RootState {
  user: {
    _id: string;
  };
  quizzes: {
    quizzes: any[];
  };
}

const QuizAttempts: React.FC = () => {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const user = useSelector((state: RootState) => state.user);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const data = await getAllQuizAttempts(user._id, quizId!);
        setAttempts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz attempts:', error);
        setLoading(false);
      }
    };

    fetchAttempts();
  }, [user._id, quizId]);

  if (loading) {
    return <div>Loading attempts...</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateTimeSpent = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end.getTime() - start.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minutes`;
  };

  return (
    <Container className="mt-4">
      <h3>Quiz Attempts History</h3>
      {attempts.length === 0 ? (
        <p>No attempts found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Attempt #</th>
              <th>Score</th>
              <th>Date</th>
              <th>Time Spent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr key={attempt._id}>
                <td>{attempt.attemptNumber}</td>
                <td>{attempt.score} / {attempt.totalPoints}</td>
                <td>{formatDate(attempt.endTime)}</td>
                <td>{calculateTimeSpent(attempt.submittedAt, attempt.endTime)}</td>
                <td>
                  {attempt.score >= attempt.totalPoints * 0.7 ? (
                    <Badge bg="success">
                      <FaCheck className="me-1" />
                      Passed
                    </Badge>
                  ) : (
                    <Badge bg="danger">
                      <FaTimes className="me-1" />
                      Failed
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default QuizAttempts; 