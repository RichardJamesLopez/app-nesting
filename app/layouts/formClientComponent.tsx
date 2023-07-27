// formClientComponent.tsx
'use client';
import { useState } from 'react';
import Form, { FormInputData } from '#/app/components/Form';

export default function FormClientComponent() {
  const [formData, setFormData] = useState<FormInputData | null>(null);

  const handlePageSubmit = (formData: FormInputData) => {
    // Handle the form data when form is submitted.
    console.log(formData);
    setFormData(formData);
    // Here you can send formData to server or do whatever you need with it.
  };

  return <Form onSubmit={handlePageSubmit} />;
}
