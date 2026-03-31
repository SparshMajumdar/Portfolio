"use client";

export default function BottomPlayerBar() {
  return (
    <footer className="fixed bottom-0 w-full h-24 z-50 glass-player bg-[#0E0E0E]/80 flex justify-between items-center px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {/* Now Viewing — Left Wing */}
      <div className="flex items-center gap-4 w-1/4">
        <div className="w-14 h-14 rounded overflow-hidden shadow-lg border border-outline-variant/10 bg-gradient-to-br from-primary/20 to-surface-container flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl">
            cloud_done
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#E5E2E1] hover:underline cursor-pointer">
            Cloud Misconfig Scanner
          </span>
          <span className="text-[0.6875rem] text-[#E5E2E1]/70 uppercase tracking-widest font-label">
            Now Viewing
          </span>
        </div>
        <span
          className="material-symbols-outlined text-[#53E076] ml-2 text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          favorite
        </span>
      </div>

      {/* Player Controls — Center */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex items-center gap-6">
          <button className="text-[#E5E2E1]/70 hover:text-white transition-all">
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          <button className="text-[#E5E2E1]/70 hover:text-white transition-all">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              skip_previous
            </span>
          </button>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-all text-black active:scale-95">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
          <button className="text-[#E5E2E1]/70 hover:text-white transition-all">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              skip_next
            </span>
          </button>
          <button className="text-[#E5E2E1]/70 hover:text-white transition-all">
            <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>
        <div className="w-full max-w-md flex items-center gap-2">
          <span className="text-[0.625rem] text-on-surface-variant font-label tabular-nums">
            1:24
          </span>
          <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden relative group">
            <div className="w-1/3 h-full bg-[#53E076] group-hover:bg-primary-container transition-colors"></div>
            <div className="absolute w-3 h-3 bg-white rounded-full left-1/3 -top-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"></div>
          </div>
          <span className="text-[0.625rem] text-on-surface-variant font-label tabular-nums">
            3:45
          </span>
        </div>
      </div>

      {/* Right Wing Actions */}
      <div className="flex items-center justify-end gap-4 w-1/4">
        <button className="text-[#E5E2E1]/70 hover:text-[#53E076] transition-all">
          <span className="material-symbols-outlined">graphic_eq</span>
        </button>
        <button className="text-[#E5E2E1]/70 hover:text-[#53E076] transition-all">
          <span className="material-symbols-outlined">queue_music</span>
        </button>
        <div className="flex items-center gap-2 w-24">
          <span className="material-symbols-outlined text-sm text-on-surface-variant">
            volume_up
          </span>
          <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-on-surface-variant"></div>
          </div>
        </div>
        <button className="text-[#E5E2E1]/70 hover:text-[#53E076] transition-all">
          <span className="material-symbols-outlined">open_in_full</span>
        </button>
      </div>
    </footer>
  );
}
