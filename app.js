import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import { loadQuestions } from "../script.js";

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
