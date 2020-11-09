import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // if number, then covert
    let { value, name } = e.target;
    if (typeof value === 'number') {
      value = parseInt(value);
    }

    setValues({
      // copy existing value into it
      ...values,
      // update if value changes
      [name]: value,
    });
  }

  return { values, updateValue };
}
