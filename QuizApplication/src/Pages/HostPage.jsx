import React, { useState } from "react";
import { Upload, FileText, Info, Download, PlusCircle, Sparkles } from "lucide-react";

export default function HostPage() {
  const [method, setMethod] = useState("");
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: "" }]);
  const [aiPrompt, setAiPrompt] = useState("");

  const downloadSample = () => {
    const content = [
      "Who was the first person to step on the Moon, and in which year did it happen?|Neil Armstrong|Buzz Aldrin|Yuri Gagarin|John Glenn|Neil Armstrong",
      "",
      "Which programming language is used for Android development?|Java|Kotlin|C++|Python|Kotlin",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quiz_sample.txt";
    a.click();
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "question" || field === "answer") updated[index][field] = value;
    else updated[index].options[field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  return (
    <div className="min-h-screen bg-[#0e0717] text-white flex flex-col items-center py-10 px-6">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Host a Quiz Room
      </h1>

      <div className="bg-[#1a0e26] w-full max-w-3xl rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="flex flex-col gap-5">
          {/* Room Info */}
          <input
            type="text"
            placeholder="Enter Room Name"
            className="bg-[#2a1b3d] p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Enter Quiz Topic"
            className="bg-[#2a1b3d] p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Method Selection */}
          <h2 className="text-lg font-semibold mt-4 mb-2 text-purple-300">
            Choose Question Input Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "file", icon: <Upload className="mx-auto mb-2 text-purple-400" />, label: "File Upload" },
              { key: "manual", icon: <FileText className="mx-auto mb-2 text-purple-400" />, label: "Manual Entry" },
              { key: "ai", icon: <Sparkles className="mx-auto mb-2 text-purple-400" />, label: "AI Generator" },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setMethod(key)}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  method === key
                    ? "border-purple-500 bg-purple-600/20"
                    : "border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10"
                }`}
              >
                {icon}
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* FILE UPLOAD METHOD */}
          {method === "file" && (
            <div className="mt-6 bg-[#22132f] p-6 rounded-2xl border border-purple-600/30 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-purple-400" />
                <h3 className="text-xl font-semibold text-purple-300">
                  File Format Instructions
                </h3>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Upload a <span className="text-purple-400 font-semibold">.txt</span> or{" "}
                <span className="text-purple-400 font-semibold">.csv</span> file.
                Each question must be on a new line, separated by{" "}
                <span className="bg-[#2e1c3e] px-1 rounded">|</span> symbol.
              </p>

              <div className="bg-[#2e1c3e] p-4 rounded-lg text-sm text-gray-300 mb-4">
                <p className="font-semibold text-purple-300 mb-1">Format:</p>
                <code>Question|Option1|Option2|Option3|Option4|CorrectAnswer</code>
              </div>

              <div className="bg-[#2e1c3e] p-4 rounded-lg text-sm text-gray-300 mb-4">
                <p className="font-semibold text-purple-300 mb-1">Example:</p>
                <pre className="whitespace-pre-wrap leading-relaxed">
{`Who was the first person to step on the Moon, and in which year did it happen?|Neil Armstrong|Buzz Aldrin|Yuri Gagarin|John Glenn|Neil Armstrong

Which programming language is used for Android development?|Java|Kotlin|C++|Python|Kotlin`}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <input
                  type="file"
                  accept=".txt,.csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="text-sm bg-[#2a1b3d] p-2 rounded-lg file:bg-purple-600 file:text-white file:border-none file:rounded-md file:px-3 file:py-2 file:mr-3 hover:file:bg-purple-700"
                />

                <button
                  onClick={downloadSample}
                  className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition"
                >
                  <Download size={16} /> Download Sample
                </button>
              </div>
            </div>
          )}

          {/* MANUAL ENTRY METHOD */}
          {method === "manual" && (
            <div className="mt-6 bg-[#22132f] p-6 rounded-2xl border border-purple-600/30 shadow-md">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                Manually Add Questions
              </h3>
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 rounded-xl bg-[#2e1c3e] border border-purple-500/30"
                >
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                    className="w-full p-2 rounded-lg bg-[#39224c] mb-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => (
                      <input
                        key={optIdx}
                        type="text"
                        placeholder={`Option ${optIdx + 1}`}
                        value={opt}
                        onChange={(e) => handleQuestionChange(index, optIdx, e.target.value)}
                        className="p-2 rounded-lg bg-[#39224c] outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.answer}
                    onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
                    className="mt-3 w-full p-2 rounded-lg bg-[#39224c] outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
              >
                <PlusCircle size={20} /> Add Another Question
              </button>
            </div>
          )}

          {/* AI GENERATOR METHOD */}
          {method === "ai" && (
            <div className="mt-6 bg-[#22132f] p-6 rounded-2xl border border-purple-600/30 shadow-md">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                Generate Questions with AI
              </h3>

              <textarea
                rows={4}
                placeholder="Describe the topic and difficulty... (e.g., '10 questions about React basics for beginners')"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#39224c] outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform duration-300 text-white py-3 rounded-full font-semibold">
                Generate Quiz
              </button>
            </div>
          )}

          <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform duration-300 text-white py-3 rounded-full font-semibold text-lg">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
