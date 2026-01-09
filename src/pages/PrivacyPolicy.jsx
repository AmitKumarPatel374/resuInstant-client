import React from "react"
import { Link } from "react-router-dom"

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/40 to-white">
      {/* Top Brand Bar */}
      <div className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold tracking-tight">
            <span className="text-slate-800">resu</span>
            <span className="text-indigo-600 font-bold">Instant</span>
          </Link>

          <Link
            to="/"
            className="text-sm text-slate-600 hover:text-green-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Last updated: June 2025
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 sm:p-10 space-y-8 text-slate-700 text-sm leading-relaxed">
          <p>
            At <strong>resuInstant</strong>, we respect your privacy. This
            application is a resume builder project designed for learning and
            practical implementation, and we collect only what is necessary to
            provide its core features.
          </p>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Basic account information such as name and email</li>
              <li>Resume content entered by the user</li>
              <li>Uploaded PDF resumes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              How Your Data Is Used
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To create, edit, and manage resumes</li>
              <li>To provide AI-based suggestions for resume improvement</li>
              <li>To enhance overall user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Resume Visibility
            </h2>
            <p>
              Resumes are private by default. A resume becomes public only if
              the user explicitly enables sharing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Third-Party Services
            </h2>
            <p>
              We may use third-party services such as AI APIs to process resume
              content. These services only receive data required to perform
              their specific function.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Contact
            </h2>
            <p>
              For any privacy-related questions, you can reach out through the
              project repository or developer portfolio.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
