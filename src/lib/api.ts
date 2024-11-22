const GOOGLE_SCRIPT_URL = ''; // Write your Google App Script URL after Deployment of google-apps-script.js in the Editor

export interface FormData {
  name: string;
  email: string;
  phone: string;
  graduationYear: string;
  businessIdea: string;
  funding: 'no-funding' | 'seed' | 'series-a' | 'series-b';
  progress: 'idea' | 'prototype' | 'mvp' | 'launched';
  timestamp?: string;
}

export async function submitForm(data: FormData, file: File | null) {
  try {
    const formData = new FormData();
    
    // Add all form fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Add the file if it exists
    if (file) {
      const base64 = await convertFileToBase64(file);
      formData.append('collegeId', base64);
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to submit form');
    }

    console.log('Form submitted successfully');
    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error('Failed to submit form. Please try again.');
  }
}

// Helper function to convert File to base64
function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}