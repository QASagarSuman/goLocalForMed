import React, { useState, useEffect } from 'react';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { MedicineRequest, Quote } from '../../types';
import RequestForm from './RequestForm';
import QuotesList from './QuotesList';

const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'quotes'>('requests');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requests, setRequests] = useState<MedicineRequest[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockRequests: MedicineRequest[] = [
      {
        id: '1',
        customer_id: 'user1',
        manual_medicines: ['Paracetamol 500mg', 'Vitamin D3'],
        radius: 5,
        customer_latitude: 40.7128,
        customer_longitude: -74.0060,
        customer_address: '123 Main St, New York, NY',
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    ];

    const mockQuotes: Quote[] = [
      {
        id: '1',
        request_id: '1',
        pharmacy_id: 'pharmacy1',
        delivery_price: 250,
        pickup_price: 200,
        estimated_delivery_time: '2-3 hours',
        notes: 'All medicines available in stock',
        status: 'pending',
        created_at: new Date().toISOString(),
        pharmacy: {
          id: 'pharmacy1',
          email: 'city@pharmacy.com',
          full_name: 'City Pharmacy',
          phone: '+1234567890',
          user_type: 'pharmacy',
          pharmacy_name: 'City Pharmacy',
          license_number: 'PH123456',
          address: '456 Pharmacy St, New York, NY',
          latitude: 40.7150,
          longitude: -74.0080,
          verified: true,
          operating_hours: '9 AM - 9 PM',
          created_at: new Date().toISOString(),
        },
      },
    ];

    setRequests(mockRequests);
    setQuotes(mockQuotes);
  }, []);

  const handleCreateRequest = async (requestData: any) => {
    const newRequest: MedicineRequest = {
      id: Date.now().toString(),
      customer_id: 'current_user_id',
      prescription_image_url: requestData.prescriptionFile ? URL.createObjectURL(requestData.prescriptionFile) : undefined,
      manual_medicines: requestData.type === 'manual' ? requestData.medicines.map((m: any) => `${m.name} ${m.dosage}`) : undefined,
      radius: requestData.radius,
      customer_latitude: requestData.latitude,
      customer_longitude: requestData.longitude,
      customer_address: requestData.address,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    setRequests(prev => [newRequest, ...prev]);
  };

  const handleAcceptQuote = async (quoteId: string, quoteType: 'delivery' | 'pickup') => {
    // Update quote status and create order
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, status: 'accepted' as const }
        : quote
    ));

    // Update request status
    const quote = quotes.find(q => q.id === quoteId);
    if (quote) {
      setRequests(prev => prev.map(req => 
        req.id === quote.request_id 
          ? { ...req, status: 'accepted' as const }
          : req
      ));
    }

    alert(`Quote accepted for ${quoteType}!`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'quoted': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'accepted': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your medicine requests and quotes</p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'requests'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quotes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Received Quotes ({quotes.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'requests' ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedRequestId(request.id);
                setActiveTab('quotes');
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(request.status)}
                    <span className="font-semibold text-gray-900 capitalize">{request.status}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Address:</span> {request.customer_address}
                  </p>
                  
                  {request.manual_medicines && (
                    <div className="mb-2">
                      <span className="font-medium text-sm text-gray-700">Medicines:</span>
                      <ul className="mt-1 space-y-1">
                        {request.manual_medicines.map((medicine, index) => (
                          <li key={index} className="text-sm text-gray-600 ml-4">• {medicine}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {request.prescription_image_url && (
                    <p className="text-sm text-blue-600">📄 Prescription uploaded</p>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500">{request.radius}km radius</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No requests yet</p>
              <p className="text-sm">Create your first medicine request to get started</p>
            </div>
          )}
        </div>
      ) : (
        <QuotesList 
          quotes={selectedRequestId ? quotes.filter(q => q.request_id === selectedRequestId) : quotes}
          onAcceptQuote={handleAcceptQuote}
        />
      )}

      {/* Request Form Modal */}
      {showRequestForm && (
        <RequestForm
          onSubmit={handleCreateRequest}
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;