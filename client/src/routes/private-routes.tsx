import { Route } from "react-router-dom";
import { HomePage, Login } from "../pages";
import React from "react";

type RouteObjectType = {
  path: string;
  element: React.ElementType;
  index?: boolean;
  children?: RouteObjectType[] | null;
};
const allPublicRoutes: RouteObjectType[] = [
  { path: "/", element: HomePage, index: false, children: null },
  { path: "/login", element: Login },
];

const recursiveRoutes = (routes: RouteObjectType[]) => {
  return routes.map((r, ind) => (
    <Route
      key={`${r.path}__${ind}`}
      path={r.path}
      index={r.index ? false : undefined}
      element={<r.element />}
    >
      {r?.children ? recursiveRoutes(r.children) : null}
    </Route>
  ));
};

const PublicRoutes = <Route>{recursiveRoutes(allPublicRoutes)}</Route>;

export default PublicRoutes;
