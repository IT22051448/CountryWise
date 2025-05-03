import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaGlobeAmericas } from 'react-icons/fa';

const Carousel = ({ slides, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef(null);

  const enhancedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNext();
    }, interval);
    return () => clearInterval(autoSlide);
  }, [currentSlide, interval]);

  const handlePrevious = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(slides.length);
        }, 700);
        return 0;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev >= slides.length + 1) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(1);
        }, 700);
        return slides.length + 1;
      }
      return prev + 1;
    });
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index + 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrevious();
    }
  };

  const realIndex = (currentSlide - 1 + slides.length) % slides.length;

  return (
    <section className="relative w-full bg-gradient-to-b from-blue-50 to-blue-100 pb-16">
      {/*   */}
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
          <p className="text-lg text-gray-600 max-w-2xl font-bold mx-auto">
            Discover the world's wonders through our interactive exploration
          </p>
        </div>
      </div>

      {/*  Carousel */}
      <div className="w-full">
        <div
          className="relative w-full h-[500px] md:h-[600px] lg:h-[500px]"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex h-full ${
              isTransitioning
                ? 'transition-transform duration-700 ease-in-out'
                : ''
            }`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {enhancedSlides.map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="w-full flex-shrink-0 h-full"
              >
                <div className="flex flex-col lg:flex-row h-full border-t-4 border-b-4 border-double border-blue-600">
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
                    <img
                      src={slide.image}
                      alt={`Slide ${slide.id}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/40 lg:via-black/20 lg:to-transparent" />
                  </div>

                  {/* Text Section */}
                  <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-8 md:p-12 flex flex-col justify-center">
                    <div className="max-w-lg mx-auto">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {slide.title || `${slide.heading}`}
                      </h2>
                      <p className="text-white/90 text-lg md:text-xl mb-6 font-medium">
                        {slide.text}
                      </p>
                      {slide.cta && (
                        <button className="self-start bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl text-sm md:text-base">
                          {slide.cta}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows  */}
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 rounded-full p-4 z-20 shadow-xl transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 rounded-full p-4 z-20 shadow-xl transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === realIndex
                ? 'bg-green-500 w-8 scale-110'
                : 'bg-gray-400 hover:bg-gray-700'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
