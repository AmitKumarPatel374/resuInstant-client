import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Sparkles,
} from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800">
      {/* ===== HEADER ===== */}
      <header
        className="p-8 text-white"
        style={{ background: accentColor }}
      >
        <h1 className="text-4xl font-bold tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="opacity-90 mt-1">
          {data.personal_info?.profession || "Professional Title"}
        </p>

        {/* Contact */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} />
              {data.personal_info.email}
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} />
              {data.personal_info.phone}
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              {data.personal_info.location}
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={14} />
              {data.personal_info.linkedin}
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} />
              {data.personal_info.website}
            </div>
          )}
        </div>
      </header>

      {/* ===== BODY ===== */}
      <div className="grid grid-cols-3 gap-8 p-8">
        {/* ===== LEFT COLUMN ===== */}
        <aside className="col-span-1 space-y-8">
          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2
                className="flex items-center gap-2 text-sm font-semibold uppercase mb-3"
                style={{ color: accentColor }}
              >
                <Sparkles size={14} /> Skills
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2
                className="flex items-center gap-2 text-sm font-semibold uppercase mb-3"
                style={{ color: accentColor }}
              >
                <GraduationCap size={14} /> Education
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* ===== RIGHT COLUMN ===== */}
        <main className="col-span-2 space-y-8">
          {/* Summary */}
          {data.professional_summary && (
            <section>
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: accentColor }}
              >
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section>
              <h2
                className="flex items-center gap-2 text-lg font-semibold mb-4"
                style={{ color: accentColor }}
              >
                <Briefcase size={16} /> Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project?.length > 0 && (
            <section>
              <h2
                className="flex items-center gap-2 text-lg font-semibold mb-4"
                style={{ color: accentColor }}
              >
                <FolderGit2 size={16} /> Projects
              </h2>
              <div className="space-y-4">
                {data.project.map((proj, i) => (
                  <div key={i}>
                    <h3 className="font-medium">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreativeTemplate;
