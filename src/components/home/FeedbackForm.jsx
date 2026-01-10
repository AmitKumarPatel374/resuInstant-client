import { XIcon, StarIcon, SparklesIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import apiInstance from "../../configs/api"
import toast from "react-hot-toast"

const FeedbackForm = ({
  variant = "modal", // "modal" | "inline"
  onClose,
  source = "landing",
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
    rating: 0,
    source,
  })

  const [enhancing, setEnhancing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
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
    } catch {
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
      setForm({ name: "", email: "",role:"", message: "",rating:0 })
      onClose?.()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  /* ================= FORM ================= */

  const FormContent = (
    <form
      onSubmit={submitFeedback}
      className={`bg-white border rounded-xl p-6 shadow-sm relative
      ${variant === "modal" ? "w-full max-w-md" : "max-w-2xl"}`}
    >
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Share your feedback</h2>

      {variant === "modal" && (
        <XIcon
          onClick={onClose}
          className="absolute top-4 right-4 size-5 text-slate-400 cursor-pointer hover:text-slate-600"
        />
      )}

      <input
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-3 px-4 py-2 border rounded-md text-sm focus:border-green-600"
      />

      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-3 px-4 py-2 border rounded-md text-sm focus:border-green-600"
      />

      <input
        name="role"
        placeholder="Your role (Student, Fresher, Developer)"
        value={form.role}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-2 border rounded-md text-sm focus:border-green-600"
      />

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            onClick={() => setForm((p) => ({ ...p, rating: star }))}
            className={`size-6 cursor-pointer ${
              form.rating >= star ? "fill-green-500 text-green-500" : "text-slate-300"
            }`}
          />
        ))}
        {form.rating > 0 && <span className="text-sm text-slate-500 ml-2">{form.rating}/5</span>}
      </div>

      {/* AI Enhance */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={enhanceMessage}
          disabled={enhancing}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md
          border border-green-200 text-green-700 hover:bg-green-50"
        >
          <SparklesIcon className="size-4" />
          {enhancing ? "Enhancing..." : "Enhance with AI"}
        </button>
      </div>

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

      <button
        type="submit"
        disabled={submitting}
        className={`
    w-full py-2 rounded-md text-sm transition
    flex items-center justify-center gap-2
    ${submitting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
    text-white
  `}
      >
        {submitting && <Loader2 className="size-4 animate-spin" />}
        {submitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  )

  /* ================= RENDER ================= */

  if (variant === "modal") {
    return (
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      >
        <div onClick={(e) => e.stopPropagation()}>{FormContent}</div>
      </div>
    )
  }

  return FormContent
}

export default FeedbackForm
