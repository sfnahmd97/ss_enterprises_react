import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
