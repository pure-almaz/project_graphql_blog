import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';
import { useRouter } from 'next/router';

const Categories = () => {
  const [linkClick, setLinkClick] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeComplete = () => {
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
    <>{categories?.length > 0 &&
        <div style={{backgroundColor:"#D9D9D9"}} className="bg-[#D9D9D9] shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`} passHref>
          <span onClick={() => setLinkClick(true)} className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{!linkClick? category.name : "Loading..."}</span>
        </Link>
      ))}
    </div>
    }</>
  );
};

export default Categories;
