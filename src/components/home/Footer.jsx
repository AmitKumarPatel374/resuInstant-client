import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer
        className="mt-32 flex flex-col lg:flex-row 
justify-between 
items-center lg:items-start 
text-center lg:text-left 
gap-12 py-12 px-6 md:px-16 lg:px-24 xl:px-32 
text-[13px] text-gray-600 bg-green-300/60"
      >
        {/* Left section */}
        <div
          className="flex flex-col sm:flex-row flex-wrap 
gap-10 sm:gap-14 md:gap-20 
items-center lg:items-start 
w-full lg:w-auto"
        >
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0"
          >
            <h2 className="text-xl font-semibold tracking-tight">
              <span className="text-slate-800">resu</span>
              <span className="text-indigo-600 font-bold">Instant</span>
            </h2>
          </Link>

          {/* Product */}
          <div>
            <p className="text-slate-800 font-semibold">Product</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#features"
                  className="hover:text-green-600 transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-green-600 transition"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/app"
                  className="hover:text-green-600 transition"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-slate-800 font-semibold">Resources</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to="/app"
                  className="hover:text-green-600 transition"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-green-600 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-slate-800 font-semibold">Legal</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to="/app/privacy-policy"
                  className="hover:text-green-600 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/app/terms-of-use"
                  className="hover:text-green-600 transition"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right section */}
        <div
          className="flex flex-col 
items-center lg:items-end 
text-center lg:text-right 
gap-3 w-full lg:w-auto"
        >
          <p className="max-w-xs">
            A simple resume builder project focused on usability and clean design.
          </p>

          <p className="text-sm">© 2025 resuInstant</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  )
}

export default Footer
