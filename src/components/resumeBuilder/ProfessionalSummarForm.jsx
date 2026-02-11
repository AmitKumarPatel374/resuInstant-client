import { Loader2, Sparkles } from "lucide-react"
import React, { useState } from "react"
import apiInstance from "../../configs/api"
import toast from "react-hot-toast"

const ProfessionalSummarForm = ({ data, onChange, setResumeData }) => {

  const [isGenerating, setIsGenerating] = useState(false)

  const generatSumary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`
      const response = await apiInstance.post('/ai/enhance-pro-sum', { userContent: prompt })
      setResumeData(prev => ({
        ...prev,
        professional_summary: response.data.enhancedContent
      }))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generatSumary}
          className="flex items-center justify-center gap-2 
          w-full sm:w-auto
          px-4 py-2 text-sm 
          bg-purple-100 text-purple-700 
          rounded-lg hover:bg-purple-200 
          transition-colors disabled:opacity-50"
        >
          {isGenerating
            ? <Loader2 className="size-4 animate-spin" />
            : <Sparkles className="size-4" />
          }
          {isGenerating ? 'Enhancing...' : 'AI Enhance'}
        </button>
      </div>

      {/* TEXTAREA */}
      <div className="mt-4 sm:mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 sm:p-4 text-sm 
          border border-gray-300 rounded-lg
          focus:ring focus:ring-blue-500 focus:border-blue-500
          outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlighting your key strengths and career objectives..."
        />

        <p className="text-xs text-gray-500 mt-2 
        text-center sm:text-left max-w-full sm:max-w-[80%]">
          Tip : Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>

    </div>
  )
}

export default ProfessionalSummarForm
