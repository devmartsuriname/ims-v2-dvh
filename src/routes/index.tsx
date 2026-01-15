import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

const Dashboards = lazy(() => import('@/app/(admin)/dashboards/page'))

// Auth Routes
const AuthSignIn = lazy(() => import('@/app/(other)/auth/sign-in/page'))
const AuthSignUp = lazy(() => import('@/app/(other)/auth/sign-up/page'))
const ResetPassword = lazy(() => import('@/app/(other)/auth/reset-password/page'))
const LockScreen = lazy(() => import('@/app/(other)/auth/lock-screen/page'))
const Error404 = lazy(() => import('@/app/(other)/error-pages/pages-404/page'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/dashboards" />,
  },
]

const generalRoutes: RoutesProps[] = [
  {
    path: '/dashboards',
    name: 'Dashboards',
    element: <Dashboards />,
  },
]

export const authRoutes: RoutesProps[] = [
  {
    name: 'Sign In',
    path: '/auth/sign-in',
    element: <AuthSignIn />,
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up',
    element: <AuthSignUp />,
  },

  {
    name: 'Reset Password',
    path: '/auth/reset-password',
    element: <ResetPassword />,
  },
  {
    name: 'Lock Screen',
    path: '/auth/lock-screen',
    element: <LockScreen />,
  },
  {
    name: '404 Error',
    path: '/error-pages/pages-404',
    element: <Error404 />,
  },
  {
    name: 'Not Found',
    path: '*',
    element: <Error404 />,
  },
]

export const appRoutes = [
  ...initialRoutes,
  ...generalRoutes,
]
