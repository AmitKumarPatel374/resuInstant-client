import React from "react"
import { User2Icon, Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import apiInstance from "../configs/api"
import { useDispatch } from "react-redux"
import { login } from "../app/features/authSlice"
import toast from "react-hot-toast"
import { useEffect } from "react"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const query = new URLSearchParams(window.location.search)
  const urlState = query.get("state")
  const [state, setState] = React.useState(urlState || "login")

  const [step, setStep] = React.useState("form") // form | otp
  const [otp, setOtp] = React.useState("")

  const [resending, setResending] = React.useState(false)
  const [timer, setTimer] = React.useState(60)

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await apiInstance.post(`/auth/${state}`, formData)
      toast.success(data.message)

      // 🔹 If signup → move to OTP screen
      if (state === "register") {
        setStep("otp")
        return
      }

      dispatch(login(data))
      navigate("/app")
    } catch (error) {
      toast(error?.response?.data?.message || error.message)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()

    try {
      const { data } = await apiInstance.post("/auth/verify-email", {
        email: formData.email,
        otp,
      })

      toast.success(data.message)

      // Auto login after verification
      dispatch(login(data))
      navigate("/app")
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleResendOtp = async () => {
    if (timer > 0) return

    try {
      setResending(true)

      const { data } = await apiInstance.post("/auth/resend-otp", {
        email: formData.email,
      })

      toast.success(data.message)
      setTimer(60) // restart timer
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setResending(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (step !== "otp") return

    if (timer === 0) return

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [step, timer])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={step === "form" ? handleSubmit : handleVerifyOtp}
        className="flex justify-center items-center min-h-screen bg-gray-50"
      >
        <div className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
          {/* ===== FORM STEP ===== */}
          {step === "form" && (
            <>
              <h1 className="text-gray-900 text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
              </h1>

              <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>

              {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <User2Icon
                    size={16}
                    color="#6B7280"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border-none outline-none ring-0"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail
                  size={13}
                  color="#6B7280"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email id"
                  className="border-none outline-none ring-0"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Lock
                  size={13}
                  color="#6B7280"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border-none outline-none ring-0"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4 text-left text-green-500">
                <button
                 onClick={()=>navigate('/forgot-password')}
                  className="text-sm"
                  type="reset"
                >
                  Forget password?
                </button>
              </div>

              <button
                type="submit"
                className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
              >
                {state === "login" ? "Login" : "Sign up"}
              </button>

              <p
                onClick={() => setState((prev) => (prev === "login" ? "register" : "login"))}
                className="text-gray-500 text-sm mt-3 mb-11"
              >
                {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <span className="text-green-500 hover:underline cursor-pointer">click here</span>
              </p>
            </>
          )}

          {/* ===== OTP STEP (SAME INPUT STYLE) ===== */}
          {step === "otp" && (
            <>
              <h1 className="text-gray-900 text-3xl mt-10 font-medium">Verify Email</h1>

              <p className="text-gray-500 text-sm mt-2">Enter OTP sent to your email</p>

              <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border-none outline-none ring-0 w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

              </div>
                <p className="text-gray-500 text-sm mt-4">
                  Didn’t receive the OTP?{" "}
                  <span
                    onClick={handleResendOtp}
                    className={`text-green-500 cursor-pointer ${
                      timer > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"
                    }`}
                  >
                    {resending ? "Resending..." : timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                  </span>
                </p>

              <button
                type="submit"
                className="mt-6 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity mb-11"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
