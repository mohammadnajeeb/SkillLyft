import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const featuredCourses = [
    {
      title: "Reward Modeling in RLHF",
      description: "A popular technique to fine-tune large language models with human feedback.",
      lastUpdated: "3 months ago",
      imageUrl: "/images/google-deepmind-8heReYC6Zt0-unsplash.jpg"
    },
    {
      title: "From SFT to RLHF: The Full Training Pipeline",
      description: "Visualize and implement the end-to-end process from pretraining to alignment using modern tools.",
      lastUpdated: "2 months ago",
      imageUrl: "/images/google-deepmind-Fv39DqWqtHw-unsplash.jpg"
    },
    {
      title: "Evaluation Metrics in RLHF Systems",
      description: "Dive into techniques to assess model alignment, human preference satisfaction, and reward signal fidelity.",
      lastUpdated: "3 weeks ago",
      imageUrl: "/images/google-deepmind-jJMqaZU4EnU-unsplash.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center flex-grow mt-8">
        <img src="/LOGO.png" alt="SkillLyft" className="w-80 h-80 mb-12" />
        <button
          onClick={() => navigate('/courses')}
          className="bg-[#4A938C] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#3D7A74] transition-colors"
        >
          Start Learning
        </button>
      </div>

      {/* Featured Courses Section */}
      <div className="w-full max-w-7xl mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                if (course.title === "Reward Modeling in RLHF") {
                  navigate('/onboarding');
                } else {
                  navigate('/courses');
                }
              }}
            >
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                <div className="text-sm text-gray-500">
                  Last updated {course.lastUpdated}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
