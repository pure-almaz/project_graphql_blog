import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdjacentPostCard = ({ post, position }) => {
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
    <>
      <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-80" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-80" />
      <div onClick={() => setLinkClick(true)} className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
        <p className="text-white text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
        <p className="text-white text-shadow font-semibold text-2xl text-center">{!linkClick? post.title : "Loading..."}</p>
      </div>
      <Link href={`/post/${post.slug}`} passHref><span className="z-10 cursor-pointer absolute w-full h-full" /></Link>
      {position === 'LEFT' && (
        <div style={{backgroundColor:"#35185A"}} className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-[#35185A] left-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
      )}
      {position === 'RIGHT' && (
        <div style={{backgroundColor:"#35185A"}} className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-[#35185A] right-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      )}
    </>
  )
};

export default AdjacentPostCard;
