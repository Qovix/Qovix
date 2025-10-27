import React, { useState } from 'react';
import { Search, Play, Code, Table, Loader2 } from 'lucide-react';

interface QueryResult {
  headers: string[];
  rows: any[][];
}

export const Dashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleGenerateSQL = async () => {
    if (!query.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedSQL(`-- Generated SQL from: "${query}"\nSELECT \n  customer_name,\n  order_date,\n  total_amount\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nWHERE order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)\nORDER BY order_date DESC\nLIMIT 50;`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleRunQuery = async () => {
    if (!generatedSQL.trim()) return;
    
    setIsRunning(true);
    setTimeout(() => {
      setQueryResult({
        headers: ['Customer Name', 'Order Date', 'Total Amount'],
        rows: [
          ['John Smith', '2023-10-25', '$1,250.00'],
          ['Sarah Johnson', '2023-10-24', '$875.50'],
          ['Mike Davis', '2023-10-23', '$2,100.75'],
          ['Emily Wilson', '2023-10-22', '$650.25'],
          ['David Brown', '2023-10-21', '$1,475.00'],
        ]
      });
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ask your data a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleGenerateSQL}
            disabled={!query.trim() || isGenerating}
            className="px-6 py-3 bg-[#bc3a08] text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Code className="w-4 h-4" />
            )}
            Generate SQL
          </button>
          <button
            onClick={handleRunQuery}
            disabled={!generatedSQL.trim() || isRunning}
            className="px-6 py-3 bg-[#bc3a08] text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run Query
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Code className="w-5 h-5 text-accent" />
              Generated SQL
            </h2>
          </div>
          <div className="p-6">
            {generatedSQL ? (
              <pre className="code-editor text-sm text-gray-800 bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {generatedSQL}
              </pre>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Start by asking your data a question.</p>
                <p className="text-sm mt-1">Your generated SQL will appear here.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Table className="w-5 h-5 text-accent" />
              Query Results
            </h2>
          </div>
          <div className="p-6">
            {queryResult ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {queryResult.headers.map((header, index) => (
                        <th key={index} className="text-left py-3 px-4 font-semibold text-gray-900">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-3 px-4 text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Showing 5 of 147 results</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Table className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No query results yet.</p>
                <p className="text-sm mt-1">Run a query to see results here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};