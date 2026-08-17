
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DiscussionForum.css";

const Discussion = () => {
  // State
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answerQuestionId, setAnswerQuestionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({});

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/discussion/show"
      );

      setQuestions(res.data.question || []);
    } catch (error) {
      console.error(
        "Error fetching questions:",
        error.response?.data || error.message
      );
    }
  };

  // Load questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Add question
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      alert("Please enter your question");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/discussion/question",
        {
          userId: userId,
          question: question,
        }
      );

      setQuestion("");
      await fetchQuestions();

      alert("Question added successfully");
    } catch (error) {
      console.error(
        "Error adding question:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.msg ||
        "Failed to add question"
      );
    }
  };

  // Show / hide answer box
  const handlePostAnswerClick = (questionId) => {
    if (answerQuestionId === questionId) {
      setAnswerQuestionId(null);
      setAnswer("");
    } else {
      setAnswerQuestionId(questionId);
      setAnswer("");
    }
  };

  // Post answer
  const handleAnswerSubmit = async (questionId) => {
    if (!answer.trim()) {
      alert("Please enter your answer");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/discussion/answer",
        {
          questionId: questionId,
          userId: userId,
          answer: answer,
        }
      );

      setAnswer("");
      setAnswerQuestionId(null);

      await handleViewAnswers(questionId);

      alert("Answer posted successfully");
    } catch (error) {
      console.error(
        "Error posting answer:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.msg ||
        "Failed to post answer"
      );
    }
  };

  // View answers
  const handleViewAnswers = async (questionId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/discussion/answer/${questionId}`
      );

      setAnswers((prev) => ({
        ...prev,
        [questionId]: res.data.answer || [],
      }));
    } catch (error) {
      console.error(
        "Error fetching answers:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="question-page">

      {/* Ask Question */}
      <div className="card question-card">
        <div className="card-body">

          <h2 className="text-center mb-5">
            Ask Question
          </h2>

          <form onSubmit={handleQuestionSubmit}>
            <textarea
              className="form-control question-input"
              placeholder="Please enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary question-btn"
              >
                Add Question
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Question Table */}
      <div className="question-table-container">
        <table className="table table-bordered mb-0">

          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Question</th>
              <th>Date</th>
              <th>Post Answer</th>
              <th>View Answer</th>
            </tr>
          </thead>

          <tbody>
            {questions.length > 0 ? (
              questions.map((item, index) => (
                <React.Fragment key={item._id}>

                  <tr>
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.userId?.name || "Unknown User"}
                    </td>

                    <td>
                      {item.question}
                    </td>

                    <td>
                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleDateString("en-IN")
                        : "N/A"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          handlePostAnswerClick(item._id)
                        }
                      >
                        {answerQuestionId === item._id
                          ? "Cancel"
                          : "Post Answer"}
                      </button>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          handleViewAnswers(item._id)
                        }
                      >
                        View Answer
                      </button>
                    </td>
                  </tr>

                  {answerQuestionId === item._id && (
                    <tr>
                      <td colSpan="6">
                        <div className="p-3">

                          <textarea
                            className="form-control"
                            placeholder="Write your answer"
                            value={answer}
                            onChange={(e) =>
                              setAnswer(e.target.value)
                            }
                          ></textarea>

                          <div className="text-center mt-3">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                handleAnswerSubmit(item._id)
                              }
                            >
                              Post Answer
                            </button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}

                  {answers[item._id] && (
                    <tr>
                      <td colSpan="6">
                        <div className="p-3">

                          <h5>
                            Answers
                          </h5>

                          {answers[item._id].length > 0 ? (
                            answers[item._id].map(
                              (answerItem) => (
                                <div
                                  key={answerItem._id}
                                  className="border rounded p-2 mb-2"
                                >
                                  <strong>
                                    {answerItem.userId?.name ||
                                      "Unknown User"}
                                  </strong>

                                  <p className="mb-1 mt-1">
                                    {answerItem.answer}
                                  </p>

                                  <small>
                                    {answerItem.createdAt
                                      ? new Date(
                                          answerItem.createdAt
                                        ).toLocaleDateString(
                                          "en-IN"
                                        )
                                      : "N/A"}
                                  </small>
                                </div>
                              )
                            )
                          ) : (
                            <p className="mb-0">
                              No answers posted yet.
                            </p>
                          )}

                        </div>
                      </td>
                    </tr>
                  )}

                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center"
                >
                  No questions found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Discussion;
