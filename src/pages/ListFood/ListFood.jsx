import React, { useEffect, useState } from 'react'
import './ListFood.css';
import { toast } from 'react-toastify';
import { deleteFood, getFoodList } from '../../services/foodService';

const ListFood = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
       console.error(error);
      toast.error(error.message || 'Error while reading the foods ')
    }
  }

  const removedFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);

      if (success) {
        toast.success('Food removed successfully');

        // Update UI without reloading
        setList((prevList) =>
          prevList.filter((item) => item.id !== foodId)
        );
      } else {
        toast.error('Error while removing the food');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Error while reading the foods');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-l1 card">
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.image_url} height={48} width={48} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>&#8377;{item.price}.00</td>
                    <td className='text-danger'>
                      <i className='bi bi-x-circle-fill' onClick={() => removedFood(item.id)}></i>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ListFood