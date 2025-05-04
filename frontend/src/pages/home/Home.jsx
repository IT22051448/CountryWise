import React from 'react';
import Carousel from '@/components/home/Carousel';
import WorldFacts from '@/components/home/WorldFacts';
import { slides } from '@/data/homeContent';

const Home = () => (
  <div className="min-h-screen overflow-x-hidden">
    <Carousel slides={slides} />
    <WorldFacts />
  </div>
);

export default Home;
