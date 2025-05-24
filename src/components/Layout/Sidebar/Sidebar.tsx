import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart2, ListTodo } from 'lucide-react';

const routes = [
  {
    label: 'Home',
    icon: Home,
    href: '/home',
    color: 'text-sky-500',
  },
  {
    label: 'Scenarios',
    icon: ListTodo,
    href: '/scenarios',
    color: 'text-violet-500',
  },
  {
    label: 'Trades',
    icon: BarChart2,
    href: '/trades',
    color: 'text-pink-700',
  },
  {
    label: 'Calendar',
    icon: Calendar,
    href: '/calendar',
    color: 'text-orange-700',
  },
  {
    label: 'Dashboard',
    icon: BarChart2,
    href: '/dashboard',
    color: 'text-emerald-500',
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                location.pathname === route.href
                  ? 'text-white bg-white/10'
                  : 'text-zinc-400'
              )}
            >
              <div className='flex items-center flex-1'>
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
