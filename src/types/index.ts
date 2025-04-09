import { z } from 'zod';

export const TreeNodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  children: z.array(z.lazy(() => TreeNodeSchema)).optional(),
  expanded: z.boolean().optional(),
  selected: z.boolean().optional(),
  data: z.record(z.unknown()).optional(),
});

export type TreeNode = z.infer<typeof TreeNodeSchema>;

export interface TreeProps {
  treeData: TreeNode[];
  onChange: (treeData: TreeNode[]) => void;
  onNodeClick?: (node: TreeNode) => void;
  onNodeExpand?: (node: TreeNode) => void;
  onNodeCollapse?: (node: TreeNode) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface TreeState {
  treeData: TreeNode[];
  draggedNode: TreeNode | null;
  dropTarget: {
    node: TreeNode;
    position: 'before' | 'after' | 'child';
  } | null;
} 