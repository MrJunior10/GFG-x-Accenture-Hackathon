import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Code } from 'lucide-react';

const Careers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Join Our Team of Wizards
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <JobCard
            icon={<Brain className="h-12 w-12 text-purple-400" />}
            title="AI/ML Engineer"
            description="Shape the future of AI with cutting-edge machine learning solutions"
            onClick={() => navigate('/job/aiml')}
          />
          <JobCard
            icon={<Code className="h-12 w-12 text-purple-400" />}
            title="Full Stack Developer"
            description="Build powerful, scalable applications from front to back"
            onClick={() => navigate('/job/fullstack')}
          />
        </div>
      </motion.div>
    </div>
  );
};

// 1) Define a TypeScript interface for your JobCard props
interface JobCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

// 2) Use that interface in your component definition
const JobCard: React.FC<JobCardProps> = ({ icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 cursor-pointer"
    onClick={onClick}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center"
    >
      {icon}
      <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full"
      >
        Learn More
      </motion.button>
    </motion.div>
  </motion.div>
);

export default Careers;
