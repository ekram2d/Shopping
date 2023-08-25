import React from 'react';
import { useForm } from 'react-hook-form';
import useUrl from '../../../CustomHooks/URL/UseUrl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddMenu = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const[url]=useUrl();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`${url}/menu`, {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
      });

      const responseData = await res.json();
     


      if (responseData.InsertedId > 0) {
         
            toast.success(responseData.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  
            });
            // deleteShoppingCart();

           
            
        
           
      } else {
            toast.error(responseData.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
            });
      }
} catch (error) {
      console.error("Error while sending the order:", error);
      toast.error("Error while sending the order. Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
      });
}
  };

  // Category options
  const categoryOptions = ['dessert', 'soup', 'salad', 'pizza', 'drinks'];

  return (
    <div className="w-full flex justify-center items-center bg-gray-100">
      <div className="w-full bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Menu Item</h1>
        <hr />
        <ToastContainer></ToastContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input type="text" className="w-full border text-white border-gray-300 px-3 py-2 rounded" {...register('name', { required: true })} />
            {errors.name && <p className="text-red-500 text-xs mt-1">This field is required</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Image URL</label>
            <input type="text" className="w-full border text-white border-gray-300 px-3 py-2 rounded" {...register('image', { required: true })} />
            {errors.image && <p className="text-red-500 text-xs mt-1">This field is required</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input type="number" step="0.01" className="w-full text-white border border-gray-300 px-3 py-2 rounded" {...register('price', { required: true })} />
            {errors.price && <p className="text-red-500 text-xs mt-1">This field is required</p>}
          </div>
       
          {/* <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">ID</label>
            <input type="text" className="w-full border text-white border-gray-300 px-3 py-2 rounded" {...register('id', { required: true })} />
            {errors.id && <p className="text-red-500 text-xs mt-1">This field is required</p>}
          </div> */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select className="w-full text-white border border-gray-300 px-3 py-2 rounded" {...register('category', { required: true })}>
              <option value="">Select a category</option>
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">Please select a category</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Recipe</label>
            <textarea className="w-full border text-white border-gray-300 px-3 py-2 rounded" {...register('recipe', { required: true })} />
            {errors.recipe && <p className="text-red-500 text-xs mt-1">This field is required</p>}
          </div>
          <div className="mt-4">
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
