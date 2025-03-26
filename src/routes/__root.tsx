import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Navbar from '../components/navbar';
import { ToastContainer } from 'react-toastify';

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <TanStackRouterDevtools />
    </>
  ),
});
