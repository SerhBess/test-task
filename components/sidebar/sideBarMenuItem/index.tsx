import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import { SidebarLink } from '../data';

type Props = ComponentPropsWithoutRef<'li'> & SidebarLink;
const sideBarMenuItem = ({ text, link, ...restProps }: Props) => {
  return (
    <li {...restProps}>
      <Link href={link} className="list-none text-white w-full h-full hover:bg-zinc-500 p-2 rounded-xl cursor-pointer">
        {text}
      </Link>
    </li>
  );
};

export default sideBarMenuItem;
