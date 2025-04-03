
import React from 'react';
import SqlWhispererLayout from '@/components/SqlWhispererLayout';
import SqlGenerator from '@/components/SqlGenerator';

const Index: React.FC = () => {
  return (
    <SqlWhispererLayout>
      <SqlGenerator />
    </SqlWhispererLayout>
  );
};

export default Index;
