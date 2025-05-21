
import React from 'react';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Hero from '../components/hero';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';
const Home = () => {
  return (
    <>
      <Hero />
        <FeaturedDestinations/>
        <ExclusiveOffers />
        <Testimonial />
        <NewsLetter />
    </>
  );
}

export default Home;
