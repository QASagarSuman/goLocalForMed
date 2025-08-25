import React from 'react';
import { Clock, MapPin, Truck } from 'lucide-react';
import { Quote } from '../../types';

interface QuotesListProps {
  quotes: Quote[];
  onAcceptQuote: (quoteId: string, quoteType: 'delivery' | 'pickup') => void;
}

const QuotesList: React.FC<QuotesListProps> = ({ quotes, onAcceptQuote }) => {
  if (quotes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No quotes received yet. Pharmacies will respond shortly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <div key={quote.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {quote.pharmacy?.pharmacy_name || 'Pharmacy'}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{quote.pharmacy?.address}</span>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{quote.estimated_delivery_time}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Delivery Option */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Delivery</span>
                </div>
                <span className="text-xl font-bold text-blue-600">₹{quote.delivery_price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Delivered to your doorstep in {quote.estimated_delivery_time}
              </p>
              <button
                onClick={() => onAcceptQuote(quote.id, 'delivery')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Accept Delivery
              </button>
            </div>

            {/* Pickup Option */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Pickup</span>
                </div>
                <span className="text-xl font-bold text-green-600">₹{quote.pickup_price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Collect from pharmacy at your convenience
              </p>
              <button
                onClick={() => onAcceptQuote(quote.id, 'pickup')}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Accept Pickup
              </button>
            </div>
          </div>

          {quote.notes && (
            <div className="bg-gray-50 rounded-md p-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Note:</span> {quote.notes}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuotesList;