import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PAGES } from "../constants";

function Sidebar() {
  const navigate = useNavigate();
  const { adminSection } = useParams();
  const section = adminSection || "customer";

  const doClick = (link) => {
    navigate(link);
  };

  const menus = useMemo(
    () =>
      PAGES.map((menu) => {
        const activeClassName = section === menu.link ? "bg-slate-200" : "";
        return (
          <li
            key={menu.label}
            className={`hover:bg-slate-200 px-10 py-2 font-semibold cursor-pointer ${activeClassName}`}
            onClick={() => doClick(`/__admin/${menu.link}`)}
          >
            {menu.label}
          </li>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [adminSection]
  );

  return (
    <div className="sidebar py-2 min-h-screen bg-slate-300 ">
      <ul>{menus}</ul>
    </div>
  );
}

export default Sidebar;
