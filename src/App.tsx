import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';


import EventsForm from './pages/Form/EventsForm';
// import Services from './components/Services';
// import ServicesForm from './pages/Form/ServicesForm';
// import Strategies from './components/Strategies';
// import StrategiesForm from './pages/Form/StrategiesForm';
// import Technologies from './components/Technologies';
// import TechnologiesForm from './pages/Form/TechnologiesForm';
// import Testimonials from './components/Testimonials';
// import TestimonialsForm from './pages/Form/TestimonialsForm';
// import SocialLinks from './components/SocialLinks';
// import SocialLinksForm from './pages/Form/SocialLinksForm';
// import AddContact from './components/AddContact';
// import AddContactForm from './pages/Form/AddContactForm';
// import Projects from './components/Projects';
// import PortfolioForm from './pages/Form/PortfolioForm';
// import Logo from './components/Logo';
import EventUpdateForm from './pages/Form/EventUpdateForm';
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
// import TechnologyUpdateForm from './pages/Form/TechnologyUpdateForm';
// import PortfolioUpdateForm from './pages/Form/PortfolioUpdateForm';
// import TestimonialUpdateForm from './pages/Form/TestimonialUpdateForm';
// import SocialLinksUpdateForm from './pages/Form/SocialLinksUpdateForm';
// import UpdateContactForm from './pages/Form/UpdateContactForm';
// import StrategiesUpdateForm from './pages/Form/StrategiesUpdateForm';
// import ServicesUpdateForm from './pages/Form/ServicesUpdateForm';

// const Profile = lazy(() => import('./pages/Profile'));

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
            <Route index path="/" element={<CategoriesPage />} />

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
                  <OrderDetail   />
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
            {/* //////// routes for User/////////// */}

            <Route
              path="/users"
              element={
                <Suspense fallback={<Loader />}>
               <RegisteredUsers/>
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
              path="/testimonialsform"
              element={
                <Suspense fallback={<Loader />}>
                  <TestimonialsForm />
                </Suspense>
              }
            />
            <Route
              path="/testimonialsform/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <TestimonialUpdateForm />
                </Suspense>
              }
            /> */}

            {/* routes for social links */}
            {/* <Route
              path="/sociallinks"
              element={
                <Suspense fallback={<Loader />}>
                  <SocialLinks />
                </Suspense>
              }
            />
            <Route
              path="/sociallinksform"
              element={
                <Suspense fallback={<Loader />}>
                  <SocialLinksForm />
                </Suspense>
              }
            />
            <Route
              path="/sociallinksform/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <SocialLinksUpdateForm />
                </Suspense>
              }
            /> */}

            {/* routes for add contact */}
            {/* <Route
              path="/addcontact"
              element={
                <Suspense fallback={<Loader />}>
                  <AddContact />
                </Suspense>
              }
            />
            <Route
              path="/addcontactform"
              element={
                <Suspense fallback={<Loader />}>
                  <AddContactForm />
                </Suspense>
              }
            />
            <Route
              path={`/addcontactform/:id`}
              element={
                <Suspense fallback={<Loader />}>
                  <UpdateContactForm />
                </Suspense>
              }
            /> */}
            {/* ///////////// routes for services///////////////// */}
            {/* <Route
              path="/Services"
              element={
                <Suspense fallback={<Loader />}>
                  <Services />
                </Suspense>
              }
            />

            <Route
              path="/servicesform"
              element={
                <Suspense fallback={<Loader />}>
                  <ServicesForm />
                </Suspense>
              }
            />
            <Route
              path="/servicesform/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <ServicesUpdateForm />
                </Suspense>
              }
            /> */}
            {/* ///////////////////// routes for stratigies ////////////////////// */}
            {/* <Route
              path="/strategies"
              element={
                <Suspense fallback={<Loader />}>
                  <Strategies />
                </Suspense>
              }
            />

            <Route
              path="/strategiesform"
              element={
                <Suspense fallback={<Loader />}>
                  <StrategiesForm />
                </Suspense>
              }
            />
            <Route
              path="/strategiesform/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <StrategiesUpdateForm />
                </Suspense>
              }
            /> */}
            {/* /////////////////////////// routes for projects //////////////////////////// */}
            {/* <Route
              path="/projects"
              element={
                <Suspense fallback={<Loader />}>
                  <Projects />
                </Suspense>
              }
            />

            <Route
              path="/projectsform"
              element={
                <Suspense fallback={<Loader />}>
                  <PortfolioForm />
                </Suspense>
              }
            />
            <Route
              path="/projectsform/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <PortfolioUpdateForm />
                </Suspense>
              }
            />

            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <Profile />
                </Suspense>
              }
            />

            <Route
              path="/logo"
              element={
                <Suspense fallback={<Loader />}>
                  <Logo />
                </Suspense>
              }
            /> */}

            {/*  <Route
            path="/calendar"
            element={
              <Suspense fallback={<Loader />}>
                <Calendar />
              </Suspense>
            }
          />

          <Route
            path="/forms/form-elements"
            element={
              <Suspense fallback={<Loader />}>
                <FormElements />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <Suspense fallback={<Loader />}>
                <FormLayout />
              </Suspense>
            }
          />
          <Route
            path="/tables"
            element={
              <Suspense fallback={<Loader />}>
                <Tables />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/chart"
            element={
              <Suspense fallback={<Loader />}>
                <Chart />
              </Suspense>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <Suspense fallback={<Loader />}>
                <Alerts />
              </Suspense>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <Suspense fallback={<Loader />}>
                <Buttons />
              </Suspense>
            }
          /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
