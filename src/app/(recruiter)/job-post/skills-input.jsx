"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function SkillsInput({ skills = [], setSkills, placeholder = "Add a skill" }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="bg-gradient-to-r from-[#2B4CB8] via-[#3B5FD9] to-[#4A6EFA] hover:from-[#24409E] hover:to-[#3F5ED9] text-white px-4 py-2 sm:py-3 rounded-lg cursor-pointer transition-all active:scale-[0.98] select-none font-medium flex items-center justify-center shrink-0 shadow-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="text-gray-800 font-medium">{skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-0.5 rounded-full"
              title="Remove"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
