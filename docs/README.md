# React Sortable Tree Documentation

## Installation

```bash
npm install @tzaban/react-sortable-tree
# or
yarn add @tzaban/react-sortable-tree
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { SortableTree } from '@tzaban/react-sortable-tree';
import '@tzaban/react-sortable-tree/styles.css';

const MyComponent = () => {
  const [treeData, setTreeData] = useState([
    {
      id: '1',
      title: 'Root Node',
      children: [
        {
          id: '1-1',
          title: 'Child Node',
        },
      ],
    },
  ]);

  return (
    <SortableTree
      treeData={treeData}
      onChange={setTreeData}
    />
  );
};
```

## Props

### SortableTree

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| treeData | TreeNode[] | Yes | The tree data to display |
| onChange | (treeData: TreeNode[]) => void | Yes | Callback when tree data changes |
| onNodeClick | (node: TreeNode) => void | No | Callback when a node is clicked |
| onNodeExpand | (node: TreeNode) => void | No | Callback when a node is expanded |
| onNodeCollapse | (node: TreeNode) => void | No | Callback when a node is collapsed |
| className | string | No | Additional CSS class name |
| style | React.CSSProperties | No | Additional inline styles |

### TreeNode Type

```typescript
interface TreeNode {
  id: string;
  title: string;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
  data?: Record<string, unknown>;
}
```

## Styling

The component uses Tailwind CSS for styling. You can customize the appearance by:

1. Overriding the default styles in your own CSS
2. Using the `className` prop to add custom classes
3. Using the `style` prop for inline styles

## State Management

The component uses Zustand for state management. You can access the tree state using the `useTreeStore` hook:

```tsx
import { useTreeStore } from '@tzaban/react-sortable-tree';

const MyComponent = () => {
  const { treeData, updateNode } = useTreeStore();

  // Use the store methods to modify the tree
  const handleUpdate = () => {
    updateNode('node-id', { title: 'New Title' });
  };

  return <button onClick={handleUpdate}>Update Node</button>;
};
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT 