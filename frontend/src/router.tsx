import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import TeachLuma from './pages/TeachLuma';
import CodeSandbox from './pages/CodeSandbox';
import Dashboard from './pages/Dashboard';
import SelfQuestioning from './pages/SelfQuestioning';
import QuickNotes from './pages/QuickNotes';
import ReflectionSpace from './pages/ReflectionSpace';
import Theory from './pages/Theory';
import Equation from './pages/Equation';
import Courses from './pages/Courses';
import About from './pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'onboarding',
        element: <Onboarding />,
      },
      {
        path: 'learn',
        element: <Dashboard />,
      },
      {
        path: 'teach-luma',
        element: <TeachLuma />,
      },
      {
        path: 'code-sandbox',
        element: <CodeSandbox />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'self-questioning',
        element: <SelfQuestioning />,
      },
      {
        path: 'quick-notes',
        element: <QuickNotes />,
      },
      {
        path: 'reflection-space',
        element: <ReflectionSpace />,
      },
      {
        path: 'theory',
        element: <Theory />,
      },
      {
        path: 'equation',
        element: <Equation />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
