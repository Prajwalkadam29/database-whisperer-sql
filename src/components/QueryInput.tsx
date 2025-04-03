
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SendHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QueryInputProps {
  onGenerateQuery: (question: string) => void;
  isGenerating: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onGenerateQuery, isGenerating }) => {
  const [question, setQuestion] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (!question.trim()) {
      toast({
        title: "Empty question",
        description: "Please enter a question before generating SQL.",
        variant: "destructive",
      });
      return;
    }
    
    onGenerateQuery(question);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sqlblue-400">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          Your Question
        </CardTitle>
        <CardDescription>
          Ask a question in natural language about your database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: Show me all users who joined in the last month"
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="ml-auto flex gap-2 items-center"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : (
            <>
              <SendHorizontal className="h-4 w-4" />
              Generate SQL
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QueryInput;
