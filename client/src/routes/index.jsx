import { createBrowserRouter, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/Error-pages";
import LandingPageNonUser from "../pages/LandingPageNonUser";
import LandingPageUser from "../pages/LandingPageUser";
import About from "../pages/About";
import PageClient from "../pages/customer/FreelancerList";
import PageFreelancer from "../pages/freelancer/PageFreelancer";
import ClientProfile from "../pages/customer/ClientProfile";
import FreelancerProfile from "../pages/freelancer/Profile";
import FreelancerDetails from "../pages/customer/FreelancerDetails";
import Dashboard from "../pages/freelancer/Dashboard";
import Orders from "../pages/freelancer/Orders";
import ManageServices from "../pages/freelancer/ManageServices";
import { useAuth } from "../context/AuthContext";
import { Loading } from "../components/Loadings";
import MoneyManagement from "../pages/freelancer/MoneyManagement";
import HistoryOrders from "../pages/customer/HistoryOrders";
import ServiceReviewForm from "../components/ReviewForm";


const ProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectIfAuthenticated = false,
  landingPage = false,
  clientElement = null,
  freelancerElement = null,
}) => {
  const { isAuthenticated, user, authLoading, fetchUser } = useAuth();
  
  const token = Cookies.get("token");
  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  if (authLoading) {
    return <Loading />;
  }

  if (redirectIfAuthenticated) {
    return isAuthenticated ? <Navigate to="/" replace /> : children;
  }

  if (redirectIfAuthenticated) {
    return children;
  }

  if (!isAuthenticated && !landingPage) {
    return <ErrorPage />;
  }

  if (landingPage) {
    return isAuthenticated ? <LandingPageUser /> : <LandingPageNonUser />;
  }

  if (user.role) {
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.error("Access denied: User role not allowed", {
        userRole: user.role,
        allowedRoles,
      });
      return <ErrorPage />;
    }
  }

  if (user?.role === "client" && clientElement) {
    return clientElement;
  }

  if (user?.role === "freelancer" && freelancerElement) {
    return freelancerElement;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute landingPage={true}>
        <LandingPageUser />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute redirectIfAuthenticated={true}>
        <Register />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute redirectIfAuthenticated={true}>
        <Login />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/freelancers",
    element: (
      <ProtectedRoute>
        <PageClient />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/cariclient",
    element: (
      <ProtectedRoute>
        <PageFreelancer />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <HistoryOrders />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute
        clientElement={<ClientProfile />}
        freelancerElement={<FreelancerProfile />}
      />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: `/details/:serviceId`,
    element: (
      <ProtectedRoute>
        <FreelancerDetails />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["freelancer"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute allowedRoles={["freelancer"]}>
        <Orders />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute allowedRoles={["freelancer"]}>
        <ManageServices />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/management",
    element: (
      <ProtectedRoute allowedRoles={["freelancer"]}>
        <MoneyManagement />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: (
      <ProtectedRoute allowedRoles={["client"]}>
        <ServiceReviewForm />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);
