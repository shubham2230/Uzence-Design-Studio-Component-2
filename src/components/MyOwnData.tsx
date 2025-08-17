import React, { useState } from 'react';
import { DataTable } from './DataTable';
import { Column } from '../types/DataTable';

// STEP 1: Define your own data structure
interface MyData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

// STEP 2: Create your own data
const myData: MyData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15 10:30 AM' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14 02:15 PM' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-10 09:45 AM' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending', lastLogin: '2024-01-12 11:20 AM' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15 08:00 AM' },
];

// STEP 3: Define your columns
const myColumns: Column<MyData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
];

export function MyOwnData() {
  const [data, setData] = useState<MyData[]>(myData);
  const [selectedRows, setSelectedRows] = useState<MyData[]>([]);
  
  // Form state for adding new data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active' as 'active' | 'inactive' | 'pending'
  });

  const handleRowSelect = (selectedRows: MyData[]) => {
    setSelectedRows(selectedRows);
  };

  // Function to handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to add your own custom data
  const addNewData = () => {
    // Validate that all fields are filled
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill in all fields (Name, Email, and Role are required)');
      return;
    }

    const newRow: MyData = {
      id: String(data.length + 1),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      lastLogin: new Date().toLocaleString()
    };

    setData([...data, newRow]);
    
    // Clear the form
    setFormData({
      name: '',
      email: '',
      role: '',
      status: 'active'
    });
  };

  // Function to add random data (keeping the old function)
  const addCustomRow = () => {
    const newRow: MyData = {
      id: String(data.length + 1),
      name: `User ${data.length + 1}`,
      email: `user${data.length + 1}@example.com`,
      role: ['Admin', 'User', 'Manager'][Math.floor(Math.random() * 3)],
      status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as 'active' | 'inactive' | 'pending',
      lastLogin: new Date().toLocaleString()
    };
    setData([...data, newRow]);
  };

  // Function to clear all data
  const clearData = () => {
    setData([]);
    setSelectedRows([]);
  };

  // Function to reset to original data
  const resetData = () => {
    setData(myData);
    setSelectedRows([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            My Own Data Example
          </h1>
          <p className="text-lg text-gray-600">
            This shows exactly how to add your own data to the DataTable
          </p>
        </div>

        {/* Step-by-step instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">📝 How to Add Your Own Data</h2>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              <div>
                <strong>Edit the interface:</strong> Change the `MyData` interface above to match your data structure
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              <div>
                <strong>Replace the data:</strong> Change the `myData` array with your actual data
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              <div>
                <strong>Update columns:</strong> Modify the `myColumns` array to match your data fields
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
              <div>
                <strong>That's it!</strong> Your data will automatically appear in the table below
              </div>
            </div>
          </div>
        </div>

        {/* Add New Data Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">➕ Add New Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter role"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <button
            onClick={addNewData}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={addCustomRow}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Random Row
            </button>
            
            <button
              onClick={clearData}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear All Data
            </button>
            
            <button
              onClick={resetData}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset to Original
            </button>
            
            <span className="text-sm text-gray-600">
              {data.length} total rows
            </span>
          </div>
        </div>

        {/* Your Data Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Your Data Table</h2>
            <p className="text-sm text-gray-600 mt-1">
              This table shows YOUR data. Click on column headers to sort. Use checkboxes to select rows.
            </p>
          </div>
          
          <DataTable
            data={data}
            columns={myColumns}
            selectable={true}
            onRowSelect={handleRowSelect}
          />
        </div>

        {/* Selected Data Display */}
        {selectedRows.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Selected Rows ({selectedRows.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedRows.map((row, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900">{row.name}</div>
                  <div className="text-sm text-gray-600">{row.email}</div>
                  <div className="text-sm text-gray-500">Role: {row.role}</div>
                  <div className="text-sm text-gray-500">Status: {row.status}</div>
                  <div className="text-sm text-gray-500">Last Login: {row.lastLogin}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Example */}
        <div className="mt-8 bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">💻 Your Code Structure</h3>
          <div className="text-sm text-gray-300 space-y-4">
            <div>
              <strong>Your Data Interface:</strong>
              <pre className="bg-gray-800 p-3 rounded mt-2 overflow-x-auto">
{`interface MyData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  // Add your own fields here!
}`}
              </pre>
            </div>
            <div>
              <strong>Your Data Array:</strong>
              <pre className="bg-gray-800 p-3 rounded mt-2 overflow-x-auto">
{`const myData: MyData[] = [
  { id: '1', name: 'Your Name', email: 'your@email.com', role: 'Your Role', status: 'active', lastLogin: '2024-01-15 10:30 AM' },
  // Add more of your data here!
];`}
              </pre>
            </div>
            <div>
              <strong>Your Columns:</strong>
              <pre className="bg-gray-800 p-3 rounded mt-2 overflow-x-auto">
{`const myColumns: Column<MyData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
  // Add more columns for your fields!
];`}
              </pre>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-yellow-900 mb-4">💡 Quick Tips</h3>
          <div className="space-y-2 text-yellow-800">
            <div>• <strong>Field names must match exactly</strong> between your data and columns</div>
            <div>• <strong>Data types:</strong> You can use strings, numbers, dates, booleans, or any other TypeScript types</div>
            <div>• <strong>Sorting:</strong> Set `sortable: true` for columns you want users to be able to sort</div>
            <div>• <strong>Unique IDs:</strong> Each row should have a unique identifier for proper functionality</div>
          </div>
        </div>
      </div>
    </div>
  );
}
