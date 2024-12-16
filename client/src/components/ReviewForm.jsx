import React, { useState } from 'react';
import { useServices } from '../context/ServiceContex';
import Swal from 'sweetalert2';

const ServiceReviewModal = ({ 
  isOpen, 
  onClose, 
  orderId, 
  userId,
  serviceName 
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { createReview } = useServices();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pilih rating terlebih dahulu!'
      });
      return;
    }

    try {
      await createReview({
        orderId,
        userId,
        rating,
        comment
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Terimakasih atas feedbacknya!'
      }).then(() => {
        window.location.reload();
      })
      
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal mengirim review!'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 ">
        <h2 className="text-2xl font-bold mb-4">Review {serviceName}</h2>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-3xl mx-1 ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comment</label>
            <textarea
              className="w-full border rounded p-2"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#6051c2] text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceReviewModal;