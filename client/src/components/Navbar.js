import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

const LINKS = [
  { link: "/", label: "Abonnement" },
  { link: "/contact-us", label: "Joignez-nous" },
];

const Navbar = (props) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const doChange = (event) => {
    setIsOpen(event.target.checked);
  };

  return (
    <nav class="bg-[#232323] px-4 sticky top-0 z-50">
      <div>
        <div class="container mx-auto flex justify-between items-center">
          <div>
            <Link to="/">
              <Icon />
            </Link>
          </div>
          <div>
            <div className="hidden sm:block">
              <ul class="menu-link-container flex space-x-4 ">
                {LINKS.map((link) => (
                  <li>
                    <Link
                      to={link.link}
                      className={`text-white hover:text-gray-300 ${
                        location.pathname === link.link ? "text-gray-300" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="flex items-center justify-end sm:hidden w-[150px]"
              ref={ref}
            >
              <div id="menuToggle">
                <input type="checkbox" onChange={doChange} checked={isOpen} />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu" className="bg-slate-600">
                  {LINKS.map((link) => (
                    <li>
                      <Link
                        to={link.link}
                        className={`text-white hover:text-gray-300 ${
                          location.pathname === link.link ? "text-gray-300" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Add another account</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}> Logout</MenuItem>
            </Menu> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
