
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface SchemaInputProps {
  schema: string;
  setSchema: (schema: string) => void;
}

const SchemaInput: React.FC<SchemaInputProps> = ({ schema, setSchema }) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sqlblue-400">
            <rect x="2" y="2" width="8" height="8" rx="2" />
            <path d="M6 10v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V14" />
            <path d="M14 2h6a2 2 0 0 1 2 2v6" />
          </svg>
          Database Schema
        </CardTitle>
        <CardDescription>
          Paste your database schema here (CREATE TABLE statements)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
          placeholder="CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100), ...);"
          className="min-h-[200px] font-mono text-sm"
        />
      </CardContent>
    </Card>
  );
};

export default SchemaInput;
