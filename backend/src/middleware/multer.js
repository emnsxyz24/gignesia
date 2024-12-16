import multer, { diskStorage } from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get the directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "..", "..", "public", "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
  
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Hanya boleh file gambar(jpeg, jpg, png)!'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
});

export default upload;