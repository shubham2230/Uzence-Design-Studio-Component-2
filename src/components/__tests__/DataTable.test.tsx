import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable } from '../DataTable';
import { Column } from '../../types/DataTable';

// Test data type
interface TestUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Test data
const testUsers: TestUser[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@test.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@test.com', age: 20 },
];

// Test columns
const testColumns: Column<TestUser>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={testUsers} columns={testColumns} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable data={testUsers} columns={testColumns} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={[]} columns={testColumns} loading={true} />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading data')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
    expect(screen.getByLabelText('No data available')).toBeInTheDocument();
  });

  it('handles column sorting', async () => {
    render(<DataTable data={testUsers} columns={testColumns} />);
    
    // Click on sortable column header
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Check if sort indicator appears
    expect(screen.getByText('↑')).toBeInTheDocument();
    
    // Click again to reverse sort
    fireEvent.click(nameHeader);
    expect(screen.getByText('↓')).toBeInTheDocument();
    
    // Click again to remove sort
    fireEvent.click(nameHeader);
    expect(screen.queryByText('↑')).not.toBeInTheDocument();
    expect(screen.queryByText('↓')).not.toBeInTheDocument();
  });

  it('sorts data correctly', () => {
    render(<DataTable data={testUsers} columns={testColumns} />);
    
    // Sort by age ascending
    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader);
    
    // Check if data is sorted (Charlie should be first with age 20)
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Charlie');
    expect(rows[2]).toHaveTextContent('Alice');
    expect(rows[3]).toHaveTextContent('Bob');
  });

  it('handles non-sortable columns', () => {
    render(<DataTable data={testUsers} columns={testColumns} />);
    
    const emailHeader = screen.getByText('Email');
    expect(emailHeader).not.toHaveClass('cursor-pointer');
    
    // Clicking should not trigger sort
    fireEvent.click(emailHeader);
    expect(screen.queryByText('↑')).not.toBeInTheDocument();
  });

  it('enables row selection when selectable is true', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable 
        data={testUsers} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    // Check if select-all checkbox is present
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    expect(selectAllCheckbox).toBeInTheDocument();
    
    // Check if individual row checkboxes are present
    const rowCheckboxes = screen.getAllByLabelText(/Select row \d+/);
    expect(rowCheckboxes).toHaveLength(3);
  });

  it('handles row selection', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable 
        data={testUsers} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    // Select first row
    const firstRowCheckbox = screen.getByLabelText('Select row 1');
    fireEvent.click(firstRowCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith([testUsers[0]]);
  });

  it('handles select all functionality', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable 
        data={testUsers} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    // Select all rows
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    fireEvent.click(selectAllCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(testUsers);
  });

  it('provides proper accessibility attributes', () => {
    render(<DataTable data={testUsers} columns={testColumns} selectable={true} />);
    
    // Check table role and label
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', 'Data table');
    
    // Check sortable column accessibility
    const nameHeader = screen.getByText('Name');
    expect(nameHeader).toHaveAttribute('role', 'button');
    expect(nameHeader).toHaveAttribute('aria-label', 'Sort by Name');
    expect(nameHeader).toHaveAttribute('tabIndex', '0');
    
    // Check row selection accessibility
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    expect(selectAllCheckbox).toBeInTheDocument();
  });

  it('handles keyboard navigation for sorting', () => {
    render(<DataTable data={testUsers} columns={testColumns} />);
    
    const nameHeader = screen.getByText('Name');
    nameHeader.focus();
    
    // Press Enter to sort
    fireEvent.keyDown(nameHeader, { key: 'Enter' });
    expect(screen.getByText('↑')).toBeInTheDocument();
    
    // Press Space to sort again
    fireEvent.keyDown(nameHeader, { key: ' ' });
    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  it('applies visual feedback for selected rows', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable 
        data={testUsers} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={onRowSelect}
      />
    );
    
    // Select first row
    const firstRowCheckbox = screen.getByLabelText('Select row 1');
    fireEvent.click(firstRowCheckbox);
    
    // Check if selected row has visual styling
    const firstRow = firstRowCheckbox.closest('tr');
    expect(firstRow).toHaveClass('bg-blue-50');
    expect(firstRow).toHaveClass('border-l-4');
    expect(firstRow).toHaveClass('border-l-blue-500');
  });

  it('handles null and undefined values gracefully', () => {
    const dataWithNulls: TestUser[] = [
      { id: 1, name: 'Alice', email: null as any, age: 25 },
      { id: 2, name: undefined as any, email: 'bob@test.com', age: 30 },
    ];
    
    render(<DataTable data={dataWithNulls} columns={testColumns} />);
    
    // Should render empty strings for null/undefined values
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('maintains sort state when data changes', () => {
    const { rerender } = render(
      <DataTable data={testUsers} columns={testColumns} />
    );
    
    // Sort by name
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    expect(screen.getByText('↑')).toBeInTheDocument();
    
    // Change data
    const newUsers = [...testUsers, { id: 4, name: 'David', email: 'david@test.com', age: 35 }];
    rerender(<DataTable data={newUsers} columns={testColumns} />);
    
    // Sort state should be maintained
    expect(screen.getByText('↑')).toBeInTheDocument();
  });
});
