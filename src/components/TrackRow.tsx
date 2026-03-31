"use client";

interface TrackRowProps {
  index: number;
  title: string;
  description: string;
  stack: string;
  date: string;
  duration?: string;
  icon?: string;
  link?: string | null;
  github?: string;
}

export default function TrackRow({
  title,
  description,
  stack,
  date,
  duration,
  icon,
  link,
  github,
}: TrackRowProps) {

  const handleRowClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleRowClick}
      role={link ? "link" : undefined}
      tabIndex={link ? 0 : undefined}
      onKeyDown={(event) => {
        if (link && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          handleRowClick();
        }
      }}
      className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer"
    >
      {/* Index / Play */}
      <div className="w-10 text-on-surface-variant group-hover:text-transparent relative flex items-center">
        <span
          className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          play_arrow
        </span>
      </div>

      {/* Title + Description */}
      <div className="flex-1 flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-surface-container-low overflow-hidden flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-xl">
            {icon || "code"}
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
            {title}
          </span>
          <span className="text-xs text-on-surface-variant truncate">
            {description}
          </span>
        </div>
      </div>

      {/* Stack */}
      <div className="w-1/4 text-on-surface-variant text-sm truncate">
        {stack}
      </div>

      {/* Date */}
      <div className="w-24 text-right text-on-surface-variant text-sm font-label">
        {date}
      </div>

      {/* Lyrics / GitHub icon column */}
      <div className="w-24 text-right">
        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-end text-on-surface-variant hover:text-primary"
            aria-label={`Open source code for ${title}`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lyrics
            </span>
          </a>
        ) : (
          <span className="text-on-surface-variant text-sm">—</span>
        )}
      </div>

      {/* Duration (optional) */}
      {duration && (
        <div className="w-20 text-right text-on-surface-variant text-sm tabular-nums">
          {duration}
        </div>
      )}
    </div>
  );
}
