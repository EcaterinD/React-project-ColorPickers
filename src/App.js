import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ColorPickerPage from "./pages/ColorPickerPage";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import MyColorsPage from "./pages/MyColorsPage";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setIsAuthenticated } from "./store/auth.reducer";
import RegisterPage from "./pages/RegisterPage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route element={<Navbar />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/colorpicker" element={<ColorPickerPage />} />
            <Route element={<ProtectedRoute redirectTo="/" />}>
              <Route path="/users/:userId/colors" element={<MyColorsPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsAuthenticated());
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
