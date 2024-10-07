import fs from 'fs';
import path from 'path';
import ApiEndpoint from './models/apiEndpointModel';
import sequelize from './configs/database';  // Import instance Sequelize

// Đọc nội dung file
export const readFileContent = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf8');
};

// Trích xuất các tuyến đường từ file router chính
export const extractSubRoutes = (content: string): { path: string, file: string }[] => {
  const routeRegex = /app\.use\(['"]([^'"]+)['"],\s*([^'"]+Routes)\)/g;
  const routes: { path: string, file: string }[] = [];
  let match;

  while ((match = routeRegex.exec(content)) !== null) {
    const routePath = match[1];
    const routeFile = match[2];
    routes.push({ path: routePath, file: routeFile });
  }

  return routes;
};

// Trích xuất các endpoint và mô tả từ file router con
export const extractEndpointsFromSubRouter = (filePath: string): { method: string, path: string, description: string }[] => {
  const content = readFileContent(filePath);
  const endpointRegex = /router\.(get|post|put|delete|patch)\(\s*['"]([^'"]*)['"]/g;
  const descriptionRegex = /\/\*\*\s*\*\s*@swagger[\s\S]*?\*\s*description:\s*([^\r\n]+)/g;

  const endpoints: { method: string, path: string, description: string }[] = [];
  let match;

  // Tạo một mảng để lưu trữ các mô tả theo thứ tự
  const descriptions: string[] = [];

  // Tìm tất cả các mô tả
  let descMatch;
  while ((descMatch = descriptionRegex.exec(content)) !== null) {
    const description = descMatch[1].trim();
    descriptions.push(description);
  }

  // Tìm tất cả các endpoints và kết hợp với mô tả theo thứ tự xuất hiện
  let index = 0;  // Để ánh xạ mô tả đúng với endpoint
  while ((match = endpointRegex.exec(content)) !== null) {
    const method = match[1].toUpperCase();
    const path = match[2];
    const description = descriptions[index] || 'No description available';  // Lấy mô tả theo thứ tự
    endpoints.push({
      method,
      path,
      description
    });
    index++;  // Tăng index sau mỗi lần match
  }

  return endpoints;
};

// Nối các đường dẫn
const joinPaths = (basePath: string, relativePath: string): string => {
  return path.posix.join(basePath.replace(/\/$/, ''), relativePath.replace(/^\//, ''));
};

// Đồng bộ hóa database và sau đó lưu endpoints
sequelize.sync({ alter: true }).then(() => {
  // Đường dẫn tới file chính của router
  const filePath = path.join(__dirname, '../src/app.ts');
  const fileContent = readFileContent(filePath);

  // Trích xuất các tuyến đường (sub-router)
  const subRoutes = extractSubRoutes(fileContent);

  subRoutes.forEach(async subRoute => {
    const subRouterPath = path.join(__dirname, `../src/routes/${subRoute.file}.ts`);
    const endpoints = extractEndpointsFromSubRouter(subRouterPath);

    // Nối base path với các endpoint path
    const fullEndpoints = endpoints.map(endpoint => ({
      method: endpoint.method,
      path: joinPaths(subRoute.path, endpoint.path),
      description: endpoint.description
    }));

    try {
      for (const endpoint of fullEndpoints) {
        await ApiEndpoint.create(endpoint); // Lưu từng endpoint vào DB
      }
      console.log(`Endpoints for ${subRoute.path} have been saved.`);
    } catch (error) {
      console.error('Error saving endpoints:', error);
    }
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
});
