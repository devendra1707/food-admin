import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { addFoods } from '../../services/foodService';

const AddFood = () => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Biryani'
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error('Please select an Image');
      return;
    }

    try {
      await addFoods(data, image);
      toast.success('Food added successfully.')
      setData({ name: '', description: '', category: 'Biryani', price: '' });
      setImage(null)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error adding food';

      toast.error(errorMessage);
    }
  }

  return (
    <div className="mx-2 mt-2">

      <div className="row">
        <div className='card col-md-4'>
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className='form-label'>
                  <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={98} />
                </label>
                <input
                  type="file"
                  className='form-control'
                  id="image"
                  name="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />              </div>

              <div className="mb-3">
                <label htmlFor="name" className='form-label'>Name</label>
                <input type="text" placeholder='Chicken Biryani' className='form-control' id="name" name="name" required onChange={onChangeHandler} value={data.name} />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className='form-label'>Description</label>
                <textarea className='form-control' placeholder='Write content here...' id="description" name="description" rows={3} required onChange={onChangeHandler} value={data.description}></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className='form-label'>Category</label>
                <select
                  className='form-control'
                  id="category"
                  name="category"
                  required
                  onChange={onChangeHandler}
                  value={data.category}
                >                  <option value="Biryani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className='form-label'>Price</label>
                <input type="number" placeholder='&#8377;200' className='form-control' id="name" name="price" required onChange={onChangeHandler} value={data.price} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood