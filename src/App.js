import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { PageWrapper } from "./components/PageWrapper";

import Layout from "./components/Layout";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  return (
    <AnimatePresence>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <PageWrapper>
                <Cart />
              </PageWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
        </Routes>
      </Layout>
    </AnimatePresence>
  );
}
export default App;
