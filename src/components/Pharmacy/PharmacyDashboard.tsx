import React, { useState, useEffect } from 'react';
import { Bell, Clock, CheckCircle, FileText, MapPin } from 'lucide-react';
import { MedicineRequest, Quote } from '../../types';
import QuoteForm from './QuoteForm';

const PharmacyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'quotes'>('requests');
  const [requests, setRequests] = useState<MedicineRequest[]>([]);
  const [myQuotes, setMyQuotes] = useState<Quote[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<MedicineRequest | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockRequests: MedicineRequest[] = [
      {
        id: '1',
        customer_id: 'customer1',
        manual_medicines: ['Paracetamol 500mg x2', 'Vitamin D3 x1'],
        radius: 5,
        customer_latitude: 40.7128,
        customer_longitude: -74.0060,
        customer_address: '123 Main St, New York, NY',
        status: 'pending',
        created_at: new Date().toISOString(),
        customer: {
          id: 'customer1',
          email: 'john@example.com',
          full_name: 'John Doe',
          phone: '+1234567890',
          user_type: 'customer',
          address: '123 Main St, New York, NY',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: '2',
        customer_id: 'customer2',
        prescription_image_url: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600',
        radius: 10,
        customer_latitude: 40.7150,
        customer_longitude: -74.0080,
        customer_address: '456 Oak Ave, New York, NY',
        status: 'pending',
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        customer: {
          id: 'customer2',
          email: 'jane@example.com',
          full_name: 'Jane Smith',
          phone: '+1234567891',
          user_type: 'customer',
          address: '456 Oak Ave, New York, NY',
          created_at: new Date().toISOString(),
        },
      },
    ];

    setRequests(mockRequests);
  }, []);

  const handleCreateQuote = async (requestId: string, quoteData: any) => {
    const newQuote: Quote = {
      id: Date.now().toString(),
      request_id: requestId,
      pharmacy_id: 'current_pharmacy_id',
      delivery_price: quoteData.deliveryPrice,
      pickup_price: quoteData.pickupPrice,
      estimated_delivery_time: quoteData.estimatedTime,
      notes: quoteData.notes,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    setMyQuotes(prev => [newQuote, ...prev]);
    
    // Update request status
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'quoted' as const }
        : req
    ));

    setShowQuoteForm(false);
    setSelectedRequest(null);
  };

  const handleQuoteRequest = (request: MedicineRequest) => {
    setSelectedRequest(request);
    setShowQuoteForm(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'quoted': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'accepted': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // Simplified distance calculation - in real app, use proper geolocation
    return (Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2)) * 100; // Mock distance in km
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage incoming requests and your quotes</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
          <Bell className="h-5 w-5" />
          <span className="font-medium">{requests.filter(r => r.status === 'pending').length} New Requests</span>
        </div>
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
            New Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quotes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Quotes ({myQuotes.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'requests' ? (
        <div className="space-y-4">
          {requests.map((request) => {
            const distance = calculateDistance(
              40.7140, -74.0070, // Mock pharmacy location
              request.customer_latitude,
              request.customer_longitude
            );

            return (
              <div
                key={request.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <span className="font-semibold text-gray-900 capitalize">{request.status}</span>
                    {request.status === 'pending' && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">New</span>
                    )}
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{distance.toFixed(1)} km away</span>
                    </div>
                    <p>{new Date(request.created_at).toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                    <p className="text-sm text-gray-600">{request.customer?.full_name}</p>
                    <p className="text-sm text-gray-600">{request.customer?.phone}</p>
                    <p className="text-sm text-gray-600">{request.customer_address}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Request Details</h4>
                    {request.manual_medicines && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">Medicines:</span>
                        <ul className="mt-1 space-y-1">
                          {request.manual_medicines.map((medicine, index) => (
                            <li key={index} className="text-sm text-gray-600">• {medicine}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {request.prescription_image_url && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">Prescription:</span>
                        <div className="mt-2">
                          <img
                            src={request.prescription_image_url}
                            alt="Prescription"
                            className="w-32 h-24 object-cover rounded border cursor-pointer hover:opacity-80"
                            onClick={() => window.open(request.prescription_image_url, '_blank')}
                          />
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Search Radius:</span> {request.radius}km
                    </p>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleQuoteRequest(request)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Provide Quote
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {requests.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No requests available</p>
              <p className="text-sm">You'll be notified when customers in your area need medicines</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {myQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(quote.status)}
                    <span className="font-semibold text-gray-900 capitalize">{quote.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">Quote ID: {quote.id}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(quote.created_at).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Delivery Price</p>
                  <p className="text-2xl font-bold text-blue-600">₹{quote.delivery_price}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Pickup Price</p>
                  <p className="text-2xl font-bold text-green-600">₹{quote.pickup_price}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Estimated Time: {quote.estimated_delivery_time}</span>
                {quote.notes && (
                  <span className="max-w-xs truncate">Note: {quote.notes}</span>
                )}
              </div>
            </div>
          ))}

          {myQuotes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No quotes submitted yet</p>
              <p className="text-sm">Start responding to customer requests to build your quote history</p>
            </div>
          )}
        </div>
      )}

      {/* Quote Form Modal */}
      {showQuoteForm && selectedRequest && (
        <QuoteForm
          request={selectedRequest}
          onSubmit={(quoteData) => handleCreateQuote(selectedRequest.id, quoteData)}
          onClose={() => {
            setShowQuoteForm(false);
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
};

export default PharmacyDashboard;