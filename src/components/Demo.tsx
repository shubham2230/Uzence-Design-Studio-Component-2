import React, { useState, useEffect } from 'react';
import { DataTable } from './DataTable';
import { Column } from '../types/DataTable';

// Sample data type - YOU CAN MODIFY THIS TO MATCH YOUR DATA
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

// Sample data - YOU CAN REPLACE THIS WITH YOUR OWN DATA
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', lastLogin: '2024-01-12' },
];

// Column definitions - YOU CAN MODIFY THESE TO MATCH YOUR DATA STRUCTURE
const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
];

export function Demo() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showSelectable, setShowSelectable] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(sampleUsers);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRowSelect = (selectedRows: User[]) => {
    setSelectedUsers(selectedRows);
  };

  const handleRefresh = () => {
    setLoading(true);
    setUsers([]);
    setTimeout(() => {
      setUsers(sampleUsers);
      setLoading(false);
    }, 1000);
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  // Function to add new user - YOU CAN USE THIS TO ADD YOUR OWN DATA
  const addNewUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: `New User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      role: 'User',
      status: 'active',
      lastLogin: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Data Table Component Demo
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive data table with sorting, selection, and responsive design
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh Data
            </button>
            
            <button
              onClick={addNewUser}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add New User
            </button>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showSelectable}
                onChange={(e) => setShowSelectable(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
              />
              Enable Row Selection
            </label>

            {showSelectable && selectedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedUsers.length} row(s) selected
                </span>
                <button
                  onClick={handleClearSelection}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Users Table</h2>
            <p className="text-sm text-gray-600 mt-1">
              Click on column headers to sort. {showSelectable && 'Use checkboxes to select rows.'}
            </p>
          </div>
          
          <DataTable
            data={users}
            columns={columns}
            loading={loading}
            selectable={showSelectable}
            onRowSelect={handleRowSelect}
          />
        </div>

        {/* Selected Data Display */}
        {showSelectable && selectedUsers.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Users</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedUsers.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.role}</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to Customize Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">🚀 How to Customize with Your Own Data</h3>
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <strong>1. Modify the Data Type:</strong> Change the `User` interface to match your data structure
            </div>
            <div>
              <strong>2. Replace Sample Data:</strong> Update the `sampleUsers` array with your actual data
            </div>
            <div>
              <strong>3. Update Columns:</strong> Modify the `columns` array to match your data fields
            </div>
            <div>
              <strong>4. Add Data Sources:</strong> Connect to APIs, databases, or other data sources
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-blue-600 text-2xl mb-2">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Column Sorting</h3>
            <p className="text-gray-600 text-sm">
              Click on sortable column headers to sort data in ascending, descending, or no order.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-blue-600 text-2xl mb-2">✅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Row Selection</h3>
            <p className="text-gray-600 text-sm">
              Select individual rows or use the select-all checkbox to manage multiple selections.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-blue-600 text-2xl mb-2">♿</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Accessibility</h3>
            <p className="text-gray-600 text-sm">
              Full ARIA support, keyboard navigation, and screen reader compatibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
