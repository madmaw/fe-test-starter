import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import {
  useCallback,
  useState,
} from 'react';
import { FormView } from './Form';
import { Readme } from './Readme';
import { type Form } from './schema';

function FormRoute() {
  const [
    data,
    setData,
  ] = useState<Form>({});
  const saveData = useCallback(function (data: Form) {
    setData(data);
    console.log(data);
  }, [setData]);
  return (
    <FormView
      data={data}
      saveData={saveData}
    />
  );
}

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <Readme />,
  },
  {
    path: '/form',
    element: <FormRoute />,
  },
]);

export default function App () {
  return <RouterProvider router={router} />;
}
