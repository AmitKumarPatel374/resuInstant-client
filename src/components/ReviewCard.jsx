import { StarIcon } from "lucide-react"

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const ReviewCard = ({ feedback, variant = "grid" }) => {
  const isSlider = variant === "slider"

  return (
    <div
      className={`bg-white border rounded-lg flex flex-col
        ${isSlider ? "p-4 min-w-[260px]" : "p-5"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-green-600
          text-white flex items-center justify-center font-semibold ring-1 ring-green-600/30">
          {feedback.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">
            {feedback.name}
          </p>
          <p className="text-xs text-slate-500">
            {feedback.role}
          </p>
        </div>
      </div>

      {/* Message */}
      <p
        className={`text-sm text-slate-600 mt-3 leading-relaxed
          ${isSlider ? "line-clamp-3" : ""}`}
      >
        {feedback.message}
      </p>

      {/* Footer */}
      <div
        className={`flex items-center justify-between mt-auto
          ${isSlider ? "pt-3" : "pt-4"}`}
      >
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`size-4 ${
                star <= feedback.rating
                  ? "fill-green-500 text-green-500"
                  : "text-slate-300"
              }`}
            />
          ))}
          <span className="text-xs text-slate-500 ml-1">
            {feedback.rating}/5
          </span>
        </div>

        <p className="text-xs text-slate-400">
          {formatDate(feedback.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default ReviewCard
