import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FeaturedPostCard = ({ post }) => {
  const [linkClick, setLinkClick] = useState(false);
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

  return (
    <div onClick={() => setLinkClick(true)} className="relative h-40 w-80">
      <div className="relative rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-full" style={{ backgroundImage: `url('${post.featuredImage.url}')` }}>
      <Link href={`/post/${post.slug}`} passHref>
      <span className="cursor-pointer absolute w-full h-full" />
      </Link>
      {linkClick && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center cursor-pointer transition duration-700 bg-black z-10">Loading...</p>}
      </div>
    </div>
  )
};

export default FeaturedPostCard;
