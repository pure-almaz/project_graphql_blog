import React from 'react';
import Image from 'next/image';

import { graphCMSImageLoader } from '../util';

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-4 relative rounded-lg bg-black bg-opacity-20 text-sm sm:p-2 text-xs">
    <div className="absolute left-0 right-0 -top-14">
      <Image
        unoptimized
        loader={graphCMSImageLoader}
        alt={author.name}
        height="100"
        width="100"
        className="align-middle rounded-full"
        src={author.photo.url}
      />
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls w-[85%] mx-auto">{author.bio}</p>
  </div>
);

export default Author;
