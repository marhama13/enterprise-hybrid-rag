import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
}