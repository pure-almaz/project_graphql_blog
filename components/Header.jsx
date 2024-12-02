import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
<div className="container mx-auto px-10 mb-8">
  <div className="border-b w-full inline-block border-[#35185A] py-4">
  <div className="md:float-left block flex items-end space-x-4">
  <Link href="/">
    <span>
      <img 
        title="logo" 
        src="/learn.png" 
        className="w-16 h-16 md:w-24 md:h-24 object-contain rounded-lg"
        alt="Logo" 
      />
    </span>
  </Link>
  
  <h1 className="text-white lg:text-4xl md:text-3xl text-2xl font-bold">Learn - The Skiie blog.</h1>
</div>

    <div className="hidden md:float-left md:contents">
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  </div>
</div>

  );
};

export default Header;
