import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react"
import React, { useState } from "react"
import apiInstance from "../../configs/api"
import toast from "react-hot-toast"

const ExperienceForm = ({ data, onChange }) => {

  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    }
    onChange([...data, newExperience])
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.company}.`

    try {
      const { data } = await apiInstance.post('/ai/enhance-job-desc', { userContent: prompt })
      updateExperience(index, "description", data.enhancedContent)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Add your job experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center justify-center gap-2 
          w-full sm:w-auto 
          px-4 py-2 text-sm 
          bg-green-100 text-green-700 
          rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">
            Click "Add Experience" to get started.
          </p>
        </div>
      ) : (

        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border border-gray-200 rounded-lg space-y-4"
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-medium">
                  Experience #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* INPUT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={experience.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <input
                  type="text"
                  value={experience.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <input
                  type="month"
                  value={experience.end_date || ""}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full disabled:bg-gray-100"
                />
              </div>

              {/* CHECKBOX */}
              <label className="flex items-center gap-2">
                <input
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="flex items-center justify-center gap-1 
                    w-full sm:w-auto
                    px-3 py-1 text-xs 
                    bg-purple-100 text-purple-700 
                    rounded hover:bg-purple-200 
                    transition-colors disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg resize-none"
                  placeholder="Describe your key responsibilities and achievements"
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
