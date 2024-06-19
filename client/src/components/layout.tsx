import PropTypes from "prop-types";
import { ThemeProvider } from "@material-tailwind/react";

export function Layout({
  children,
}: {
  children: NonNullable<PropTypes.ReactNodeLike>;
}) {
  return (
    <ThemeProvider
      value={{
        theme: "dark",
      }}
    >
      <main className="bg-gray-900">{children}</main>
    </ThemeProvider>
  );
}

export default Layout;
