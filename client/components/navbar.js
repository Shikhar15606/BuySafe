import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = props => {
  const router = useRouter();
  const pathname = router.pathname;

  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: false },
    { name: 'Brands', href: '/brand', current: false },
    { name: 'Mint', href: '/product/new', current: false },
    { name: 'Create', href: '/brand/new', current: false },
  ]);

  useEffect(() => {
    let newNavigation = [...navigation];
    for (let i = 0; i < newNavigation.length; i++) {
      if (newNavigation[i].href == pathname) newNavigation[i].current = true;
      else newNavigation[i].current = false;
    }
    setNavigation(newNavigation);
  }, [router, setNavigation]);

  return (
    <Disclosure as='nav' className='bg-wh mb-16'>
      {({ open }) => (
        <>
          <div className='mx-auto bg-white px-2 sm:px-6 lg:px-8 shadow-md fixed top-0 w-screen z-50'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-800'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-8 w-auto'
                    src='/logo.svg'
                    alt='BuySafe'
                  />
                  <img
                    className='hidden lg:block h-8 w-auto'
                    src='/logo.svg'
                    alt='BuySafe'
                  />
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-indigo-600'
                              : 'text-gray-900 hover:bg-indigo-600 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden fixed bg-white top-16 w-screen z-50'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map(item => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 text-indigo-600'
                        : 'text-gray-900 hover:bg-indigo-600 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
