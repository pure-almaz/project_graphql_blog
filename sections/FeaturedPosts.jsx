import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  const customLeftArrow = (
    <div style={{backgroundColor:"#35185A"}} className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-[#35185A] rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div style={{backgroundColor:"#35185A"}} className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-[#35185A] rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );

  return (
    <div className="relative mb-8 w-full">
    <Carousel
      infinite
      customLeftArrow={customLeftArrow}
      customRightArrow={customRightArrow}
      responsive={responsive}
      itemClass=""
    >
    {dataLoaded &&
    <div className="flex items-center">
    {
      featuredPosts.map((post, index) => (
        <div key={index} className="px-4">
          <FeaturedPostCard post={post} />
        </div>
      ))
    }
    </div>
    }
    </Carousel>
    </div>
  );
};

export default FeaturedPosts;
