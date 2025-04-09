import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      
      {/* Back button */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center mb-16 text-white">Meet the Team</h1>
          
          {/* Founder Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3">
                  <img
                    src="https://i.ibb.co/C3dR3VWz/4x3-Executive-standing-up-wearing-a.png"
                    alt="Rabih El Hawarni"
                    className="rounded-xl w-full h-auto shadow-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold text-white mb-4">Steering the Dream</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Rabih El Hawarni, founder and Executive Director of New Exclusive, brings over 25 years of experience in the UAE's creative and Engineering industry. Known for delivering innovative, high-quality solutions, he has led the company to success through a strong focus on custom Architectural designs, acrylic and GRP work, Unique swimming pools and one-of-a-kind creative projects. His leadership is driven by vision, precision, and a deep commitment to turning ideas into impactful results.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Team Photos Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
            >
              <img
                src="https://i.ibb.co/zWhzd3hs/enhance-but-dont-not-change-faces-3519cd08-d1c5-4e40-ad07-60ab7bc00974.png"
                alt="Team members"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">The Team Behind the Vision</h3>
                <p className="text-gray-400">
                  A dynamic collective of innovators and strategists, united by a shared vision to craft impactful solutions and exceed expectations at every turn.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
            >
              <img
                src="https://i.ibb.co/W4d27cVZ/Team.jpg"
                alt="Team members"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">The Team Behind the Vision</h3>
                <p className="text-gray-400">
                  A passionate group of designers, makers, and problem-solvers driven by creativity and committed to delivering exceptional results on every project.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamPage;