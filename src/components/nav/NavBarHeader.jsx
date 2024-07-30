import React from 'react'
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
  } from "@material-tailwind/react";
import NavList from './nav_components/NavList';
import { Bars2Icon } from '@heroicons/react/24/solid';
import NavProfile from './nav_components/NavProfile';

export default function NavBarHeader() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);
  return (
    <Navbar className='mx-auto max-w-screen-xl p-2 lg:rounded-xl my-4 fixed
        lg:pl-6 z-50'>
            <div className='relative mx-auto flex items-center justify-between
            text-blue-gray-900'>
                <Typography
                    as='a'
                    href='#'
                    className='uppercase mr-4 ml-2 cursor-help py-1.5 font-black'
                >
                    portfolio
                </Typography>
                <div className='flex items-center'>
                    <div className='hidden lg:block'>
                        <NavList />
                    </div>
                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden"
                    >
                        <Bars2Icon className='h-6 w-6'/>
                    </IconButton>
                    <Button size="sm" variant="text">
                        <span>Log In</span>
                    </Button>
                    <NavProfile />
                </div>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
    </Navbar>
  )
}
