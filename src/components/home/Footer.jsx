import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className="mt-40 flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-green-300/60 ">
        {/* Left section */}
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          {/* Logo */}
          <Link to="/">
            <h2 className="text-xl font-semibold tracking-tight">
              <span className="text-slate-800">resu</span>
              <span className="text-indigo-600 font-bold">Instant</span>
            </h2>
          </Link>

          {/* Product */}
          <div>
            <p className="text-slate-800 font-semibold">Product</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#features" className="hover:text-green-600 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-green-600 transition">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/app" className="hover:text-green-600 transition">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-slate-800 font-semibold">Resources</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/app" className="hover:text-green-600 transition">
                  Resume Builder
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-slate-800 font-semibold">Legal</p>
            <ul className="mt-2 space-y-2 flex flex-col">
              <Link to='/app/privacy-policy'>
                <span className="cursor-default cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link to='/app/terms-of-use'>
                <span className="cursor-default cursor-pointer">
                  Terms of Use
                </span>
              </Link>
            </ul>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-60">
            A simple resume builder project focused on usability and clean design.
          </p>

          <p className="mt-3 text-center">
            © 2025 resuInstant
          </p>
        </div>
      </footer>

      {/* Font (optional if already global) */}
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
