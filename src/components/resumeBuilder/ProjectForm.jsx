import { FolderIcon, Plus, Trash2 } from "lucide-react"
import React from "react"

const ProjectForm = ({ data, onChange }) => {

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    }
    onChange([...data, newProject])
  }

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateProject = (index, field, value) => {
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
            Projects
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Add your projects
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center justify-center gap-2 
          w-full sm:w-auto
          px-4 py-2 text-sm 
          bg-green-100 text-green-700 
          rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
          <p className="text-sm">
            Click "Add Project" to get started.
          </p>
        </div>
      ) : (

        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border border-gray-200 rounded-lg space-y-4"
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-medium">
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* INPUTS */}
              <div className="grid grid-cols-1 gap-3">

                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  placeholder="Project Type"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg w-full"
                />

                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Project Description"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none w-full"
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectForm
