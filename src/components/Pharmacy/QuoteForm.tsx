import React, { useState } from 'react';
import { X, Truck, MapPin, Clock } from 'lucide-react';
import { MedicineRequest } from '../../types';

interface QuoteFormProps {
  request: MedicineRequest;
  onSubmit: (quoteData: any) => void;
  onClose: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ request, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    deliveryPrice: '',
    pickupPrice: '',
    estimatedTime: '2-3 hours',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        deliveryPrice: parseFloat(formData.deliveryPrice),
        pickupPrice: parseFloat(formData.pickupPrice),
        estimatedTime: formData.estimatedTime,
        notes: formData.notes,
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Provide Quote</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Request Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Request Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Customer: {request.customer?.full_name}</p>
                <p className="text-gray-600">Phone: {request.customer?.phone}</p>
                <p className="text-gray-600">Address: {request.customer_address}</p>
              </div>
              <div>
                {request.manual_medicines && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Medicines:</p>
                    <ul className="space-y-1">
                      {request.manual_medicines.map((medicine, index) => (
                        <li key={index} className="text-gray-600">• {medicine}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {request.prescription_image_url && (
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Prescription:</p>
                    <img
                      src={request.prescription_image_url}
                      alt="Prescription"
                      className="w-24 h-18 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pricing Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Truck className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-gray-900">Delivery Option</h4>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Price (₹)
                  </label>
                  <input
                    type="number"
                    name="deliveryPrice"
                    value={formData.deliveryPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter delivery price"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include medicine cost + delivery charges
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-medium text-gray-900">Pickup Option</h4>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Price (₹)
                  </label>
                  <input
                    type="number"
                    name="pickupPrice"
                    value={formData.pickupPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter pickup price"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Medicine cost only (no delivery charges)
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated Time */}
            <div>
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-orange-600 mr-2" />
                <label className="block text-sm font-medium text-gray-700">
                  Estimated Delivery Time
                </label>
              </div>
              <select
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1-2 hours">1-2 hours</option>
                <option value="2-3 hours">2-3 hours</option>
                <option value="3-4 hours">3-4 hours</option>
                <option value="4-6 hours">4-6 hours</option>
                <option value="Same day">Same day</option>
                <option value="Next day">Next day</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special instructions, availability notes, or additional information..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Quote'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;