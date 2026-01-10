import {
  MailIcon,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import apiInstance from "../../configs/api"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsSending(true)
      if (!form.name || !form.email || !form.message) {
        toast.error("Please fill all fields")
        return
      }

      const response = await apiInstance.post("/mail/contact", form)

      toast.success(response.data.message)
      setForm({ name: "", email: "", message: "" })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Contact</h1>
        <p className="text-sm text-slate-600 mt-1">
          Have a question or feedback? Send us a message.
        </p>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="bg-white border rounded-xl p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="text-sm text-slate-600">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:border-green-600 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:border-green-600 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={4}
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:border-green-600 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={`
    w-full py-2 rounded-md text-sm text-white transition
    flex items-center justify-center gap-2
    ${isSending ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
  `}
          >
            {isSending && <Loader2 className="size-4 animate-spin" />}
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* ================= CONTACT LINKS ================= */}
      <div className="mt-6">
        <p className="text-sm text-slate-500 mb-3">Or reach us directly:</p>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2 text-slate-600">
            <MailIcon className="size-4" />
            resuinstant@.com
          </span>

          <a
            href="https://www.linkedin.com/in/amit-kumar-patel-053130316/"
            target="_blank"
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>

          <a
            href="https://x.com/Amit_Patel1213"
            target="_blank"
            className="flex items-center gap-2 text-slate-600 hover:text-sky-500 transition"
          >
            <TwitterIcon className="size-4" />
            Twitter
          </a>

          <a
            href="https://github.com/AmitKumarPatel374"
            target="_blank"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>

          <a
            href="https://www.instagram.com/simple_boy_amit_7/"
            target="_blank"
            className="flex items-center gap-2 text-slate-600 hover:text-pink-500 transition"
          >
            <InstagramIcon className="size-4" />
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
