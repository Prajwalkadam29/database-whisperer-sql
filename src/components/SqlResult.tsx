
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SqlCodeBlock from './SqlCodeBlock';
import { Clipboard, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SqlResultProps {
  sql: string | null;
  explanation: string | null;
}

const SqlResult: React.FC<SqlResultProps> = ({ sql, explanation }) => {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    if (!sql) return;
    
    navigator.clipboard.writeText(sql);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "SQL query has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!sql) {
    return null;
  }

  return (
    <Card className="bg-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sqlblue-400">
            <path d="M14 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 2a2 2 0 0 0-2 2v4h4V4a2 2 0 0 0-2-2Z" />
            <path d="m9 14 2 2 4-4" />
          </svg>
          Generated SQL
        </CardTitle>
        <CardDescription>
          Your natural language query converted to SQL
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SqlCodeBlock sql={sql} />
        
        {explanation && (
          <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
            <div className="font-semibold mb-1">Explanation:</div>
            <p>{explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm"
          className="ml-auto flex items-center gap-2"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              Copy SQL
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SqlResult;
