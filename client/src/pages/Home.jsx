import React from 'react';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Hero from '../components/Hero'; // Capitalized to match component name
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <FeaturedDestinations />
        <ExclusiveOffers />
        <Testimonial />
        <NewsLetter />
      </main>
    </>
  );
};

export default Home;
