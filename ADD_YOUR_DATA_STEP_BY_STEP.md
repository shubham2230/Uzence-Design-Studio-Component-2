# 🚀 Add Your Own Data - Step by Step

## Quick Start (3 Steps)

### Step 1: Open the File
Open `src/components/MyOwnData.tsx` in your editor.

### Step 2: Change the Data Structure
Find this section and modify it for your data:

```typescript
// Change this interface to match your data
interface MyData {
  id: string;
  name: string;        // ← Change this field name
  email: string;       // ← Change this field name  
  age: number;         // ← Change this field name
  city: string;        // ← Change this field name
  // Add more fields here!
}
```

**Example:** If you want to show books instead of people:
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
}
```

### Step 3: Replace the Sample Data
Find this section and put in your actual data:

```typescript
// Replace this with your actual data
const myData: MyData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, city: 'New York' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, city: 'Los Angeles' },
  // Add more rows...
];
```

**Example for books:**
```typescript
const myData: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, genre: 'Fiction' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99, genre: 'Fiction' },
  { id: '3', title: '1984', author: 'George Orwell', price: 11.99, genre: 'Science Fiction' },
];
```

### Step 4: Update the Columns
Find this section and make it match your data fields:

```typescript
// Update this to match your data fields
const myColumns: Column<MyData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },      // ← Change this
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },   // ← Change this
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },         // ← Change this
  { key: 'city', title: 'City', dataIndex: 'city', sortable: true },      // ← Change this
];
```

**Example for books:**
```typescript
const myColumns: Column<Book>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'title', title: 'Book Title', dataIndex: 'title', sortable: true },
  { key: 'author', title: 'Author', dataIndex: 'author', sortable: true },
  { key: 'price', title: 'Price ($)', dataIndex: 'price', sortable: true },
  { key: 'genre', title: 'Genre', dataIndex: 'genre', sortable: true },
];
```

## 🎯 That's It!

1. **Save the file**
2. **Run your app** (`npm run dev`)
3. **Click "My Own Data"** in the navigation
4. **See your data in the table!**

## 📝 Important Notes

- **Field names must match exactly** between your data and columns
- **Each row needs a unique ID**
- **You can use any data types** (strings, numbers, dates, etc.)
- **Set `sortable: true`** for columns you want users to sort

## 🔧 Need Help?

1. **Check the console** for any error messages
2. **Make sure field names match** exactly
3. **Look at the examples** in the "Custom Data Examples" tab
4. **Check the code structure** shown at the bottom of the "My Own Data" page

## 💡 Pro Tips

- **Start simple** with just 2-3 fields
- **Test with a few rows** first
- **Use meaningful column titles** that users will understand
- **Enable sorting** on important columns

Your data will automatically appear in a beautiful, sortable, selectable table! 🎉

