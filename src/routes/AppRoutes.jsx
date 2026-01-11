import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Layout from "../pages/Layout"
import Dashboard from "../pages/Dashboard"
import ResumeBuilder from "../pages/ResumeBuilder"
import Preview from "../pages/Preview"
import Login from "../pages/Login"
import PrivacyPolicy from "../pages/PrivacyPolicy"
import TermsOfUse from "../pages/TermsOfUse"
import Reviews from "../pages/Reviews"
import ForgotPassword from "../pages/ForgotPassword"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/view/:resumeId" element={<Preview />} />

      {/* Protected / App layout routes */}
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>
      <Route path="/app/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/app/terms-of-use" element={<TermsOfUse />} />
      <Route path="/app/reviews" element={<Reviews />} />
    </Routes>
  )
}

export default AppRoutes
