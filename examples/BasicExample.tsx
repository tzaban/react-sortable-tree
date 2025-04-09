import React, { useState } from 'react';
import { SortableTree } from '../src';
import { TreeNode } from '../src/types';

const initialTreeData: TreeNode[] = [
  {
    id: '1',
    title: 'Root Node 1',
    expanded: true,
    children: [
      {
        id: '1-1',
        title: 'Child Node 1-1',
      },
      {
        id: '1-2',
        title: 'Child Node 1-2',
      },
    ],
  },
  {
    id: '2',
    title: 'Root Node 2',
    expanded: true,
    children: [
      {
        id: '2-1',
        title: 'Child Node 2-1',
      },
    ],
  },
];

export const BasicExample: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);

  const handleNodeClick = (node: TreeNode) => {
    console.log('Node clicked:', node);
  };

  const handleNodeExpand = (node: TreeNode) => {
    console.log('Node expanded:', node);
  };

  const handleNodeCollapse = (node: TreeNode) => {
    console.log('Node collapsed:', node);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Sortable Tree Example</h1>
      <div className="border rounded-lg p-4">
        <SortableTree
          treeData={treeData}
          onChange={setTreeData}
          onNodeClick={handleNodeClick}
          onNodeExpand={handleNodeExpand}
          onNodeCollapse={handleNodeCollapse}
        />
      </div>
    </div>
  );
};
