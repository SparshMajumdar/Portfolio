interface SkillCardProps {
  icon: string;
  title: string;
  subtitle: string;
  gradientFrom: string;
  iconColor: string;
  url?: string;
}

export default function SkillCard({
  icon,
  title,
  subtitle,
  gradientFrom,
  iconColor,
  url,
}: SkillCardProps) {
  const content = (
    <div className="bg-surface-container-low p-4 rounded-xl hover:bg-surface-container-high transition-all duration-300 group cursor-pointer relative overflow-hidden">
      <div
        className={`w-full aspect-square mb-4 rounded-lg bg-gradient-to-br ${gradientFrom} to-surface-container-highest flex items-center justify-center relative overflow-hidden`}
      >
        <span className={`material-symbols-outlined text-5xl ${iconColor}`}>
          {icon}
        </span>
        <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span
            className="material-symbols-outlined text-on-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        </button>
      </div>
      <h3 className="font-bold text-on-surface truncate">{title}</h3>
      <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>
    </div>
  );

  if (!url) return content;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={`Go to ${title}`}>
      {content}
    </a>
  );
}
