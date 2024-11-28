import { useEffect, useState } from 'react';
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react';
import { Layout } from './custom/layout';
import { Button } from './custom/button';
import Nav from './nav';
import { cn } from '@/lib/utils';
import { sidelinks } from '@/data/sidelinks';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] bg-sky-200 md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? 'md:w-14' : 'md:w-64'
        }`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
        } w-full bg-black md:hidden`}
      />

      <Layout className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4">
          <a
            href="https://afrijour-landing-page.web.app/"
            className={`flex items-center ${!isCollapsed ? 'gap-4' : ''}`}
          >
            <img
              src="https://raw.githubusercontent.com/ronnyonjetech/Frontend/refs/heads/v4/afrijourdashboard3/src/assets/logo.png"
              alt="Afrijour Logo"
              className="h-12 md:h-16 lg:h-20 object-contain cursor-pointer hover:scale-105 transition-transform"
            />
            <div
              className={`flex items-center truncate ${
                isCollapsed ? 'invisible w-0' : 'visible w-auto'
              }`}
            >
              {/* <span className="font-medium text-sm md:text-base lg:text-lg leading-none">
                Journals
              </span> */}
            </div>
          </a>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`z-40 h-full flex-1 overflow-auto space-y-6 ${
            navOpened
              ? 'max-h-screen px-6 py-4'
              : 'max-h-0 py-0 md:max-h-screen md:px-6 md:py-4'
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
