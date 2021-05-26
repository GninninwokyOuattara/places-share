import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const MIME_TYPE: { [key: string]: string } = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../upload/images"));
    },
    filename: (req, file, cb) => {
        const ext = `${uuidv4()}.${MIME_TYPE[file.mimetype]}`;
        cb(null, ext);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 600000,
    },
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE[file.mimetype];
        let error = isValid ? null : new Error("Not a mime type");
        if (error) {
            cb(error);
        } else {
            cb(null, true);
        }
    },
});

export default upload;
