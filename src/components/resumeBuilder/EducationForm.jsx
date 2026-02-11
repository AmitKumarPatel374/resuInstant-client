import { GraduationCap, Plus, Trash2 } from "lucide-react"
import React from "react"

const EducationForm = ({ data, onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    }
    onChange([...data, newEducation])
  }

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateEducation = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Add your education details
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center justify-center gap-2 
          w-full sm:w-auto
          px-4 py-2 text-sm 
          bg-green-100 text-green-700 
          rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">
            Click "Add Education" to get started.
          </p>
        </div>
      ) : (

        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border border-gray-200 rounded-lg space-y-4"
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-medium">
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* INPUT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <input
                  type="text"
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="Institute Name"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <input
                  type="text"
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <input
                  type="text"
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="Field Of Study"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <input
                  type="month"
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />
              </div>

              {/* GPA */}
              <input
                type="text"
                value={education.gpa || ""}
                onChange={(e) =>
                  updateEducation(index, "gpa", e.target.value)
                }
                placeholder="GPA (optional)"
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
              />

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
