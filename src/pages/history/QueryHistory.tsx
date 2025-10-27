import React, { useState } from 'react';
import { Search, Eye, Play, Calendar, Filter } from 'lucide-react';

interface QueryHistoryItem {
  id: string;
  prompt: string;
  sql: string;
  executionDate: string;
  executionTime: string;
  rowCount: number;
  status: 'success' | 'error';
}

interface QueryDetailModalProps {
  query: QueryHistoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRerun: (query: QueryHistoryItem) => void;
}

const QueryDetailModal: React.FC<QueryDetailModalProps> = ({ query, isOpen, onClose, onRerun }) => {
  if (!isOpen || !query) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-soft max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Query Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Prompt</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">{query.prompt}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Generated SQL</label>
              <pre className="code-editor text-sm text-gray-800 bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {query.sql}
              </pre>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">Execution Date</label>
                <p className="text-gray-900">{query.executionDate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">Execution Time</label>
                <p className="text-gray-900">{query.executionTime}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rows Returned</label>
                <p className="text-gray-900">{query.rowCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onRerun(query)}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Re-run Query
          </button>
        </div>
      </div>
    </div>
  );
};

export const QueryHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<QueryHistoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockQueries: QueryHistoryItem[] = [
    {
      id: '1',
      prompt: 'Show me all customers who made orders in the last 30 days',
      sql: 'SELECT c.customer_name, c.email, COUNT(o.id) as order_count\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)\nGROUP BY c.id\nORDER BY order_count DESC;',
      executionDate: '2023-10-25',
      executionTime: '0.245s',
      rowCount: 147,
      status: 'success'
    },
    {
      id: '2',
      prompt: 'What are the top selling products this month?',
      sql: 'SELECT p.product_name, SUM(oi.quantity) as total_sold, SUM(oi.price * oi.quantity) as revenue\nFROM products p\nJOIN order_items oi ON p.id = oi.product_id\nJOIN orders o ON oi.order_id = o.id\nWHERE MONTH(o.order_date) = MONTH(NOW())\nGROUP BY p.id\nORDER BY total_sold DESC\nLIMIT 10;',
      executionDate: '2023-10-24',
      executionTime: '0.189s',
      rowCount: 10,
      status: 'success'
    },
    {
      id: '3',
      prompt: 'Find customers with no orders in the last 90 days',
      sql: 'SELECT c.customer_name, c.email, MAX(o.order_date) as last_order\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id\nHAVING last_order < DATE_SUB(NOW(), INTERVAL 90 DAY) OR last_order IS NULL;',
      executionDate: '2023-10-23',
      executionTime: '0.312s',
      rowCount: 23,
      status: 'success'
    },
    {
      id: '4',
      prompt: 'Show revenue by category for this quarter',
      sql: 'SELECT cat.category_name, SUM(oi.price * oi.quantity) as revenue\nFROM categories cat\nJOIN products p ON cat.id = p.category_id\nJOIN order_items oi ON p.id = oi.product_id\nJOIN orders o ON oi.order_id = o.id\nWHERE QUARTER(o.order_date) = QUARTER(NOW())\nGROUP BY cat.id;',
      executionDate: '2023-10-22',
      executionTime: '0.156s',
      rowCount: 8,
      status: 'error'
    }
  ];

  const filteredQueries = mockQueries.filter(query =>
    query.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.sql.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (query: QueryHistoryItem) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const handleRerun = (query: QueryHistoryItem) => {
    setIsModalOpen(false);
    console.log('Re-running query:', query);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Query History</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Query Prompt</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Generated SQL</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueries.map((query) => (
                <tr key={query.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <p className="text-gray-900 font-medium">{query.prompt}</p>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {query.sql.split('\n')[0].substring(0, 50)}...
                    </code>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {query.executionDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        query.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {query.status === 'success' ? '✓ Success' : '✗ Error'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(query)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleRerun(query)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-accent rounded hover:bg-primary-700 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Re-run
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <QueryDetailModal
        query={selectedQuery}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRerun={handleRerun}
      />
    </div>
  );
};