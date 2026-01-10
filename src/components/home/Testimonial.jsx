import React, { useRef, useState, useEffect } from "react"
import { BookUserIcon, ChevronLeft, ChevronRight, StarIcon } from "lucide-react"
import Title from "./Title"
import FeedbackForm from "./FeedbackForm"
import apiInstance from "../../configs/api"
import { useNavigate } from "react-router-dom"
import ReviewCard from "../ReviewCard"

const Testimonial = () => {
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const sliderRef = useRef(null)
  const navigate = useNavigate()

  const getFeedbacks = async () => {
    try {
      const { data } = await apiInstance.get("/feedback/data")
      setFeedbacks(data.feedbacks)
    } catch (error) {
      console.log("error in finding feedbacks, ", error)
    }
  }

  useEffect(() => {
    getFeedbacks()
  }, [])

  const scroll = (direction) => {
    if (!sliderRef.current) return
    const width = sliderRef.current.offsetWidth
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    })
  }

  const averageRating = feedbacks.length
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0

  return (
    <>
      {/* Header */}
      <section
        id="testimonials"
        className="max-w-6xl mx-auto px-4 my-20 scroll-mt-16"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
            <BookUserIcon className="size-4 stroke-green-600" />
            <span>User feedback</span>
          </div>

          <Title
            title="What users think about this project"
            description="Honest feedback from people who tried the resume builder."
          />

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`size-4 ${
                    star <= Math.round(averageRating)
                      ? "fill-green-500 text-green-500"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>

            <span className="font-medium text-slate-700">{averageRating} / 5</span>

            <span className="text-slate-500">({feedbacks.length} verified reviews)</span>
          </div>

          <button
            onClick={() => setShowFeedback(true)}
            className="mt-6 px-6 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700 transition"
          >
            Give Feedback
          </button>
        </div>
        <div className="mt-6 flex  justify-end">
          <button
            onClick={() => navigate("/app/reviews")}
            className="text-sm font-medium text-green-600 hover:text-green-700 transition"
          >
            View all reviews →
          </button>
        </div>

        {/* Slider */}
        <div className="relative mt-10">
          {/* Controls */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow"
          >
            <ChevronRight className="size-4" />
          </button>

          {/* Cards */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {feedbacks
              .filter((feedback) => feedback.rating >= 4)
              .slice(0, 10)
              .map((feedback, index) => (
                <ReviewCard
                  key={feedback._id || index}
                  feedback={feedback}
                  variant="slider"
                />
              ))}
          </div>
        </div>
      </section>

      {showFeedback && (
        <FeedbackForm
          variant="modal"
          source="landing"
          onClose={() => setShowFeedback(false)}
        />
      )}
    </>
  )
}

export default Testimonial
