import { ComponentPropsWithoutRef } from 'react';

import { sidebarLinksArray } from '../data';
import SideBarMenuItem from '../sideBarMenuItem';

type Props = ComponentPropsWithoutRef<'ul'>;

const SidebarMenuList = ({ ...restProps }: Props) => {
  return (
    <ul className="m-0 p-0 list-none flex flex-col gap-2.5" {...restProps}>
      {sidebarLinksArray.map(item => (
        <SideBarMenuItem key={item.text} link={item.link} text={item.text} />
      ))}
    </ul>
  );
};

export default SidebarMenuList;
