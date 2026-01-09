import React from "react"
import { Link } from "react-router-dom"

const TermsOfUse = () => {
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
            Terms of Use
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Last updated: June 2025
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 sm:p-10 space-y-8 text-slate-700 text-sm leading-relaxed">
          <p>
            These Terms of Use govern your access to and use of{" "}
            <strong>resuInstant</strong>. By using this application, you agree
            to comply with the terms outlined below.
          </p>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Use of the Application
            </h2>
            <p>
              resuInstant allows users to create, edit, and download resumes
              for personal and educational purposes. Commercial usage is not
              intended.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              User Responsibility
            </h2>
            <p>
              You are responsible for the accuracy and completeness of the
              information entered into your resume. The developer does not
              guarantee employment outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              AI Features Disclaimer
            </h2>
            <p>
              AI-powered suggestions are provided to assist users in improving
              resume content. These suggestions should be reviewed before final
              use, and responsibility remains with the user.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Availability of Service
            </h2>
            <p>
              As this is a learning-based project, features may be updated,
              modified, or discontinued without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Acceptance of Terms
            </h2>
            <p>
              By continuing to use this application, you acknowledge that you
              have read, understood, and agreed to these Terms of Use.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfUse
