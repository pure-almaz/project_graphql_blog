import React, { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { graphCMSImageLoader } from '../util';

const PostCard = ({ post }) => {
  const [linkClick, setLinkClick] = useState(false);

  return (
    <div style={{backgroundColor:"white"}} className="bg-white shadow-lg rounded-lg p-0  pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
      <img 
        src={post.featuredImage.url} 
        alt={post.title}
        className="h-full w-full object-cover shadow-lg rounded-tl-lg rounded-tr-lg"
      />
  
        <div className="absolute top-0 left-0 right-0 bottom-0 hover:bg-black opacity-50"></div> {/* Dark overlay */}
  
      {/* Text on top of the image */}
      <h2 
      onClick={() => setLinkClick(true)} 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent 
      text-3xl font-semibold text-center cursor-pointer transition duration-700 hover:text-white hover:bg-black z-10"
      >
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      </div>
  
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
          <Image
            unoptimized
            loader={graphCMSImageLoader}
            alt={post.author.name}
            height="27"
            width="27"
            className="align-middle rounded-full"
            src={post.author.photo.url}
            style={{border:"1px solid #35185A"}}
          />
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg italic">{post.author.name}</p>
        </div>
        <div className="font-medium text-gray-700 italic">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="#35185A">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <p className="text-center text-lg text-black font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`} passHref>
          <span 
          onClick={() => setLinkClick(true)} 
          style={{backgroundColor:"#35185A"}} 
          className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-[#35185A] 
          text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
          {!linkClick? "Continue Reading": "Loading..."}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
