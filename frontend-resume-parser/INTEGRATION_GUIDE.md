# Frontend-Backend Integration Setup

## ✅ Setup Complete!

Your frontend is now integrated with the Django backend API using axios with real-time upload progress.

---

## 📁 Files Modified

### 1. `.env.local` (Created)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. `package.json` (Updated)
- ✅ Added `axios` dependency

### 3. `FileUpload.jsx` (Updated)
- ✅ Axios integration with real API calls
- ✅ Upload progress tracking
- ✅ Error handling
- ✅ Success/failure states
- ✅ PDF and DOCX support

---

## 🚀 How to Run

### Backend (Django):
```bash
cd /Users/ayush/lrn/server-resume-parser
source venv/bin/activate
python manage.py runserver
```
Server runs at: `http://localhost:8000`

### Frontend (Next.js):
```bash
cd /Users/ayush/lrn/frontend-resume-parser/frontend-resume-parser
npm run dev
```
App runs at: `http://localhost:3000`

---

## 🎯 Features Implemented

### Real API Integration
- ✅ POST request to `/api/candidates/upload/`
- ✅ FormData with multipart/form-data
- ✅ Environment variable for API URL

### Upload Progress
- ✅ Real-time progress bar (0-100%)
- ✅ Uses axios `onUploadProgress` callback
- ✅ Animated progress indicator

### Error Handling
- ✅ Network errors (backend not running)
- ✅ Validation errors (invalid file type)
- ✅ Server errors (500, 400, etc.)
- ✅ User-friendly error messages

### User Experience
- ✅ Success message with green Alert
- ✅ Error message with red Alert
- ✅ Upload progress percentage
- ✅ File info display (name, size)
- ✅ "Upload another" button
- ✅ Drag & drop support
- ✅ PDF & DOCX support

---

## 🧪 Test It!

1. **Start both servers** (backend + frontend)
2. **Open** `http://localhost:3000`
3. **Upload a PDF/DOCX file**
4. **Watch** the real-time progress bar
5. **See** success message with uploaded file info

---

## 📊 API Response

When upload succeeds, you'll see:
```json
{
  "id": 1,
  "resume_file": "http://localhost:8000/media/resumes/filename.pdf",
  "created_at": "2025-12-10T17:23:45Z",
  "message": "Resume uploaded successfully"
}
```

This data is stored in `uploadedData` state and displayed to the user.

---

## 🔧 Environment Variables

Update `.env.local` if your backend runs on a different port:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Note:** Restart the Next.js dev server after changing env vars!

---

## ⚡ Axios Upload Progress

The progress bar uses axios's built-in feature:
```javascript
onUploadProgress: (progressEvent) => {
  const percentCompleted = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
  setProgress(percentCompleted);
}
```

This provides real-time upload progress based on bytes transferred!

---

## 🎨 UI States

1. **Initial**: Empty upload area (drag & drop)
2. **Uploading**: Progress bar animating 0→100%
3. **Success**: Green checkmark + success alert
4. **Error**: Red alert with error message
5. **Reset**: "Upload another" button

---

## 🐛 Common Issues

### "Cannot connect to server"
- ✅ Make sure Django backend is running
- ✅ Check backend URL in `.env.local`

### CORS Errors
- ✅ Already configured in Django `settings.py`
- ✅ CORS allows `localhost:3000`

### File Upload Fails
- ✅ Check file size (max 10MB typically)
- ✅ Check file type (PDF/DOCX only)
- ✅ Check browser console for errors

---

## 🎉 You're All Set!

Upload resumes and watch them get saved to:
```
server-resume-parser/media/resumes/
```

The upload progress is real and the backend receives the files! 🚀
