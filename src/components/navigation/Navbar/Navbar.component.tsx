import { DollarCircle, Home, List, UserCircle } from 'iconoir-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import colors from '../../../styles/colors';

const Navbar = (): React.JSX.Element => {
  const [currentRoute, setCurrentRoute] = useState<string>('/');

  const navigate = useNavigate();

  return (
    <nav className="fixed lg:static bottom-0 left-0 right-0 bg-white !md:bg-transparent border-t lg:border-none bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-200 flex lg:flex-col m-3 lg:m-0 lg:my-4 lg:rounded-ss-none lg:rounded-es-none rounded-3xl lg:rounded-[32px] p-1 sm:p-3 items-center justify-around lg:justify-start z-40 lg:max-w-auto lg:flex-1">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(120deg, #2ad6a3 40%, #f7cdf7 30%, #D95D39 30%)',
            filter: 'blur(64px)',
            opacity: 0.8,
          }}
        />
      </div>
      {Object.values(privateRouteConfig).map((route) => {
        const isActive = currentRoute === route.href;

        return (
          <div key={route.href} className="relative w-full">
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
              className={`relative z-10 w-full flex flex-col sm:flex-row sm:gap-2 justify-center lg:justify-start items-center p-2 sm:p-3 rounded-3xl text-sm sm:text-base transition-colors duration-200 ${
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
  HOME: { title: 'Resumen', icon: <Home fontSize={12} />, href: '/', color: colors.navy },
  TRANSACTIONS: {
    title: 'Transacciones',
    icon: <DollarCircle fontSize={12} />,
    href: '/transactions',
    color: colors.green,
  },
  CATEGORIES: {
    title: 'Categorías',
    icon: <List fontSize={12} />,
    href: '/categories',
    color: colors.coral,
  },
  PROFILE: {
    title: 'Perfil',
    icon: <UserCircle fontSize={12} />,
    href: '/profile',
    color: colors.blue,
  },
};

export default Navbar;
