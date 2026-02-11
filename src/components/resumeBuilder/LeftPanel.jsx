import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import PersonalInfoForm from "./PersonalInfoForm"
import ProfessionalSummarForm from "./ProfessionalSummarForm"
import ExperienceForm from "./ExperienceForm"
import EducationForm from "./EducationForm"
import ProjectForm from "./ProjectForm"
import SkillsForm from "./SkillsForm"
import TemplateSelector from "./TemplateSelector"
import ColorPicker from "./ColorPicker"
import toast from "react-hot-toast"

const LeftPanel = ({
  resumeData,
  setResumeData,
  activeSection,
  activeSectionIndex,
  setActiveSectionIndex,
  sections,
  removeBackGround,
  setRemoveBackGround,
  saveResume,
}) => {
  return (
    <div className="relative w-full lg:col-span-5 print:hidden">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 
      p-4 sm:p-6 pt-1">

        {/* PROGRESS BAR */}
        <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
        <hr
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
          style={{
            width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
          }}
        />

        {/* TOP CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center 
        gap-3 mb-6 border-b border-gray-300 py-2">

          {/* Template + Color */}
          <div className="flex flex-wrap items-center gap-2">
            <TemplateSelector
              selectedTemplate={resumeData.template}
              onChange={(template) =>
                setResumeData((prev) => ({ ...prev, template }))
              }
            />
            <ColorPicker
              selectedColor={resumeData.accent_color}
              onChange={(color) =>
                setResumeData((prev) => ({ ...prev, accent_color: color }))
              }
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">

            {activeSectionIndex !== 0 && (
              <button
                onClick={() => setActiveSectionIndex((p) => p - 1)}
                className="flex items-center justify-center gap-1 
                px-3 py-2 text-sm text-gray-600 
                hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft className="size-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
            )}

            <button
              onClick={() => setActiveSectionIndex((p) => p + 1)}
              disabled={activeSectionIndex === sections.length - 1}
              className="flex items-center justify-center gap-1 
              px-3 py-2 text-sm text-gray-600 
              hover:bg-gray-100 rounded-md transition-colors
              disabled:opacity-50"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* FORM SECTIONS */}
        <div className="space-y-6">

          {activeSection.id === "personal" && (
            <PersonalInfoForm
              data={resumeData.personal_info}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, personal_info: data }))
              }
              removeBackground={removeBackGround}
              setRemoveBackground={setRemoveBackGround}
            />
          )}

          {activeSection.id === "summary" && (
            <ProfessionalSummarForm
              data={resumeData.professional_summary}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, professional_summary: data }))
              }
              setResumeData={setResumeData}
            />
          )}

          {activeSection.id === "experience" && (
            <ExperienceForm
              data={resumeData.experience}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, experience: data }))
              }
            />
          )}

          {activeSection.id === "education" && (
            <EducationForm
              data={resumeData.education}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, education: data }))
              }
            />
          )}

          {activeSection.id === "projects" && (
            <ProjectForm
              data={resumeData.projects}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, projects: data }))
              }
            />
          )}

          {activeSection.id === "skills" && (
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, skills: data }))
              }
            />
          )}
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={() => toast.promise(saveResume, { loading: "Saving..." })}
          className="w-full sm:w-auto 
          bg-gradient-to-br from-green-100 to-green-200 
          ring-green-300 text-green-600 ring 
          rounded-md px-6 py-2 mt-6 text-sm
          hover:shadow-sm transition-all"
        >
          Save Changes
        </button>

      </div>
    </div>
  )
}

export default LeftPanel
