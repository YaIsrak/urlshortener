import { createRootRoute, createRoute } from '@tanstack/react-router';
import RootLayout from '../pages/RootLayout';
// pages
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import HomePage from '@/pages/HomePage';

export const rootRoute = createRootRoute({
	component: RootLayout,
});

// routes
const HomeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: HomePage,
});

const AuthRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/auth',
	component: AuthPage,
});

const DashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/dashboard',
	component: DashboardPage,
});

// route tree
export const routeTree = rootRoute.addChildren([
	HomeRoute,
	AuthRoute,
	DashboardRoute,
]);
