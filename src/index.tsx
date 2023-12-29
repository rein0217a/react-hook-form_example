import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './styles.css';

function App() {
  // focus中か制御
  const [isFocus, setIsFocus] = useState(false);
  const schema = z.object({
    firstName: z.string().min(1, { message: 'firstName Required' }),
    lastName: z.string().min(1, { message: 'lastName Required' }),
  });
  const { register, control, handleSubmit } = useForm({
    mode: 'all', // 	Validation is triggered on both blur and change events.
    resolver: zodResolver(schema),
  });
  const {
    formState: { errors },
    fieldState: { isTouched }, // 一回でもinputにフォーカスしたか否か
  } = useController({
    name: 'firstName',
    control,
  });
  const onSubmit = (data:unknown) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='firstName'>First Name</label>
          {errors.firstName && isFocus && (
            <p>focus {errors.firstName.message as string}</p>
          )}
          <input
            placeholder='bill'
            {...register('firstName', {
              required: true,
              maxLength: 2,
              onChange: () => setIsFocus(true),
              onBlur: () => setIsFocus(false),
            })}
            onFocus={() => setIsFocus(true)} // focus中か制御
          />
          {errors.firstName && isTouched && !isFocus && (
            <p>not focus{errors.firstName.message  as string}</p>
          )}
        </div>

        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input
            placeholder='luo'
            {...register('lastName', { required: true })}
          />
          {errors.lastName && <p>{errors.lastName.message  as string}</p>}
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email', {
              required: true,
            })}
            placeholder='bluebill1049@hotmail.com'
          />
          {errors.email && <p>This is required</p>}
        </div>
        <input type='submit' />
      </form>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
