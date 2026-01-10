import {
  FileTextIcon,
  TrashIcon,
  PencilIcon,
} from "lucide-react"

const ResumeCard = ({ resume, color, onOpen, onDelete, onEdit }) => {
  return (
    <div
      onClick={() => onOpen(resume._id)}
      role="button"
      tabIndex={0}
      className="
        relative w-full sm:max-w-36 h-48
        rounded-xl border bg-white
        flex flex-col items-center justify-center
        px-4 text-center cursor-pointer
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-0.5
        group
      "
      style={{
        borderColor: `${color}30`,
      }}
    >
      {/* Icon */}
      <div
        className="size-12 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: `${color}15` }}
      >
        <FileTextIcon
          className="size-6"
          style={{ color }}
        />
      </div>

      {/* Title */}
      <p
        className="text-sm font-medium text-slate-700 truncate w-full px-1"
        title={resume.title}
      >
        {resume.title}
      </p>

      {/* Subtitle */}
      <p className="text-[11px] text-slate-400 mt-1">
        Resume
      </p>

      {/* Footer */}
      <p className="absolute bottom-3 text-[11px] text-slate-400">
        Updated {new Date(resume.updatedAt).toLocaleDateString()}
      </p>

      {/* Actions */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          absolute top-2 right-2
          opacity-0 group-hover:opacity-100
          flex gap-1 transition
        "
      >
        <button
          type="button"
          onClick={() => onEdit(resume._id, resume.title)}
          className="
            size-7 rounded-md
            flex items-center justify-center
            bg-white border text-slate-500
            hover:text-indigo-600 hover:border-indigo-300
            transition
          "
          title="Edit title"
        >
          <PencilIcon className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(resume._id)}
          className="
            size-7 rounded-md
            flex items-center justify-center
            bg-white border text-slate-500
            hover:text-red-600 hover:border-red-300
            transition
          "
          title="Delete resume"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default ResumeCard
