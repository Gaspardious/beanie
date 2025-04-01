import { motion } from "framer-motion";
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
  const menuVariants = {
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.10
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,

    }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.2
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.2
      }
    }
  };

  const links: NavLink[] = [
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/shop" },
    { label: "CHECKOUT", path: "/checkout" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
    { label: "FAQ", path: "/faq" },
    { label: "Cookies", path: "/cookiespolicy" },
    { label: "Integrity", path: "/integritetspolicy" },
  ];

  return (
    <div className="container">
      {/* Mobile Menu Button */}
      <div className="border border-white overflow-hidden w-fit rounded-lg">
      <motion.button
        className="p-2 bg-[#1c1c1c] w-10 text-white rounded-md sm:hidde cursor-pointer  z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.5, rotate: -20 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setOpen(!open)}
      >
        ☰
      </motion.button>
      </div>

      {/* Sidebar Menu */}
      <motion.ul
        className="flex flex-col justify-start items-center fixed top-0 left-0 h-full w-64 bg-black/90 text-white p-5 shadow-lg z-10"
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={menuVariants}
      >
        <motion.p 
          className="self-start close_btn cursor-pointer text-xl" 
          onClick={() => setOpen(false)}
          variants={itemVariants}
        >
          ✖
        </motion.p>
        <Image src="/logo_white.png" alt="logo" width={70} height={70} className="self-center mb-10" />
        <motion.div 
          className="flex flex-col gap-2"
        >
          {links.map((link, index) => (
            <motion.li 
              key={index} 
              className="m-3 font-bold text-lg text-center uppercase"
              variants={itemVariants}
            >
              <Link href={link.path} onClick={() => setOpen(false)} className="hover:text-[#ff8b07] font-oswald">
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.div>
      </motion.ul>
    </div>
  );
};

export default MobileMenu;