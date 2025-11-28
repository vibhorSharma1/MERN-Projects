import React, { useState } from "react";

export default function ProfileUpdationPage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#191022] to-[#110a18] p-6">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#6A0DAD,_transparent_30%),_radial-gradient(circle_at_bottom_right,_#00FFFF,_transparent_30%)]"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#1a1122]/80 p-8 shadow-2xl backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Update Your Profile
        </h1>

        {/* Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={
                profile.image ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-secondary shadow-lg object-cover"
            />
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:bg-secondary transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L13 1.586A2 2 0 0011.586 1H4zm8 2a1 1 0 011 1v3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H8a1 1 0 010-2h3V6a1 1 0 011-1z" />
              </svg>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-[#ad92c9] text-sm mt-3">
            Upload your profile picture
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full h-12 p-3 rounded-lg bg-[#362348] text-white placeholder:text-[#ad92c9] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full h-12 p-3 rounded-lg bg-[#362348] text-white placeholder:text-[#ad92c9] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              className="w-full h-12 p-3 rounded-lg bg-[#362348] text-white placeholder:text-[#ad92c9] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg shadow-[0_0_20px_rgba(106,13,173,0.6)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:scale-105 transition-all duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
