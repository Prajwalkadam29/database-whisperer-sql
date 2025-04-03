
import React, { ReactNode } from 'react';

interface SqlWhispererLayoutProps {
  children: ReactNode;
}

const SqlWhispererLayout: React.FC<SqlWhispererLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="py-8 border-b border-border">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-sqlblue-400"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <path d="M13 2v7h7" />
              </svg>
              <h1 className="text-3xl font-bold">SQL Whisperer</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl">
              Transform natural language questions into optimized SQL queries for your database
            </p>
          </div>
        </div>
      </header>

      <main className="container px-4 sm:px-6 py-6 space-y-6">
        {children}
      </main>

      <footer className="mt-auto py-6 border-t border-border">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              SQL Whisperer — Natural language to SQL converter
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SqlWhispererLayout;
