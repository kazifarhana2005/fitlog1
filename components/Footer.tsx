import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111827] border-t border-gray-700">
      <div className="max-w-[1200px] mx-auto px-8 py-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#d4ff00] flex items-center justify-center">
            <span className="text-black font-bold text-xs">
              H
            </span>
          </div>

          <span className="text-white font-bold text-sm tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-gray-400 text-xs">
          © 2026 FitLog — Virtual Library. Train smart, log smarter.
        </p>

      </div>
    </footer>
  );
}