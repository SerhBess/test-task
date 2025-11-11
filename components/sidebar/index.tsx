import React, { ComponentPropsWithoutRef } from 'react';

import SidebarMenuList from './sidebarMenuList';

type Props = ComponentPropsWithoutRef<'aside'>;

const Sidebar = ({ ...restProps }: Props) => {
  return (
    <aside {...restProps} className='w-56 px-5 pt-8' >
      <SidebarMenuList />
    </aside>
  );
};

export default Sidebar;
