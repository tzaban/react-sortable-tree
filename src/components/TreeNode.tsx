import React from 'react';
import { TreeNode } from '../types';
import { useTreeStore } from '../store/useTreeStore';

interface TreeNodeProps {
  node: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  onNodeExpand: (node: TreeNode) => void;
  onNodeCollapse: (node: TreeNode) => void;
}

export const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  onNodeClick,
  onNodeExpand,
  onNodeCollapse,
}) => {
  const { updateNode } = useTreeStore();
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    onNodeClick(node);
  };

  const handleExpand = () => {
    if (node.expanded) {
      updateNode(node.id, { expanded: false });
      onNodeCollapse(node);
    } else {
      updateNode(node.id, { expanded: true });
      onNodeExpand(node);
    }
  };

  return (
    <div className="tree-node">
      <div className={`node-content ${node.selected ? 'selected' : ''}`} onClick={handleClick}>
        {hasChildren && (
          <button
            className="expand-button"
            onClick={e => {
              e.stopPropagation();
              handleExpand();
            }}
          >
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
        <span className="node-title">{node.title}</span>
      </div>
      {hasChildren && node.expanded && (
        <div className="node-children">
          {node.children?.map(child => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              onNodeClick={onNodeClick}
              onNodeExpand={onNodeExpand}
              onNodeCollapse={onNodeCollapse}
            />
          ))}
        </div>
      )}
    </div>
  );
};
