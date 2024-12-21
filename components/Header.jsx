import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';
import { useRouter } from 'next/router';

const Header = () => {
  const [linkClick, setLinkClick] = useState(false);
  const [homeClick, setHomeClick] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setHomeClick(false);
      setLinkClick(false);  // Only set to false after visible change
    };

    // Listen for route change completion
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // Cleanup the event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, linkClick]); 

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
<div className="container mx-auto px-10 mb-8 md: px-2 mb-4 sm: px-1 mb-2">
  <div className="border-b w-full inline-block border-[#35185A] py-4">
  <div className="md:float-left block flex items-end space-x-4">
  <Link href="/" passHref>
    <span onClick={() => setHomeClick(true)} className='relative'>
      <img 
        title="logo" 
        src="/learn.png" 
        className="w-16 h-16 md:w-24 md:h-24 object-contain rounded-lg"
        alt="Logo" 
      />
      {homeClick && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center cursor-pointer transition duration-700 bg-black z-10">Loading...</p>}
    </span>
  </Link>
  
  <h1 className="text-[]#35185A lg:text-4xl md:text-3xl text-2xl font-bold">Learn - The Skiie blog.</h1>
</div>

    <div className="hidden md:float-left md:contents">
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`} passHref>
          <span onClick={() => setLinkClick(true)} className="md:float-right mt-2 align-middle text-[#35185A] ml-4 font-semibold cursor-pointer">
            {!linkClick? category.name : "Loading..."}
          </span>
        </Link>
      ))}
    </div>
  </div>
</div>

  );
};

export default Header;
