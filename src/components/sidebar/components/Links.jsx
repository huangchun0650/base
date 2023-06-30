import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import DashIcon from "components/icons/DashIcon";

export function SidebarLinks(props) {
  const location = useLocation();
  const { routes } = props;

  const isActiveRoute = (routePath) => {
    return location.pathname === routePath;
  };

  const [expandedRoutes, setExpandedRoutes] = useState([]);

  const toggleRouteExpansion = (routePath) => {
    if (expandedRoutes.includes(routePath)) {
      setExpandedRoutes(expandedRoutes.filter((path) => path !== routePath));
    } else {
      setExpandedRoutes([...expandedRoutes, routePath]);
    }
  };

  const renderLinks = (routes, isActiveRoute) => {
    return routes.map((route, index) => {
      const isActive = isActiveRoute(route.layout + "/" + route.path);
      const hasChildren = route.children && route.children.length > 0;

      const handleAccordionClick = () => {
        toggleRouteExpansion(route.layout + "/" + route.path);
      };

      return (
        <div key={index}>
          {hasChildren ? (
            <Accordion allowToggle>
              <AccordionItem className = "relative mb-3 ">
                <h2>
                  <AccordionButton
                    onClick={handleAccordionClick}
                    _focus={{ boxShadow: "none" }}
                    className={`my-[3px] flex cursor-pointer items-center px-8 ${
                      isActive
                        ? "font-bold text-brand-500 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    <span>
                      {route.icon ? route.icon : <DashIcon />}
                    </span>
                    <p className="leading-1 ml-4">
                      {route.name}
                    </p>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <ul className="pl-8">
                    {renderLinks(route.children, isActiveRoute)}
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link to={route.layout + "/" + route.path}>
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className={`my-[3px] flex cursor-pointer items-center px-8 ${
                    isActive
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  <span>
                    {route.icon ? route.icon : <DashIcon />}
                  </span>
                  <p className="leading-1 ml-4">
                    {route.name}
                  </p>
                </li>
              </div>
            </Link>
          )}
        </div>
      );
    });
  };

  return <ul>{renderLinks(routes, isActiveRoute)}</ul>;
}

export default SidebarLinks;
