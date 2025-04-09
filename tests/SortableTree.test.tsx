import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortableTree } from '../src';
import { TreeNode } from '../src/types';

const mockTreeData: TreeNode[] = [
  {
    id: '1',
    title: 'Root Node',
    expanded: true,
    children: [
      {
        id: '1-1',
        title: 'Child Node',
      },
    ],
  },
];

describe('SortableTree', () => {
  it('renders tree nodes correctly', () => {
    render(<SortableTree treeData={mockTreeData} onChange={() => {}} />);

    expect(screen.getByText('Root Node')).toBeInTheDocument();
    expect(screen.getByText('Child Node')).toBeInTheDocument();
  });

  it('handles node click events', () => {
    const handleNodeClick = vi.fn();
    render(
      <SortableTree treeData={mockTreeData} onChange={() => {}} onNodeClick={handleNodeClick} />
    );

    fireEvent.click(screen.getByText('Root Node'));
    expect(handleNodeClick).toHaveBeenCalledWith(mockTreeData[0]);
  });

  it('handles expand/collapse events', () => {
    const handleNodeExpand = vi.fn();
    const handleNodeCollapse = vi.fn();
    render(
      <SortableTree
        treeData={mockTreeData}
        onChange={() => {}}
        onNodeExpand={handleNodeExpand}
        onNodeCollapse={handleNodeCollapse}
      />
    );

    const expandButton = screen.getByRole('button');
    fireEvent.click(expandButton);
    expect(handleNodeCollapse).toHaveBeenCalledWith(mockTreeData[0]);

    fireEvent.click(expandButton);
    expect(handleNodeExpand).toHaveBeenCalledWith(mockTreeData[0]);
  });
});
