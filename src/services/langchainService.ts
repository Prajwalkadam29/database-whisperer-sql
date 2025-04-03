
import { DbmsType } from '@/components/DbmsSelector';

interface GenerateSqlParams {
  schema: string;
  question: string;
  dbmsType: DbmsType;
}

interface SqlResponse {
  sql: string;
  explanation: string;
}

export const generateSqlWithLangchain = async ({
  schema,
  question,
  dbmsType
}: GenerateSqlParams): Promise<SqlResponse> => {
  try {
    // In production, you would use an environment variable for the API URL
    const apiUrl = 'http://localhost:5000/generate-sql';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schema,
        question,
        dbms_type: dbmsType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate SQL');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating SQL:', error);
    throw error;
  }
};
