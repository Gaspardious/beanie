"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  path: string;
}

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const staggerList = stagger(0.15, { startDelay: 0.25 });

  const links: NavLink[] = [
    { label: "Hem", path: "/" },
    { label: "Om oss", path: "/about" },
    { label: "Kontakt", path: "/contact" },
    { label: "Tjänster", path: "/offer" },
    { label: "Inspiration", path: "/inspiration" },
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
        className="p-2 mr-2 bg-[#263e57] text-white rounded-md sm:hidden "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setOpen(!open)}
      >
        MENU
      </motion.button>

      {/* Sidebar Menu */}
      <ul className="ul_container fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 shadow-lg z-50">
        <p className="close_btn cursor-pointer text-xl" onClick={() => setOpen(false)}>
          ✖
        </p>
        {links.map((link, index) => (
          <motion.li key={index} className="li_container p-3">
            <Link href={link.path} onClick={() => setOpen(false)} className="hover:text-blue-300">
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;