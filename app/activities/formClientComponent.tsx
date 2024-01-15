// formClientComponent.tsx
'use client';
import { useState } from 'react';
import Form, { FormInputData } from '#/app/components/Form';

export default function FormClientComponent() {
  const [formData, setFormData] = useState<FormInputData | null>(null);

  const handlePageSubmit = (formData: FormInputData) => {
    setFormData(formData);
  };

  return <Form onSubmit={handlePageSubmit} />;
}
