import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="container mx-auto px-6 py-24">
        <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold">
          TODO_HERO_HEADING
        </h1>
        <p className="mt-4 text-lg text-gray-600">TODO_HERO_COPY</p>
      </div>
    </section>
  );
};

export default Hero;
