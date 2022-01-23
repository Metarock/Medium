import React from 'react';
import { Header } from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';

export const Slug: React.FC = ({}) => {
    return (
        <main>
            <Header />
        </main>
    );
};

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
