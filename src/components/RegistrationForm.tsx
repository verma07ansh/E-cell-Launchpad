import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitForm, FormData } from '../lib/api';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  businessIdea?: string;
  collegeId?: string;
  submit?: string;
}

interface FormSection {
  title: string;
  fields: string[];
}

export default function RegistrationForm() {
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 6 }, (_, i) => currentYear + i);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    graduationYear: currentYear.toString(),
    businessIdea: '',
    funding: 'no-funding',
    progress: 'idea'
  });

  const sections: FormSection[] = [
    {
      title: "Personal Information",
      fields: ["name", "email", "phone"]
    },
    {
      title: "Academic Details",
      fields: ["graduationYear", "collegeId"]
    },
    {
      title: "Business Information",
      fields: ["businessIdea", "funding", "progress"]
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    switch (step) {
      case 0:
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        } else if (formData.name.length < 2) {
          newErrors.name = 'Name must be at least 2 characters long';
          isValid = false;
        }

        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
          }
        }

        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
          isValid = false;
        } else {
          const phoneRegex = /^\+?[1-9]\d{1,14}$/;
          if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
            isValid = false;
          }
        }
        break;

      case 1:
        if (!file) {
          newErrors.collegeId = 'Please upload your college ID';
          isValid = false;
        } else if (file.size > 10 * 1024 * 1024) {
          newErrors.collegeId = 'File size must be less than 10MB';
          isValid = false;
        }
        break;

      case 2:
        if (!formData.businessIdea.trim()) {
          newErrors.businessIdea = 'Business idea description is required';
          isValid = false;
        } else if (formData.businessIdea.length < 50) {
          newErrors.businessIdea = 'Please provide a more detailed description (at least 50 characters)';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (errors.collegeId) {
        setErrors(prev => ({ ...prev, collegeId: undefined }));
      }
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

// Update the handleSubmit function
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateStep(currentStep)) return;
  
  setIsSubmitting(true);
  setErrors({});

  try {
    await submitForm({
      ...formData,
      timestamp: new Date().toISOString()
    }, file); // Pass the file here

    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      graduationYear: currentYear.toString(),
      businessIdea: '',
      funding: 'no-funding',
      progress: 'idea'
    });
    setFile(null);
    setCurrentStep(0);
  } catch (error) {
    setErrors(prev => ({
      ...prev,
      submit: 'Failed to submit form. Please try again.'
    }));
  } finally {
    setIsSubmitting(false);
  }
};

  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 shadow-lg">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Registration Successful!</h3>
          <p className="text-gray-400 mb-6">Thank you for registering. We'll be in touch soon!</p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="btn"
          >
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 shadow-lg">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`flex items-center ${index !== sections.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${currentStep === index ? 'border-white bg-white text-black' : 
                  currentStep > index ? 'border-green-500 bg-green-500 text-white' : 
                  'border-gray-600 text-gray-600'}`}
              >
                {currentStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              {index !== sections.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 
                  ${currentStep > index ? 'bg-green-500' : 'bg-gray-600'}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {currentStep === 0 && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-300 mb-1">
                  Expected Graduation Year
                </label>
                <select
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {graduationYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="collegeId" className="block text-sm font-medium text-gray-300 mb-1">
                  College ID (Upload)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md hover:border-gray-500 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label
                        htmlFor="collegeId"
                        className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="collegeId"
                          name="collegeId"
                          type="file"
                          accept="image/*,.pdf"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-gray-400">
                    Selected file: {file.name}
                  </p>
                )}
                {errors.collegeId && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.collegeId}
                  </p>
                )}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div>
                <label htmlFor="businessIdea" className="block text-sm font-medium text-gray-300 mb-1">
                  Business Idea
                </label>
                <textarea
                  id="businessIdea"
                  name="businessIdea"
                  value={formData.businessIdea}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your business idea..."
                />
                {errors.businessIdea && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.businessIdea}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="funding" className="block text-sm font-medium text-gray-300 mb-1">
                  Funding Required
                </label>
                <select
                  id="funding"
                  name="funding"
                  value={formData.funding}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="no-funding">No Funding Needed</option>
                  <option value="seed">Seed Funding</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B</option>
                </select>
              </div>

              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-gray-300 mb-1">
                  Current Progress
                </label>
                <select
                  id="progress"
                  name="progress"
                  value={formData.progress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="idea">Just an Idea</option>
                  <option value="prototype">Working on Prototype</option>
                  <option value="mvp">MVP Ready</option>
                  <option value="launched">Already Launched</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="btn"
            >
              Back
            </button>
          )}
          {currentStep < sections.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>

        {errors.submit && (
          <p className="mt-4 text-sm text-red-500 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.submit}
          </p>
        )}
      </form>
    </div>
  );
}