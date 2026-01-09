import { XIcon, StarIcon, SparklesIcon } from "lucide-react"
import { useState } from "react"
import apiInstance from "../../configs/api"
import toast from "react-hot-toast"

const FeedbackForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
    rating: 0,
    source: "landing",
  })

  const [enhancing, setEnhancing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const enhanceMessage = async () => {
    if (!form.message.trim()) {
      toast.error("Please write some feedback first")
      return
    }

    if (form.rating === 0) {
      toast.error("Please select rating first")
      return
    }

    try {
      setEnhancing(true)

      const prompt = `
User rating: ${form.rating} out of 5
User feedback: ${form.message}
`

      const { data } = await apiInstance.post("/ai/feedback", {
        userContent: prompt,
      })

      setForm((prev) => ({
        ...prev,
        message: data.enhancedContent,
      }))

      toast.success("Feedback enhanced ✨")
    } catch (error) {
      toast.error("Failed to enhance feedback")
    } finally {
      setEnhancing(false)
    }
  }

  const submitFeedback = async (e) => {
    e.preventDefault()

    if (form.rating === 0) {
      toast.error("Please select a rating")
      return
    }

    try {
      setSubmitting(true)
      const { data } = await apiInstance.post("/feedback", form)
      toast.success(data.message || "Thanks for your feedback!")
      onClose()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitFeedback}
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative"
      >
        {/* Header */}
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Share your feedback</h2>

        {/* Close */}
        <XIcon
          onClick={onClose}
          className="absolute top-4 right-4 size-5 text-slate-400 cursor-pointer hover:text-slate-600"
        />

        {/* Name */}
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded-md text-sm focus:border-green-600"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded-md text-sm focus:border-green-600"
        />

        {/* Role */}
        <input
          name="role"
          placeholder="Your role (Student, Fresher, Developer)"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded-md text-sm focus:border-green-600"
        />

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              onClick={() => setForm({ ...form, rating: star })}
              className={`size-6 cursor-pointer transition ${
                form.rating >= star ? "fill-green-500 text-green-500" : "text-slate-300"
              }`}
            />
          ))}
          <span className="text-sm text-slate-500 ml-2">
            {form.rating > 0 && `${form.rating}/5`}
          </span>
        </div>

        {/* AI Enhance */}
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={enhanceMessage}
            disabled={enhancing}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md
              border border-green-200 text-green-700
              hover:bg-green-50 transition disabled:opacity-50"
          >
            <SparklesIcon className="size-4" />
            {enhancing ? "Enhancing..." : "Enhance Message with AI"}
          </button>
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Write your feedback..."
          value={form.message}
          onChange={handleChange}
          required
          maxLength={500}
          rows={4}
          className="w-full mb-4 px-4 py-2 border rounded-md text-sm focus:border-green-600"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 rounded-md bg-green-600 text-white text-sm
            hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  )
}

export default FeedbackForm
