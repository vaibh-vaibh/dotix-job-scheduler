import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dotix Job Scheduler",
  description: "Dotix Job Scheduler Automation Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-background">
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                Dotix Job Scheduler
              </h1>
            </div>
          </header>
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}