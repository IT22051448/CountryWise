import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaGlobeAmericas } from 'react-icons/fa';

const Carousel = ({ slides, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const enhancedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const autoSlide = setInterval(
      () => setCurrentSlide((s) => s + 1),
      interval
    );
    return () => clearInterval(autoSlide);
  }, [interval]);

  useEffect(() => {
    if (currentSlide > slides.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
      }, 700);
    }
    if (currentSlide < 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(slides.length);
      }, 700);
    }
  }, [currentSlide, slides.length]);

  const handlePrevious = () => {
    setIsTransitioning(true);
    setCurrentSlide((s) => s - 1);
  };
  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentSlide((s) => s + 1);
  };
  const goToSlide = (idx) => {
    setIsTransitioning(true);
    setCurrentSlide(idx + 1);
  };
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) handleNext();
    if (touchEndX.current - touchStartX.current > 50) handlePrevious();
  };

  const realIndex = (currentSlide - 1 + slides.length) % slides.length;

  return (
    <section className="relative w-full mt-10 bg-gradient-to-b from-blue-50 to-blue-100 pb-16 overflow-x-hidden">
      {/* Header */}
      <div className="relative py-12 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <FaGlobeAmericas size={200} className="text-blue-400" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-slate-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
              Welcome to COUNTRYWISE
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-bold mx-auto">
            Discover the world's wonders through our interactive exploration
          </p>
        </div>
      </div>

      {/* Slides */}
      <div
        className="relative w-full overflow-x-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flex flex-nowrap h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]
                      ${
                        isTransitioning
                          ? 'transition-transform duration-700 ease-in-out'
                          : ''
                      }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {enhancedSlides.map((slide, idx) => (
            <div key={idx} className="w-full flex-shrink-0 h-full">
              <div className="flex flex-col lg:flex-row h-full border-t-4 border-b-4 border-double border-blue-600">
                {/* Image */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent lg:bg-gradient-to-r" />
                </div>
                {/* Text */}
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-6 sm:p-12 flex items-center">
                  <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                      {slide.title || slide.heading}
                    </h2>
                    <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 font-medium">
                      {slide.text}
                    </p>
                    {slide.cta && (
                      <button className="bg-white text-green-600 hover:bg-gray-100 px-5 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-shadow shadow-lg hover:shadow-xl text-sm sm:text-base">
                        {slide.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={handlePrevious}
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 sm:left-6 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 rounded-full p-1 sm:p-2 md:p-3 z-20 shadow-lg transition-transform hover:scale-110"
        >
          <FaChevronLeft className="text-lg sm:text-xl md:text-2xl" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute top-1/2 right-4 sm:right-6 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 rounded-full p-1 sm:p-2 md:p-3 z-20 shadow-lg transition-transform hover:scale-110"
        >
          <FaChevronRight className="text-lg sm:text-xl md:text-2xl" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
              idx === realIndex
                ? 'bg-green-500 w-4 sm:w-6 scale-110'
                : 'bg-gray-400 hover:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
