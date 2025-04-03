import React, { useState } from 'react';
import SchemaInput from '@/components/SchemaInput';
import QueryInput from '@/components/QueryInput';
import SqlResult from '@/components/SqlResult';
import DbmsSelector, { DbmsType } from '@/components/DbmsSelector';
import { useToast } from '@/components/ui/use-toast';
import { generateSqlWithLangchain } from '@/services/langchainService';

const Index: React.FC = () => {
  const [schema, setSchema] = useState<string>('');
  const [generatedSql, setGeneratedSql] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedDbms, setSelectedDbms] = useState<DbmsType>('mysql');
  const { toast } = useToast();

  const generateSql = async (question: string) => {
    if (!schema.trim()) {
      toast({
        title: "Missing database schema",
        description: "Please provide a database schema first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Call the LangChain service
      const response = await generateSqlWithLangchain({
        schema,
        question,
        dbmsType: selectedDbms
      });
      
      setGeneratedSql(response.sql);
      setExplanation(response.explanation);
    } catch (error) {
      toast({
        title: "Error generating SQL",
        description: error instanceof Error ? error.message : "There was a problem generating the SQL query",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SchemaInput schema={schema} setSchema={setSchema} />
            <DbmsSelector selectedDbms={selectedDbms} onDbmsChange={setSelectedDbms} />
          </div>
          <QueryInput onGenerateQuery={generateSql} isGenerating={isGenerating} />
        </div>
        
        {isGenerating && (
          <div className="flex justify-center py-8">
            <div className="animate-pulse-light flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-sqlblue-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-sqlblue-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-sqlblue-500"></div>
              <span className="text-muted-foreground">Generating your SQL for {selectedDbms.toUpperCase()}...</span>
            </div>
          </div>
        )}
        
        {generatedSql && !isGenerating && (
          <SqlResult sql={generatedSql} explanation={explanation} />
        )}
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

export default Index;
