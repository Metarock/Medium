import Link from 'next/link';
import React, { useState } from 'react';

export const Header: React.FC = ({}) => {
    return (
        <header>
            <div className='flex items-center space-x-5'>
                <Link href='/'>
                    <img
                        className='w-44 object-contain cursor-pointer'
                        src='https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png'
                        alt=''
                    />
                </Link>
                {/* tags */}
                <div className='hidden md:inline-flex items-center space-x-5'>
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className='text-white bg-green-600 px-4 py-1 rounded-full'>
                        Follow
                    </h3>
                </div>
            </div>
            <div></div>
        </header>
    );
};
