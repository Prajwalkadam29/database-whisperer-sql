
import React from 'react';
import { cn } from '@/lib/utils';

interface SqlCodeBlockProps {
  sql: string;
  className?: string;
}

const SqlCodeBlock: React.FC<SqlCodeBlockProps> = ({ sql, className }) => {
  // Basic SQL syntax highlighting
  const highlightedCode = sql
    .replace(
      /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|INDEX|VIEW|TRIGGER|PROCEDURE|FUNCTION|DATABASE|SCHEMA|AND|OR|NOT|NULL|IN|BETWEEN|LIKE|IS|ASC|DESC|DISTINCT|UNION|ALL|COUNT|SUM|AVG|MIN|MAX)\b/gi,
      '<span class="text-indigo-300">$1</span>'
    )
    .replace(/\b(\d+)\b/g, '<span class="text-amber-300">$1</span>')
    .replace(/'([^']*)'/g, '<span class="text-green-300">\'$1\'</span>')
    .replace(/"([^"]*)"/g, '<span class="text-green-300">"$1"</span>')
    .replace(/`([^`]*)`/g, '<span class="text-teal-300">`$1`</span>')
    .replace(/--([^\n]*)/g, '<span class="text-gray-500">--$1</span>');

  return (
    <div className={cn('rounded-lg border border-codeblock-border bg-codeblock p-4', className)}>
      <pre className="sql-code text-sm text-white whitespace-pre-wrap break-words">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};

export default SqlCodeBlock;
