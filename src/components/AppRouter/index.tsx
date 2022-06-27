import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import CitiesPage from '../../pages/CitiesPage';
import CityPage from '../../pages/CityPage';
import NotFound from '../../pages/NotFound';
import AppLayout from '../AppLayout';

const AppRouter: FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<CitiesPage />} />
        <Route path='/:name-:id' element={<CityPage />} />
        <Route element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
