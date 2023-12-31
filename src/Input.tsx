import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

export const Input = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  // focus中か制御
  const [isFocus, setIsFocus] = useState(false);
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error, isTouched }, // 一回でもinputにフォーカスしたか否か
  } = useController({
    name,
    control,
    rules:{
      required: true,
      onChange: () => setIsFocus(true),
      onBlur: () => setIsFocus(false),
    }
  });

  return (
    <div>
      <label htmlFor={name}>First Name</label>
      <div className='input_wrapper'>
        {error && isFocus && (
          <p className='error-tooltip'>focus{error.message as string}</p>
        )}
        <input
          placeholder={placeholder}
          {...field}
          onFocus={() => setIsFocus(true)} // focus中か制御
        />
      </div>
      {error && isTouched && !isFocus && (
        <p>not focus{error.message as string}</p>
      )}
    </div>
  );
};
