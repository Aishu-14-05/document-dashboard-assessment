import axios from "axios";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      setStatus("Uploading...");

      await axios.post("http://localhost:5000/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setUploadProgress(percentCompleted);
        },
      });

      setStatus("Upload Complete");
    } catch (error) {
      console.log(error);
      setStatus("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold text-blue-600">
        Document Dashboard
      </h1>

      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={(e) => setFiles(e.target.files)}
        className="bg-white p-4 rounded-lg"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Upload Files
      </button>

      <div className="w-96 bg-white p-4 rounded-lg shadow">
        <p className="font-semibold">{status}</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm">{uploadProgress}%</p>
      </div>
    </div>
  );
}

export default App;