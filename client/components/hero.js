import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <div className='relative bg-white overflow-hidden bg-transparent'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8  sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <main className='my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='sm:text-center lg:text-left'>
                <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                  <span className='block xl:inline'>Ensuring Quality</span>{' '}
                  <span className='block text-indigo-600 xl:inline'>
                    Using Tokens
                  </span>
                </h1>
                <p className='text-justify mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  We verify the authenticity of products and manufacturers,
                  track their ownership, prevent counterfeiting in a completely
                  decentralized and user-friendly manner. So that you can buy
                  them safely.
                </p>
                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                  <div className='rounded-md shadow'>
                    <Link href='/brand'>
                      <a className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
                        Explore Brands
                      </a>
                    </Link>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:ml-3'>
                    <Link href='/brand/new'>
                      <a className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'>
                        Register Your Brand
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-4 lg:mt-32'>
        <div className='h-56 w-full sm:h-72 lg:h-3/5 bg-white relative'>
          <Image src='/hero.gif' layout='fill' alt='' objectFit='contain' />
        </div>
      </div>
    </>
  );
};

export default Hero;
