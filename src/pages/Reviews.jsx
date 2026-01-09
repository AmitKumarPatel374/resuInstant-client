import React, { useEffect, useState } from "react"
import {  ArrowLeftIcon, StarIcon } from "lucide-react"
import apiInstance from "../configs/api"
import FeedbackForm from "../components/home/FeedbackForm"
import { Link } from "react-router-dom"
import ReviewCard from "../components/ReviewCard"

const Reviews = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)

  const getFeedbacks = async () => {
    try {
      const { data } = await apiInstance.get("/feedback/data")
      setFeedbacks(data.feedbacks || [])
    } catch (error) {
      console.log("Error fetching feedbacks", error)
    }
  }

  useEffect(() => {
    getFeedbacks()
  }, [])

  const averageRating = feedbacks.length
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0

  

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Home
        </Link>
      </div>
      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-2xl font-semibold text-slate-800">User Reviews</h1>

          {/* Average Rating */}
          <div className="mt-3 flex items-center gap-2 text-sm">
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

          {/* CTA */}
          <button
            onClick={() => setShowFeedback(true)}
            className="mt-6 px-6 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700 transition"
          >
            Give Feedback
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
            <ReviewCard
              key={feedback._id}
              feedback={feedback}
            />
          ))}
        </div>
      </section>
      {showFeedback && <FeedbackForm onClose={() => setShowFeedback(false)} />}
    </>
  )
}

export default Reviews
