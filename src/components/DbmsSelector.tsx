
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export type DbmsType = 'mysql' | 'postgresql' | 'oracle' | 'sqlserver' | 'sqlite';

interface DbmsSelectorProps {
  selectedDbms: DbmsType;
  onDbmsChange: (dbms: DbmsType) => void;
}

const DbmsSelector: React.FC<DbmsSelectorProps> = ({ selectedDbms, onDbmsChange }) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sqlblue-400">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
          </svg>
          Database Type
        </CardTitle>
        <CardDescription>
          Select your database management system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedDbms}
          onValueChange={(value) => onDbmsChange(value as DbmsType)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mysql" id="mysql" />
            <Label htmlFor="mysql" className="cursor-pointer">MySQL</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="postgresql" id="postgresql" />
            <Label htmlFor="postgresql" className="cursor-pointer">PostgreSQL</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oracle" id="oracle" />
            <Label htmlFor="oracle" className="cursor-pointer">Oracle</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sqlserver" id="sqlserver" />
            <Label htmlFor="sqlserver" className="cursor-pointer">SQL Server</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sqlite" id="sqlite" />
            <Label htmlFor="sqlite" className="cursor-pointer">SQLite</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default DbmsSelector;
