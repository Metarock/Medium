import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../components/Header';
import { SubHeader } from '../components/SubHeader';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';

interface Props {
    posts: [Post];
}

export default function Home({ posts }: Props) {
    console.log(urlFor(posts[0].mainImage).url());
    return (
        <div className='max-w-7xl mx-auto'>
            <Head>
                <title>Medium Sanggy</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            {/* Header */}
            <Header />

            {/* sub header */}
            <SubHeader />

            {/* Posts: which will be fetched from sanity CMS */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
                {posts.map((post) => (
                    <Link key={post._id} href={`/post/${post.slug.current}`}>
                        <div className='group overflow-hidden cursor-pointer border rounded-lg'>
                            {/* thumbnail for post */}
                            <img
                                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                                src={urlFor(post.mainImage).url()!}
                                alt=''
                            />
                            <div className='flex justify-between p-5 bg-white'>
                                {/* author details */}
                                <div>
                                    <p className='text-lg font-bold'>
                                        {post.title}
                                    </p>
                                    <p className='text-xs'>
                                        {post.description} by {post.author.name}
                                    </p>
                                </div>
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src={urlFor(post.author.image).url()!}
                                    alt=''
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// runs every request; this will change the page to an SSR page
export const getServerSideProps = async () => {
    const query = `*[_type == 'post']{
        _id,
        title,
        author -> {
            name,
            image
        },
        description,
        mainImage,
        slug,
    }`;

    const posts = await sanityClient.fetch(query);

    return {
        props: {
            posts,
        },
    };
};
