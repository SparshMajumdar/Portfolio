import Link from "next/link";

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
  index,
  title,
  description,
  stack,
  date,
  duration,
  icon,
  link,
  github,
}: TrackRowProps) {
  const displayIndex = index < 10 ? `0${index}` : `${index}`;

  return (
    <div className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer">
      {/* Index / Play */}
      <div className="w-10 text-on-surface-variant group-hover:text-transparent relative flex items-center">
        <span className="track-index text-sm font-medium">{displayIndex}</span>
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

      {/* GitHub lyrics icon link (optional) */}
      {github && (
        <div className="w-14 flex justify-end">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center text-on-surface-variant hover:text-primary"
            aria-label={`Open source code for ${title}`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lyrics
            </span>
          </a>
        </div>
      )}

      {/* Play link (optional) */}
      {link && (
        <div className="w-20 text-right">
          <Link
            href={link}
            className="inline-flex items-center justify-end gap-1 text-primary text-sm font-semibold hover:text-primary-container"
            aria-label={`Open project ${title}`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            Open
          </Link>
        </div>
      )}

      {/* Duration (optional) */}
      {duration && (
        <div className="w-20 text-right text-on-surface-variant text-sm tabular-nums">
          {duration}
        </div>
      )}
    </div>
  );
}
