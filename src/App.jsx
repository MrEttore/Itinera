import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CityList, City, CountryList, Form } from './components';
import { AuthProvider } from './context/AuthContext';
import { CitiesProvider } from './context/CitiesContext';
import {
  Homepage,
  Pricing,
  Product,
  Login,
  AppLayout,
  PageNotFound,
} from './pages';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
