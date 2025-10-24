import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import { loadQuestions } from "../script.js";
import React, { useState } from "react";
import NavBar from "./NavBar";
import QuestionCard from "./QuestionCard";
import questions from "./data";

test("shows loading state", () => {
  document.body.innerHTML = `<main></main>`;
  loadQuestions();
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("shows empty state", async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve([])
  }));
  document.body.innerHTML = `<main></main>`;
  await loadQuestions();
  expect(screen.getByText(/No questions found/i)).toBeInTheDocument();
});

test("shows error state", async () => {
  global.fetch = jest.fn(() => Promise.reject("Error"));
  document.body.innerHTML = `<main></main>`;
  await loadQuestions();
  expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
});



export default function App() {
  const [current, setCurrent] = useState(1);
  const [answers, setAnswers] = useState({});

  const total = questions.length;
  const currentQuestion = questions[current - 1];

  const handleSelect = (choice) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choice
    }));
  };

  const nextQuestion = () => {
    if (current < total) setCurrent(current + 1);
  };

  const prevQuestion = () => {
    if (current > 1) setCurrent(current - 1);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <NavBar current={current} total={total} />

      <QuestionCard
        question={currentQuestion}
        selected={answers[currentQuestion.id]}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevQuestion} disabled={current === 1}>
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={current === total}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>

      <pre style={{ marginTop: "20px", background: "#f7f7f7", padding: "10px" }}>
        {JSON.stringify(answers, null, 2)}
      </pre>
    </div>
  );
}

