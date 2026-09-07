const rateLimitMap = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

export function checkRateLimit(identifier) {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(identifier, { windowStart: now, count: 1 });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

export function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str.trim().replace(/[<>]/g, "");
}

export const ALLOWED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/zip": [".zip"],
  "application/x-zip-compressed": [".zip"],
  "application/acad": [".dwg"],
  "image/vnd.dwg": [".dwg"],
  "application/dxf": [".dxf"],
  "model/step": [".step", ".stp"],
  "application/step": [".step", ".stp"],
};

export const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".dwg",
  ".dxf",
  ".step",
  ".stp",
  ".jpg",
  ".jpeg",
  ".png",
  ".zip",
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_FILES = 5;

export function validateFile(file) {
  if (!file) return { valid: false, error: "No file provided" };
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `${file.name} exceeds 10MB limit` };
  }

  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `${file.name}: allowed types are PDF, DWG, DXF, STEP, JPG, PNG, ZIP`,
    };
  }

  return { valid: true };
}

export function validateContactForm(data) {
  const errors = {};

  if (!data.firstName?.trim()) errors.firstName = "First name is required";
  if (!data.lastName?.trim()) errors.lastName = "Last name is required";
  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (!data.message?.trim()) errors.message = "Message is required";
  if (data.phone && !/^[\d\s+()-]{8,20}$/.test(data.phone)) {
    errors.phone = "Invalid phone number";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
