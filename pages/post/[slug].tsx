import { GetStaticProps } from 'next';
import React from 'react';
import { Header } from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';

interface SlugProps {
    post: Post;
}

function Post({ post }: SlugProps) {
    return (
        <main>
            <Header />
        </main>
    );
}

export default Post;

// How to figure out which paths to render
export const getStaticPaths = async () => {
    // pre fetch all the routes
    const query = `
    *[_type == 'post']{
                id,
                slug {
                        current
                }
        }`;

    const posts = await sanityClient.fetch(query);

    //get the paths
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

// allows us to use the slug from the params
// we have to use getStaticPaths with getStaticProps
// destructure the prop context, which contains a params one of many
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == 'post' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
        name,
        image
    },
    description,
    mainImage,
    slug,
    body
    }`;

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if (!post) {
        return {
            // return 404
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },

        // if there is an update, update the cache
        // after 60 seconds, it will update the old cached version
        revalidate: 60,
    };
};
