import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';

import PrivateRoutes from './pages/Authentication/PrivateRoutes';
import CategoriesPage from './pages/Categories';
import AddCategory from './pages/Form/Sweeshed/AddCategory';
import UpdateCategory from './pages/Form/Sweeshed/UpdateCategory';
import Brands from './pages/Brands';
import AddBrand from './pages/Form/Sweeshed/AddBrand';
import UpdateBrand from './pages/Form/Sweeshed/UpdateBrand';
import OrderPage from './pages/OrderPage';
import OrderDetail from './components/Sweeshed/OrderDetail';
import RegisteredUsers from './pages/RegisteredUsers';
import Promo from './pages/Promo/Promo';
import AddPromo from './pages/Promo/AddPromo';
import Posters from './pages/Posters';
import AddPoster from './pages/Form/Sweeshed/AddPoster';
import UpdatePoster from './pages/Form/Sweeshed/UpdatePoster';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<DefaultLayout />}>
            <Route index path="/" element={<OrderPage />} />

            {/* //////// routes for order/////////// */}
            <Route
              path="/order"
              element={
                <Suspense fallback={<Loader />}>
                  <OrderPage />
                </Suspense>
              }
            />
            <Route
              path="/orderDetail/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <OrderDetail />
                </Suspense>
              }
            />
            <Route
              path="/category/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <UpdateCategory />
                </Suspense>
              }
            />
            {/* //////// routes for Categories/////////// */}
            <Route
              path="/categories"
              element={
                <Suspense fallback={<Loader />}>
                  <CategoriesPage />
                </Suspense>
              }
            />
            <Route
              path="/addCategory"
              element={
                <Suspense fallback={<Loader />}>
                  <AddCategory />
                </Suspense>
              }
            />
            <Route
              path="/category/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <UpdateCategory />
                </Suspense>
              }
            />

            {/* //////// routes for Brands/////////// */}

            <Route
              path="/brand"
              element={
                <Suspense fallback={<Loader />}>
                  <Brands />
                </Suspense>
              }
            />
            <Route
              path="/addBrand"
              element={
                <Suspense fallback={<Loader />}>
                  <AddBrand />
                </Suspense>
              }
            />
            <Route
              path="/brand/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <UpdateBrand />
                </Suspense>
              }
            />
            {/* //////// routes for Brands/////////// */}

            <Route
              path="/posters"
              element={
                <Suspense fallback={<Loader />}>
               <RegisteredUsers/>
                </Suspense>
              }
            />
             <Route
              path="/posters"
              element={
                <Suspense fallback={<Loader />}>
                  <Posters />
                </Suspense>
              }
            />
             <Route
              path="/promo"
              element={
                <Suspense fallback={<Loader />}>
                  <Promo />
                </Suspense>
              }
            />
           <Route
              path="/addPromo"
              element={
                <Suspense fallback={<Loader />}>
                  <AddPromo />
                </Suspense>
              }
            />

            {/* routes for technologies */}

            {/* <Route path="/technologies" element={<Technologies />} />

            <Route
              path="/technologyform"
              element={
                <Suspense fallback={<Loader />}>
                  <TechnologiesForm />
                </Suspense>
              }
            />

            <Route
              path="/technologyform/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <TechnologyUpdateForm />
                </Suspense>
              }
            /> */}

            {/* routes for testimonials */}

            {/* <Route
              path="/testimonials"
              element={
                <Suspense fallback={<Loader />}>
                  <Testimonials />
                </Suspense>
              }
            />
            <Route
              path="/addPoster"
              element={
                <Suspense fallback={<Loader />}>
                  <AddPoster />
                </Suspense>
              }
            />
            <Route
              path="/poster/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <UpdatePoster />
                </Suspense>
              }
            />
            {/* //////// routes for User/////////// */}

            <Route
              path="/users"
              element={
                <Suspense fallback={<Loader />}>
                  <RegisteredUsers />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
