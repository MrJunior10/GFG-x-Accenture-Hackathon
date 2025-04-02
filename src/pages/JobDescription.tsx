import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

interface JobDetail {
  title: string;
  description: string;
  requirements: string[];
}

const jobDetails: Record<string, JobDetail> = {
  aiml: {
    title: "AI/ML Engineer",
    description: "Join our cutting-edge AI team to develop and implement innovative machine learning solutions.",
    requirements: [
      "Masters/PhD in Computer Science, AI, or related field",
      "3+ years of experience in ML/DL",
      "Expertise in Python, TensorFlow, PyTorch",
      "Strong background in mathematics and statistics",
      "Experience with NLP and Computer Vision"
    ]
  },
  fullstack: {
    title: "Full Stack Developer",
    description: "Create scalable web applications using modern technologies and best practices.",
    requirements: [
      "Bachelor's in Computer Science or related field",
      "4+ years of full stack development experience",
      "Expertise in React, Node.js, and modern frameworks",
      "Strong understanding of databases and API design",
      "Experience with cloud platforms (AWS/Azure/GCP)"
    ]
  }
};

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  school10: string;
  marks10: string;
  school12: string;
  marks12: string;
  college: string;
  cgpa: string;
  graduationYear: string;
  resume: File | null;
}

const JobDescription: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const job = jobDetails[role ?? ''];

  // Local form state
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    school10: '',
    marks10: '',
    school12: '',
    marks12: '',
    college: '',
    cgpa: '',
    graduationYear: '',
    resume: null
  });

  // Automatically send JD summary to backend on page load
  useEffect(() => {
    const autoSummarizeJD = async () => {
      if (!job) return;
      // Create raw JD text by combining title, description, and requirements
      const rawJDText = `${job.title}\n${job.description}\nRequirements:\n${job.requirements.join('\n')}`;
      try {
        await axios.post('http://localhost:5000/summarizeJD', { rawJDText });
        console.log('✅ JD summary sent to backend for LLM matching');
      } catch (err) {
        console.error('❌ Failed to send JD to summarize:', err);
      }
    };

    autoSummarizeJD();
  }, [job]);

  // Handle input changes for text inputs & file uploads
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files && files.length > 0) {
      setFormData(prev => ({ ...prev, resume: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit form data with resume as FormData
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append('firstName', formData.firstName);
      formDataObj.append('lastName', formData.lastName);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('address', formData.address);
      formDataObj.append('school10', formData.school10);
      formDataObj.append('marks10', formData.marks10);
      formDataObj.append('school12', formData.school12);
      formDataObj.append('marks12', formData.marks12);
      formDataObj.append('college', formData.college);
      formDataObj.append('cgpa', formData.cgpa);
      formDataObj.append('graduationYear', formData.graduationYear);
      
      if (formData.resume) {
        formDataObj.append('resume', formData.resume);
      }

      const response = await axios.post('http://localhost:5000/apply', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Candidate saved:', response.data);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit application.');
    }
  };

  if (!job) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <h1 className="text-white text-2xl">Invalid job role specified!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-20 px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        {/* Job Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-4">{job.title}</h1>
          <p className="text-gray-300 mb-6">{job.description}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-3">Requirements:</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Application Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
            <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} />
            <InputField label="Class 10 School" name="school10" value={formData.school10} onChange={handleInputChange} />
            <InputField label="Class 10 Marks (%)" name="marks10" type="number" value={formData.marks10} onChange={handleInputChange} />
            <InputField label="Class 12/Diploma School" name="school12" value={formData.school12} onChange={handleInputChange} />
            <InputField label="Class 12/Diploma Marks (%)" name="marks12" type="number" value={formData.marks12} onChange={handleInputChange} />
            <InputField label="College Name" name="college" value={formData.college} onChange={handleInputChange} />
            <InputField label="College CGPA" name="cgpa" type="number" step="0.01" value={formData.cgpa} onChange={handleInputChange} />
            <InputField label="Graduation Year" name="graduationYear" type="number" value={formData.graduationYear} onChange={handleInputChange} />
          </div>

          {/* Resume Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="resume">
              Upload Resume (PDF)
            </label>
            <input
              id="resume"
              type="file"
              name="resume"
              accept=".pdf"
              title="Choose a PDF resume file"
              onChange={handleInputChange}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-500 file:text-white
                hover:file:bg-purple-600
                cursor-pointer"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold"
          >
            Submit Application
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        {...props}
      />
    </div>
  );
};

export default JobDescription;
