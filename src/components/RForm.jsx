import { useState } from "react";
import { addRequest } from "../db/airtable";
import { fetchLatestRequest } from "../db/airtable";
import { handleimageupload } from "../db/airtable";

export default function RForm({ user, modal, table }) {
  const [creator] = useState(user.UID);
  const [description, setDesc] = useState("");
  const [location, setLoc] = useState("");
  const [title, setTitle] = useState("");
  const [status] = useState("New");

  // Image state
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const imageurl = await handleimageupload(image);

    const latestRequest = await fetchLatestRequest();
    const match = latestRequest?.RID?.match(/RQ(\d+)/);
    const maxId = match ? parseInt(match[1], 10) : 0;
    const newId = `RQ${String(maxId + 1).padStart(3, "0")}`;

    const requestData = {
      RID: newId,
      title,
      location,
      description,
      status,
      created_by: creator,
      date_created: new Date().toLocaleDateString(),
      image_url: imageurl ? imageurl : null,
    };

    const result = await addRequest(requestData);
    modal();
    table();
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-navy-850 shadow-lg p-8 rounded-xl w-full max-w-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Enter Request Details
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
        />

        <textarea
          placeholder="Description"
          rows={5}
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white resize-none"
        ></textarea>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLoc(e.target.value)}
          className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg placeholder-gray-400 text-white"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-navy-900 border border-gray-700 rounded-md py-2 px-3 text-lg text-white"
        />

        {/* Preview */}
        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-400">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="mt-2 max-h-48 rounded-lg border border-gray-700"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-teal-200 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
