import { DollarCircle, Home, List, UserCircle } from 'iconoir-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = (): React.JSX.Element => {
  const [currentRoute, setCurrentRoute] = useState<string>('/');

  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-200 flex m-3 rounded-3xl p-1 sm:p-3 items-center justify-around z-40 max-w-xl">
      {Object.values(privateRouteConfig).map((route) => {
        const isActive = currentRoute === route.href;

        return (
          <div key={route.href} className="relative">
            {isActive && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 rounded-3xl z-0"
                initial={false}
                animate={{
                  backgroundColor: route.color,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 0.3,
                }}
              />
            )}

            <button
              onClick={() => {
                setCurrentRoute(route.href);
                navigate(route.href);
              }}
              className={`relative z-10 flex flex-col items-center p-2 sm:p-3 rounded-3xl text-sm sm:text-base transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-gray-600'
              } focus:ring-0 focus:outline-none`}
            >
              {route.icon}
              {route.title}
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export type PrivateRoutesType = 'HOME' | 'TRANSACTIONS' | 'CATEGORIES' | 'PROFILE';

export type PrivateRouteConfig = {
  [x in PrivateRoutesType]: {
    title?: string;
    icon?: React.ReactNode;
    href: string;
    color?: string;
  };
};

export const privateRouteConfig: PrivateRouteConfig = {
  HOME: { title: 'Home', icon: <Home fontSize={12} />, href: '/', color: 'gray' },
  TRANSACTIONS: {
    title: 'Transacciones',
    icon: <DollarCircle fontSize={12} />,
    href: '/transactions',
    color: '#3A7D44',
  },
  CATEGORIES: {
    title: 'Categorías',
    icon: <List fontSize={12} />,
    href: '/categories',
    color: '#FE5F55',
  },
  PROFILE: {
    title: 'Perfil',
    icon: <UserCircle fontSize={12} />,
    href: '/profile',
    color: '#2A324B',
  },
};

export default Navbar;
