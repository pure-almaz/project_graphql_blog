import React from 'react';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-40 w-80">
    <div className="relative rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-full" style={{ backgroundImage: `url('${post.featuredImage.url}')` }}>
    <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
    </div>
  </div>
);

export default FeaturedPostCard;
