import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ListDetailPage = lazy(() => import('@/pages/ListDetailPage'))
const MenuPage = lazy(() => import('@/pages/MenuPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-24">
    <p className="font-body text-sand animate-pulse">Loading…</p>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'list/:slug',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ListDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'list/:slug/restaurant/:restaurantId',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MenuPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: 'blog/:slug',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BlogPostPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
