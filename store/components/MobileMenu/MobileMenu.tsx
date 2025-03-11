"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavLink {
  label: string;
  path: string;
}

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, setOpen}) => {
  const [scope, animate] = useAnimate();
  const staggerList = stagger(0.07, { startDelay: 0.10 });

  const links: NavLink[] = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Cookies", path: "/cookiespolicy" },
    { label: "Integrity", path: "/integritetspolicy" },
  ];

  useEffect(() => {
    if (!scope.current) return;

    animate(
      ".ul_container",
      {
        x: open ? "0%" : "-100%",
        opacity: open ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      ".li_container",
      {
        x: open ? "0%" : "-100%",
        opacity: open ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
        delay: open ? staggerList : 0,
      }
    );
  }, [open, animate, scope, staggerList]);

  return (
    <div className="container" ref={scope}>
      {/* Mobile Menu Button */}
      <motion.button
        className="p-2 w-10 mr-2 bg-[#1e1e1e] text-white rounded-md sm:hidden z-40 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setOpen(!open)}
      >
        ☰
      </motion.button>

      {/* Sidebar Menu */}
      <ul className=" flex flex-col justify-start items-center ul_container fixed top-0 left-0 h-full w-64 bg-black/90 text-white p-5 shadow-lg z-40">
        <p className="self-start close_btn cursor-pointer text-xl" onClick={() => setOpen(false)}>
          ✖
        </p>
           <Image src="/tiger_white.png"  alt="logo" width={100} height={90} className="self-center mb-10" />
        <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <motion.li key={index} className="li_container m-3 font-bold text-lg text-center uppercase">
            <Link href={link.path} onClick={() => setOpen(false)} className="hover:text-blue-300 font-oswald">
              {link.label}
            </Link>
          </motion.li>
        ))}
        </div>
      </ul>

    </div>
  );
};

export default MobileMenu;