export default function Navbar() {
  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

      <div>

        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          AI Knowledge Platform
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
          M
        </div>

      </div>

    </header>
  );
}