import { lazy, Suspense, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";

const Hire = lazy(() => import("./pages/Hire"));
const Product = lazy(() => import("./pages/Product"));
const Packages = lazy(() => import("./pages/Packages"));
const Booking = lazy(() => import("./pages/Booking"));
const BookingSent = lazy(() => import("./pages/BookingSent"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RenderModel = lazy(() => import("./pages/RenderModel"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hire" element={<Hire />} />
          <Route path="hire/:slug" element={<Product />} />
          <Route path="packages" element={<Packages />} />
          <Route path="booking" element={<Booking />} />
          <Route path="booking/sent" element={<BookingSent />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="render/:slug"
          element={
            <Suspense fallback={null}>
              <RenderModel />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
