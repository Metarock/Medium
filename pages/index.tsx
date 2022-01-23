import Head from 'next/head';
import { Header } from '../components/Header';
import { SubHeader } from '../components/SubHeader';

export default function Home() {
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
        </div>
    );
}
