
import React, { useState } from 'react';
import SchemaInput from '@/components/SchemaInput';
import QueryInput from '@/components/QueryInput';
import SqlResult from '@/components/SqlResult';
import DbmsSelector, { DbmsType } from '@/components/DbmsSelector';
import { useToast } from '@/components/ui/use-toast';
import { generateSqlWithLangchain } from '@/services/langchainService';

const SqlGenerator: React.FC = () => {
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
    <>
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
    </>
  );
};

export default SqlGenerator;
