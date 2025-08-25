import React, { useState } from 'react';
import { Upload, Plus, Trash2, MapPin } from 'lucide-react';

interface RequestFormProps {
  onSubmit: (requestData: any) => void;
  onClose: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSubmit, onClose }) => {
  const [requestType, setRequestType] = useState<'prescription' | 'manual'>('prescription');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', quantity: 1 }]);
  const [radius, setRadius] = useState<5 | 10>(5);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionFile(file);
    }
  };

  const handleMedicineChange = (index: number, field: string, value: string | number) => {
    const newMedicines = [...medicines];
    newMedicines[index] = { ...newMedicines[index], [field]: value };
    setMedicines(newMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', quantity: 1 }]);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        type: requestType,
        prescriptionFile: prescriptionFile,
        medicines: requestType === 'manual' ? medicines : [],
        radius,
        address,
        latitude: 40.7128, // Mock coordinates for NYC
        longitude: -74.0060,
      };

      await onSubmit(requestData);
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create Medicine Request</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Request Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Request Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setRequestType('prescription')}
                  className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                    requestType === 'prescription' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-medium">Upload Prescription</p>
                  <p className="text-sm opacity-75">Upload image or PDF</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType('manual')}
                  className={`flex-1 p-4 border-2 rounded-lg transition-colors ${
                    requestType === 'manual' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Plus className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-medium">Manual Entry</p>
                  <p className="text-sm opacity-75">Type medicines</p>
                </button>
              </div>
            </div>

            {/* Prescription Upload */}
            {requestType === 'prescription' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Prescription
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="prescription-upload"
                  />
                  <label htmlFor="prescription-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {prescriptionFile ? prescriptionFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF up to 10MB</p>
                  </label>
                </div>
              </div>
            )}

            {/* Manual Medicine Entry */}
            {requestType === 'manual' && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Medicines
                  </label>
                  <button
                    type="button"
                    onClick={addMedicine}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Medicine</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {medicines.map((medicine, index) => (
                    <div key={index} className="flex space-x-3 items-end">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Medicine name"
                          value={medicine.name}
                          onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="w-32">
                        <input
                          type="text"
                          placeholder="Dosage"
                          value={medicine.dosage}
                          onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-20">
                        <input
                          type="number"
                          min="1"
                          value={medicine.quantity}
                          onChange={(e) => handleMedicineChange(index, 'quantity', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      {medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicine(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location and Radius */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Radius
                </label>
                <select
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value) as 5 | 10)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                </select>
              </div>
            </div>

            {/* Actions */}
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
                {loading ? 'Creating Request...' : 'Create Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;