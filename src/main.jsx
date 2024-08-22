
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Homepage from './routes/homepage/Homepage.jsx';
import Dashboard from './routes/dashboardPage/Dashboard.jsx';
import Chatpage from './routes/Chatpage/Chatpage.jsx';
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import RootLayout from './layouts/dashboardLayout/rootLayout/RootLayout.jsx';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout.jsx'
import SignInPage from "./routes/signInpage/SignInPage.jsx"
import SignUpPage from "./routes/signUppage/SignUpPage.jsx"



const router = createBrowserRouter([
  {
   element: <RootLayout/>,
   children:[
    {path:"/",
     element:<Homepage/> 
    },
    {path:"sign-in/*",
     element: <SignInPage/>
    },
    {path:"/sign-up/*",
     element: <SignUpPage/>
    },
    {
      element: <DashboardLayout/>,
      children:[
        {
          path: "/dashboard",
          element: <Dashboard/>
        },
        {
          path:"/dashboard/chats/:id",
          element: <Chatpage/>
        },
      ],
    },
   ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
);
