import { FaGlobe, FaDatabase, FaCode, FaUsers } from 'react-icons/fa';
import FeatureCard from '@/components/about/FeatureCard';
import AboutMeCard from '@/components/about/AboutMeCard';

const AboutUs = () => {
  const features = [
    {
      icon: <FaGlobe className="text-3xl text-blue-600" />,
      title: 'Global Coverage',
      description:
        'Comprehensive data on 250+ countries and territories worldwide.',
    },
    {
      icon: <FaDatabase className="text-3xl text-green-600" />,
      title: 'Rich Data',
      description:
        'Detailed information including borders, currencies, languages and more.',
    },
    {
      icon: <FaCode className="text-3xl text-purple-600" />,
      title: 'Developer Friendly',
      description: 'Simple REST API with JSON responses for easy integration.',
    },
    {
      icon: <FaUsers className="text-3xl text-orange-600" />,
      title: 'Free to Use',
      description: 'Open access for developers, students, and researchers.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx29I0LkpW5T4wjP7GSgTl9qrmk21nx-a0AQ&s"
          alt="World Map"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About CountryWise
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Exploring the world through data with the Rest Countries API
            </p>
          </div>
        </div>
      </div>

      {/* About Rest Countries API */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              About Rest Countries API
            </h2>
            <p className="text-gray-600 mb-4">
              The Rest Countries API is a free, open-source service that
              provides detailed information about countries around the world. It
              was created by developers for developers, with the goal of making
              geographical data easily accessible for applications of all kinds.
            </p>
            <p className="text-gray-600 mb-4">
              Originally developed as a side project, the API has grown to serve
              millions of requests each month, powering educational tools,
              travel applications, and business solutions worldwide.
            </p>
            <p className="text-gray-600">
              CountryWise leverages this powerful API to present country data in
              an intuitive, visually appealing interface designed for both
              casual users and geography enthusiasts.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGKwnQS8AAKw-pBGNO_ED_GNsMzXjIliHqpA&s"
              alt="API Screenshot"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            API Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Data Provided Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Data Provided
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Basic Information
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Country name & official name</li>
                <li>Capital city</li>
                <li>Region & subregion</li>
                <li>Population</li>
                <li>Area in square kilometers</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-green-600">
                Geographical Data
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Latitude & longitude</li>
                <li>Border countries</li>
                <li>Time zones</li>
                <li>Landlocked status</li>
                <li>Flag image URLs</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">
                Cultural Information
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Official languages</li>
                <li>Currencies with symbols</li>
                <li>Driving side (left/right)</li>
                <li>Country calling codes</li>
                <li>Top-level domain</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          About The Developer
        </h2>
        <div className="flex justify-center">
          <AboutMeCard />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Explore the World?
          </h2>
          <p className="text-xl mb-8">
            Start using CountryWise today to discover fascinating information
            about countries around the globe.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
