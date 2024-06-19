import React from "react";

import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NAV_MENU = ["Home", "About Us", "Contact Us"];

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        className="flex items-center gap-2 font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      className={`fixed top-0 z-50 border-0 ${
        isScrolling ? "bg-white text-gray-900" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="https://www.material-tailwind.com"
          target="_blank"
          className={`fext-lg font-bold ${
            isScrolling ? " text-gray-900" : " text-white"
          }`}
        >
          Plusone Blog
        </Typography>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {NAV_MENU.map((name) => (
            <NavItem key={name}>{name}</NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="text"
            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Log in
          </Button>
          <a href="https://www.material-tailwind.com/blocks" target="_blank">
            <Button className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              blocks
            </Button>
          </a>
        </div>
        <IconButton
          variant="text"
          onClick={handleOpen}
          className={`ml-auto inline-block lg:hidden ${
            isScrolling ? " text-gray-900" : " text-white"
          }`}
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto bg-inherit rounded-lg py-4 px-6 mt-3 border-gray-200">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map((name) => (
              <NavItem key={name}>{name}</NavItem>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2">
            <Button
              variant="text"
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Log in
            </Button>
            <a href="https://www.material-tailwind.com/blocks" target="_blank">
              <Button className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                blocks
              </Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
