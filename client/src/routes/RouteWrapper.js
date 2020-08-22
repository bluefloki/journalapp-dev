import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout, AuthLayout } from "../components/layout/Layouts";
import { useGlobalContext } from "../context/GlobalContext";

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  const { signed } = useGlobalContext();
  if (isPrivate && !signed) {
    return <Redirect to="/register" />;
  }
  if (!isPrivate && signed) {
    return <Redirect to="/entries" />;
  }

  const Layout = signed ? AuthLayout : DefaultLayout;

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default RouteWrapper;
