import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { addTopicAsync } from './topicSlice';

const AddTopicForm = () => {
  const { token } = useSelector((state) => state.user);
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();
  const submitButton = useRef();

  const handleInput = (e) => {
    if (e.target.id === 'label') {
      setLabel(e.target.value);
    } else {
      setIcon(e.target.value);
    }
  };

  const clearForm = () => {
    setLabel('');
    setIcon('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    dispatch(addTopicAsync({ token, body: { label, icon } }))
      .unwrap()
      .then(({ data }) => {
        toast.success(`${data.label} created successfully.`);
        clearForm();
        submitButton.disabled = false;
      })
      .catch((error) => {
        toast.error(error.message);
        submitButton.disabled = false;
      });
  };

  return (
    <form className="w-fit self-center" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center md:flex-row gap-2 py-2 mx-auto">
        <input onChange={(e) => handleInput(e)} className="px-4 py-2 rounded font-semibold w-full md:w-48 bg-lime-600 text-white border-2 border-white placeholder:text-white focus:outline-none appearance-none" type="text" placeholder="label" aria-label="label" id="label" value={label} />
        <input onChange={(e) => handleInput(e)} className="px-4 py-2 rounded font-semibold w-full md:w-48 bg-lime-600 text-white border-2 border-white placeholder:text-white focus:outline-none appearance-none" type="url" placeholder="icon" aria-label="icon" id="icon" value={icon} />
        <button type="submit" ref={submitButton} className="bg-white text-lime-500 hover:bg-transparent hover:text-white hover:border-white px-6 py-2 rounded-full font-semibold w-32 transition-colors border-2 border-transparent">ADD</button>
      </div>
    </form>
  );
};

export default AddTopicForm;
