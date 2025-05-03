import { FaLinkedin, FaGithub, FaFacebook, FaUniversity } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

const AboutMeCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-2xl hover:shadow-xl transition duration-300">
      <div className="md:flex">
        {/* Profile Image */}
        <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxi9ocWlfUzYoW9WwRHEXF3zbwQCpnp032A&s"
            alt="Christy Kingsley"
            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        {/* Profile Content */}
        <div className="md:w-2/3 p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Christy Kingsley
          </h3>
          <p className="text-blue-600 mb-4 flex items-center">
            <HiAcademicCap className="mr-2" />
            3rd Year Software Engineering Student at SLIIT
          </p>

          <p className="text-gray-600 mb-6">
            As part of my academic journey, I've developed CountryWise - an
            interactive application that leverages the REST Countries API to
            display comprehensive country information in a unique and engaging
            way. This project combines my passion for geography with my software
            development skills.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/christy-kingsley-062b98341"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://github.com/IT22051448"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=100010862702861"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl" />
            </a>
          </div>

          {/* Project Link */}
          <div className="mt-6">
            <a
              href="https://github.com/IT22051448/CountryWise"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaGithub className="mr-2" />
              View Project on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeCard;
