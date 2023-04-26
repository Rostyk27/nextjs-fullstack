import Card from './Card';
import SidebarLink from './SidebarLink';

const links = [
  { label: 'Home', icon: 'Grid' as const, link: '/home' },
  { label: 'Calendar', icon: 'Calendar' as const, link: '/calendar' },
  { label: 'Profile', icon: 'User' as const, link: '/profile' },
  { label: 'Settings', icon: 'Settings' as const, link: '/settings' },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map(link => (
        <SidebarLink link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
