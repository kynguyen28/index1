async function loadQuestions() {
const main = document.querySelector("main") || document.body;
const statusEl = document.createElement("p");
statusEl.id = "status";
statusEl.textContent = "Loading...";
main.appendChild(statusEl);

const listEl = document.createElement("ul");
listEl.id = "question-list";
main.appendChild(listEl);

  statusEl.textContent = "Loading...";
  listEl.innerHTML = "";

  try {
    const res = await fetch("questions.json");

    if (!res.ok) throw new Error("Network error");

    const data = await res.json();

    if (!data || data.length === 0) {
      statusEl.textContent = "No questions found.";
      return;
    }

    statusEl.textContent = "";
    data.forEach((q) => {
      const li = document.createElement("li");
      li.textContent = q.question;
      listEl.appendChild(li);
    });
  } catch (err) {
    statusEl.textContent = "Error loading data 😢";
  }
}

window.addEventListener("DOMContentLoaded", loadQuestions);

module.exports = {
    loadQuestions
};
