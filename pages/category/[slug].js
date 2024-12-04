import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';
import Head from 'next/head';

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  const { slug } = router.query; // Extract slug from the URL
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await getCategories();
      const currentCategory = categories.find((cat) => cat.slug === slug);
      setCategory(currentCategory.name);
    };

    if (slug) {
      fetchCategory(); // Fetch category data when slug is available
    }
  }, [slug]);

  if (router.isFallback) {
    return <Loader />;
  }

  return (

    <>
      <Head>
        <title> Learn {category}: The Skiie Blog</title>
        <meta name="description" content={`Learn more about ${category} on the Skiie learning blog. Skiie is a SEO web development agency that helps you get the most out of the web.`} />
      </Head>
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
