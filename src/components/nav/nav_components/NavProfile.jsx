import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React from 'react'
import { 
    UserCircleIcon, 
    Cog6ToothIcon, 
    InboxArrowDownIcon, 
    LifebuoyIcon,
    PowerIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/solid';

const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

export default function NavProfile() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const closeMenu = () => setIsMenuOpen(false)
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
        <MenuHandler>
            <Button
                variant='text'
                color='blue-gray'
                className='flex items-center gap-1
                rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
            >
                <Avatar 
                    variant='circular'
                    size='sm'
                    alt='Joel Sanchez'
                    className='border border-gray-900 p-0.5'
                    src='https://firebasestorage.googleapis.com/v0/b/portfolio-f94b0.appspot.com/o/PORTFOLIO%2FSuperusers%2F14?alt=media&token=d172ff02-9ed3-48d9-aaf5-61112f35c0da'
                />
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                    }`}
                />
            </Button>
        </MenuHandler>
        <MenuList className='p-1'>
            {
                profileMenuItems.map(({label, icon}, key) => {
                    const isLastItem = key === profileMenuItems.length -1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon,{
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant='small'
                                className='font-normal'
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    )
                })
            }
        </MenuList>
    </Menu>
  )
}
