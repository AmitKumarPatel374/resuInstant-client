import React, { useEffect } from "react"
import apiInstance from "../configs/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  const [timer, setTimer] = React.useState(60)
  const [resending, setResending] = React.useState(false)

  const navigate = useNavigate()

  const sendResetLink = async () => {
    if (!email) {
      toast.error("Please enter your email")
      return
    }

    try {
      setLoading(true)
      const { data } = await apiInstance.post("/auth/forgot-password", { email })
      toast.success(data.message)
      setSent(true)
      setTimer(60)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendResetLink()
  }

  const handleResend = async () => {
    if (timer > 0) return
    try {
      setResending(true)
      await sendResetLink()
    } finally {
      setResending(false)
    }
  }

  useEffect(() => {
    if (!sent || timer === 0) return
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [sent, timer])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl px-8 py-10 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your registered email to receive a reset link
        </p>

        <div className="mt-8">
          <input
            type="email"
            placeholder="Email address"
            className="w-full h-11 px-4 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-11 rounded-full bg-green-500 text-white font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : sent ? "Link Sent" : "Send Reset Link"}
        </button>

        {sent && (
          <p className="text-sm text-gray-500 text-center mt-6">
            Didn’t receive the email?{" "}
            <span
              onClick={handleResend}
              className={`text-green-500 cursor-pointer ${
                timer > 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:underline"
              }`}
            >
              {resending
                ? "Resending..."
                : timer > 0
                ? `Resend in ${timer}s`
                : "Resend link"}
            </span>
          </p>
        )}

        {/* 👇 Back to Login Button */}
        <button
          type="button"
          onClick={() => navigate("/app")}
          className="mt-6 w-full h-11 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Back to Login
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          You can try logging in if you remember your password.
        </p>
      </form>
    </div>
  )
}

export default ForgotPassword
