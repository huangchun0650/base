import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import Auth from 'services/auth';
import { useNavigate } from "react-router-dom";
import routes from "routes.js";

export default function Admin(props) {
  const navigate = useNavigate();
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userMenu, setUserMenu] = useState([]);
  const [errorElement, setError] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const closeModal = () => {
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const profileResponse = await Auth.profile(closeModal);
      const menuListResponse = await Auth.menuList(closeModal);

      if (React.isValidElement(profileResponse)) {
        setError(profileResponse);
        return profileResponse;
      }

      if (React.isValidElement(menuListResponse)) {
        setError(menuListResponse);
        return menuListResponse;
      }

      setUserData(profileResponse);
      setUserMenu(menuListResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const getActiveRoute = () => {
    const currentPath = location.pathname;
    const route = routes.find((route) => route.layout + '/' + route.path === currentPath);
    if (route) {
      return route.name;
    } else {
      return 'Main Dashboard';
    }
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={`/${prop.path}`}
            element={React.cloneElement(prop.component, { permissions: prop.permissions })}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getSidebarMenu = () => {
    const filteredRoutes = routes
      .filter((route) => {
        const menu = userMenu.flat().find((m) => m.code === route.code);
        return menu || route.code === "default";
      })
      .map((route) => {
        const menu = userMenu.flat().find((m) => m.code === route.code);
        return {
          ...route,
          sort: menu && menu.sort_order,
          permissions: menu && menu.permissions,
          children: menu && menu.children ? getChildrenRoutes(menu.children) : [],
        };
      })
      .sort((a, b) => {
        const sortA = a.sort || 0;
        const sortB = b.sort || 0;
        return sortA - sortB;
      });

    return filteredRoutes;
  };

  const getChildrenRoutes = (children) => {
    return children
      .filter((child) => {
        return routes.some((route) => route.code === child.code);
      })
      .map((child) => {
        const route = routes.find((route) => route.code === child.code);
        return {
          ...route,
          sort: child.sort_order,
        };
      })
      .sort((a, b) => {
        const sortA = a.sort || 0;
        const sortB = b.sort || 0;
        return sortA - sortB;
      });
  };

  const filteredRoutes = getSidebarMenu();
  const currentRoute = getActiveRoute(filteredRoutes)

  return (
    <div className="flex h-full w-full">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        routes={getSidebarMenu()}
      />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}>
          <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                logoText={"menu list"}
                brandText={currentRoute}
                userData={userData}
                secondary={false}
                {...rest}
              />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(filteredRoutes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
      {/* 模态框 */}
      {errorElement && errorElement}
    </div>
  );
}