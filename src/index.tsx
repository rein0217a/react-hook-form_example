import React from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './styles.css';
import { Input } from './Input';

function App() {
  const schema = z.object({
    firstName: z
      .string()
      .min(1, { message: 'firstName Required' })
      .max(2, 'firstName max 2'),
    lastName: z
      .string()
      .min(1, { message: 'lastName Required' })
      .max(5, 'lastName max 5'),
  });
  const methods = useForm({
    mode: 'all', // 	Validation is triggered on both blur and change events.
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: unknown) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className='App'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input name={'firstName'} placeholder='firstName' />
          <Input name={'lastName'} placeholder='lastName' />
          <input type='submit' />
        </form>
      </FormProvider>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
