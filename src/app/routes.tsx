import { createBrowserRouter } from 'react-router';
import PhoneFrame from './components/PhoneFrame';
import Layout from './components/Layout';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Splash from './pages/Splash';
import { AnimatePage } from './components/AnimatePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Splash,
  },
  {
    path: '/home',
    Component: () => (
      <PhoneFrame>
        <Layout />
      </PhoneFrame>
    ),
    children: [
      {
        index: true,
        Component: () => <AnimatePage><Home /></AnimatePage>,
      },
      {
        path: 'recipe/:id',
        Component: () => <AnimatePage><RecipeDetail /></AnimatePage>,
      },
      {
        path: 'favorites',
        Component: () => <AnimatePage><Favorites /></AnimatePage>,
      },
      {
        path: 'profile',
        Component: () => <AnimatePage><Profile /></AnimatePage>,
      },
      {
        path: 'login',
        Component: () => <AnimatePage><Login /></AnimatePage>,
      },
    ],
  },
]);
