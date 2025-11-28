import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    topic: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("✅ Your message has been sent successfully!");
    setFormData({ topic: "", message: "", file: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1e] to-[#1a0f2f] text-white flex justify-center items-center px-6 py-12">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl w-full max-w-2xl backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 text-center mb-8">
          Contact Us ✉️
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          encType="multipart/form-data"
        >
          {/* Topic */}
          <div>
            <label className="block text-purple-300 font-semibold mb-2">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Enter your topic (e.g. Bug Report, Feedback)"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Message / Problem */}
          <div>
            <label className="block text-purple-300 font-semibold mb-2">
              Problem / Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your problem or feedback here..."
              rows="6"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-purple-300 font-semibold mb-2">
              Attach File (optional)
            </label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-500/80 file:text-white
                hover:file:bg-purple-600 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white py-3 rounded-lg font-semibold text-lg shadow-lg"
          >
            Send Message 🚀
          </button>
        </form>

        {/* Decorative Section */}
        <div className="mt-10 text-center text-gray-400 text-sm">
          <p>
            You can also reach us at{" "}
            <a
              href="mailto:vibhorsharma166@gmail.com"
              className="text-purple-400 hover:underline"
            >
              vibhorsharma166@gmail.com
            </a>
          </p>
          <p className="mt-1">We’ll get back to you within 24 hours!</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
