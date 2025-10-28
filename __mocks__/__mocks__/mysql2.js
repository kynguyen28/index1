// __mocks__/mysql2.js
const mockQuery = jest.fn((sql, callback) => {
  // Giả lập kết quả thành công cho query
  if (sql.includes('SELECT * FROM questions')) {
    callback(null, [{ id: 1, question: 'Mock Question 1' }]);
  } else {
    callback(null, []); // Giả lập không tìm thấy gì cho các query khác
  }
});

const mockConnect = jest.fn((callback) => {
  // Giả lập kết nối thành công ngay lập tức
  if (callback) callback(null); 
});

const mockCreateConnection = jest.fn(() => ({
  connect: mockConnect,
  query: mockQuery,
  end: jest.fn(), // Thêm end() để Jest không than phiền
}));

module.exports = {
  createConnection: mockCreateConnection,
};