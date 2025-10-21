// Thay đổi import bằng require
//require("@testing-library/jest-dom");
const { screen, waitFor } = require("@testing-library/dom"); // Thêm waitFor nếu cần

// Đảm bảo đường dẫn chính xác (dùng require)
const { loadQuestions } = require("./script.js");

// Giả lập fetch toàn cục. Vẫn cần thiết.
global.fetch = jest.fn();

// ... (các bài test còn lại)

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

// Bạn cũng nên kiểm tra file script.js của mình để đảm bảo nó sử dụng module.exports thay vì export.