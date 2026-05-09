import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'dist', 'assets');
const destDir = path.join(process.cwd(), 'dist', 'admin', 'assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.cpSync(srcDir, destDir, { recursive: true });
console.log("Assets copied to dist/admin/assets for Vercel routing fallback.");
