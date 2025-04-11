import "./globals.css";
import Sidebar from "../app/components/Sidebar";
import { LoadingProvider } from "../app/contexts/LoadingProvider";

export const metadata = {
  title: "Sistema Financeiro",
  description: "Controle de contas e categorias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex ">
          <Sidebar />
          <main className="ml-64 w-full min-h-screen p-6 bg-gray-50 text-gray-900">
            <LoadingProvider>{children}</LoadingProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
