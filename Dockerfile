# Sử dụng Node.js làm base image
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy file cấu hình và cài dependency
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Mở port 3000
EXPOSE 3000

# Chạy app
CMD ["npm", "start"]
