import React from 'react';
import { useTreeStore } from '../store/useTreeStore';
import { TreeProps, TreeNode } from '../types';
import { TreeNodeComponent } from './TreeNode';

export const SortableTree: React.FC<TreeProps> = ({
  treeData,
  onChange,
  onNodeClick,
  onNodeExpand,
  onNodeCollapse,
  className = '',
  style,
}) => {
  const { setTreeData } = useTreeStore();

  React.useEffect(() => {
    setTreeData(treeData);
  }, [treeData, setTreeData]);

  const handleNodeClick = (node: TreeNode) => {
    onNodeClick?.(node);
  };

  const handleNodeExpand = (node: TreeNode) => {
    const newTreeData = [...treeData];
    const nodeIndex = newTreeData.findIndex(n => n.id === node.id);
    if (nodeIndex !== -1) {
      newTreeData[nodeIndex] = { ...node, expanded: true };
      onChange(newTreeData);
    }
    onNodeExpand?.(node);
  };

  const handleNodeCollapse = (node: TreeNode) => {
    const newTreeData = [...treeData];
    const nodeIndex = newTreeData.findIndex(n => n.id === node.id);
    if (nodeIndex !== -1) {
      newTreeData[nodeIndex] = { ...node, expanded: false };
      onChange(newTreeData);
    }
    onNodeCollapse?.(node);
  };

  return (
    <div className={`react-sortable-tree ${className}`} style={style}>
      {treeData.map(node => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          onNodeClick={handleNodeClick}
          onNodeExpand={handleNodeExpand}
          onNodeCollapse={handleNodeCollapse}
        />
      ))}
    </div>
  );
};
