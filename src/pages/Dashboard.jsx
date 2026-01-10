import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import pdfToText from "react-pdftotext"
import apiInstance from "../configs/api"

import ResumeGrid from "../components/Dashboard/ResumeGrid"
import CreateResumeModal from "../components/Dashboard/CreateResumeModal"
import UploadResumeModal from "../components/Dashboard/UploadResumeModal"
import EditResumeModal from "../components/Dashboard/EditResumeModal"
import Contact from "../components/Dashboard/Contact"
import FeedbackForm from "../components/home/FeedbackForm"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const colors = ["#9333ea", "#040404", "#dc2626", "#0284c7", "#16a34a"]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState("resumes")

  const loadAllResumes = async () => {
    try {
      const { data } = await apiInstance.get("/resume/data")
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (e) => {
    e.preventDefault()
    try {
      const { data } = await apiInstance.post("/resume/create", { title })
      setTitle("")
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    if (!resume) return toast.error("Please upload a PDF file")

    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await apiInstance.post("/ai/upload-resume", {
        title,
        resumeText,
      })
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const editTitle = async (e) => {
    e.preventDefault()
    try {
      const { data } = await apiInstance.put("/resume/update", {
        resumeId: editResumeId,
        resumeData: { title },
      })

      setAllResumes(allResumes.map((r) => (r._id === editResumeId ? { ...r, title } : r)))

      setEditResumeId("")
      setTitle("")
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return
    try {
      const { data } = await apiInstance.delete(`/resume/delete/${resumeId}`)
      setAllResumes(allResumes.filter((r) => r._id !== resumeId))
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
        <nav className="space-y-1 flex-1">
          {[
            { id: "resumes", label: "Your Resumes" },
            { id: "create", label: "Create Resume" },
            { id: "upload", label: "Upload Resume" },
            { id: "contact", label: "Contact" },
            { id: "feedback", label: "feedback" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition
        ${
          activeView === item.id
            ? "bg-green-50 text-green-700 font-semibold border-l-4 border-green-600"
            : "text-slate-600 hover:bg-slate-100"
        }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ================= RIGHT CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* ========== CREATE RESUME VIEW ========== */}
        {activeView === "create" && (
          <>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Create a Resume</h1>
            <p className="text-sm text-slate-600 mb-6">
              Start building your resume from scratch with guided steps.
            </p>

            <div className="max-w-sm">
              <div
                onClick={() => setShowCreateResume(true)}
                className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
        hover:border-indigo-400 bg-white"
              >
                <div className="mx-auto size-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl">
                  +
                </div>
                <h3 className="mt-4 font-medium">Create resume</h3>
                <p className="text-sm text-slate-500">Start from scratch</p>
              </div>
            </div>
          </>
        )}

        {/* ========== UPLOAD RESUME VIEW ========== */}
        {activeView === "upload" && (
          <>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Upload Resume</h1>
            <p className="text-sm text-slate-600 mb-6">
              Upload an existing PDF and enhance it with AI.
            </p>

            <div className="max-w-sm">
              <div
                onClick={() => setShowUploadResume(true)}
                className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
        hover:border-purple-400 bg-white"
              >
                <div className="mx-auto size-12 rounded-full bg-purple-500 text-white flex items-center justify-center">
                  ☁
                </div>
                <h3 className="mt-4 font-medium">Upload resume</h3>
                <p className="text-sm text-slate-500">Improve an existing PDF</p>
              </div>
            </div>
          </>
        )}

        {/* ========== RESUME LIST VIEW ========== */}
        {activeView === "resumes" && (
          <>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Your Resumes</h1>
            <p className="text-sm text-slate-600 mb-6">View and manage all your created resumes.</p>

            {allResumes.length === 0 ? (
              <p className="text-sm text-slate-500 mt-10">You haven’t created any resumes yet.</p>
            ) : (
              <ResumeGrid
                resumes={allResumes}
                colors={colors}
                onOpen={(id) => navigate(`/app/builder/${id}`)}
                onDelete={deleteResume}
                onEdit={(id, title) => {
                  setEditResumeId(id)
                  setTitle(title)
                }}
              />
            )}
          </>
        )}

        {/* ========== CONTACT VIEW ========== */}
        {activeView === "contact" && <Contact />}

        {/* ========== feedback VIEW ========== */}
        {activeView === "feedback" && (
          <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-slate-800">Share Your Feedback</h1>
              <p className="text-sm text-slate-600 mt-1">
                Help us improve resuInstant by sharing your experience and suggestions.
              </p>
            </div>

            {/* Form */}
            <FeedbackForm
              variant="inline"
              source="dashboard"
            />
          </div>
        )}
      </main>

      {/* ================= MODALS ================= */}
      {showCreateResume && (
        <CreateResumeModal
          title={title}
          setTitle={setTitle}
          onClose={() => setShowCreateResume(false)}
          onSubmit={createResume}
        />
      )}

      {showUploadResume && (
        <UploadResumeModal
          title={title}
          setTitle={setTitle}
          resume={resume}
          setResume={setResume}
          isLoading={isLoading}
          onClose={() => setShowUploadResume(false)}
          onSubmit={uploadResume}
        />
      )}

      {editResumeId && (
        <EditResumeModal
          title={title}
          setTitle={setTitle}
          onClose={() => setEditResumeId("")}
          onSubmit={editTitle}
        />
      )}
    </div>
  )
}

export default Dashboard
