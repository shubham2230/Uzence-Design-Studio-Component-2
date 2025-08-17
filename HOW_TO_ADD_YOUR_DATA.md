# How to Add Your Own Data to the DataTable

## Quick Start Guide

### 1. Define Your Data Structure
First, create an interface that describes your data:

```typescript
interface YourDataType {
  id: string;
  name: string;
  email: string;
  age: number;
  // Add any other fields you need
}
```

### 2. Create Your Data
Add your actual data as an array:

```typescript
const yourData: YourDataType[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  // Add more rows...
];
```

### 3. Define Your Columns
Create columns that match your data structure:

```typescript
const yourColumns: Column<YourDataType>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];
```

### 4. Use the DataTable
Now you can use your data:

```typescript
<DataTable
  data={yourData}
  columns={yourColumns}
  selectable={true}
  onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
/>
```

## Real Examples

### Example 1: Products
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 'P1', name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 'P2', name: 'Mouse', price: 29, category: 'Electronics' },
];

const productColumns: Column<Product>[] = [
  { key: 'id', title: 'Product ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { key: 'price', title: 'Price ($)', dataIndex: 'price', sortable: true },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
];
```

### Example 2: Students
```typescript
interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  gpa: number;
}

const students: Student[] = [
  { studentId: 1001, firstName: 'Alice', lastName: 'Johnson', gpa: 3.8 },
  { studentId: 1002, firstName: 'Bob', lastName: 'Smith', gpa: 3.5 },
];

const studentColumns: Column<Student>[] = [
  { key: 'studentId', title: 'Student ID', dataIndex: 'studentId', sortable: true },
  { key: 'firstName', title: 'First Name', dataIndex: 'firstName', sortable: true },
  { key: 'lastName', title: 'Last Name', dataIndex: 'lastName', sortable: true },
  { key: 'gpa', title: 'GPA', dataIndex: 'gpa', sortable: true },
];
```

## Column Options

Each column can have these properties:

- `key`: Unique identifier for the column
- `title`: What users see in the header
- `dataIndex`: Which field from your data to display
- `sortable`: Whether users can sort by this column (default: false)

## Data Sources

You can get your data from:

1. **Static arrays** (like the examples above)
2. **API calls** using fetch or axios
3. **Database queries** if using a backend
4. **File uploads** (CSV, Excel, etc.)
5. **User input** (forms, etc.)

## Example with API Data

```typescript
const [data, setData] = useState<YourDataType[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('/api/your-data')
    .then(response => response.json())
    .then(data => {
      setData(data);
      setLoading(false);
    });
}, []);

<DataTable
  data={data}
  columns={yourColumns}
  loading={loading}
  selectable={true}
/>
```

## Tips

1. **Start simple**: Begin with a few basic fields
2. **Use meaningful titles**: Make column headers clear for users
3. **Enable sorting** on important columns
4. **Test with real data**: Make sure your data structure works
5. **Handle loading states**: Show loading indicators while fetching data

## Need Help?

Check out the `CustomDataExamples.tsx` file in the `src/components` folder to see working examples with different data types!

