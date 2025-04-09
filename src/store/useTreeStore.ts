import { create } from 'zustand';
import { TreeNode, TreeState } from '../types';

interface TreeStore extends TreeState {
  setTreeData: (treeData: TreeNode[]) => void;
  setDraggedNode: (node: TreeNode | null) => void;
  setDropTarget: (target: TreeState['dropTarget']) => void;
  updateNode: (nodeId: string, updates: Partial<TreeNode>) => void;
  addNode: (parentId: string | null, node: TreeNode) => void;
  removeNode: (nodeId: string) => void;
}

export const useTreeStore = create<TreeStore>((set) => ({
  treeData: [],
  draggedNode: null,
  dropTarget: null,

  setTreeData: (treeData) => set({ treeData }),
  setDraggedNode: (draggedNode) => set({ draggedNode }),
  setDropTarget: (dropTarget) => set({ dropTarget }),

  updateNode: (nodeId, updates) =>
    set((state) => ({
      treeData: updateNodeInTree(state.treeData, nodeId, updates),
    })),

  addNode: (parentId, node) =>
    set((state) => ({
      treeData: addNodeToTree(state.treeData, parentId, node),
    })),

  removeNode: (nodeId) =>
    set((state) => ({
      treeData: removeNodeFromTree(state.treeData, nodeId),
    })),
}));

// Helper functions for tree operations
function updateNodeInTree(
  tree: TreeNode[],
  nodeId: string,
  updates: Partial<TreeNode>
): TreeNode[] {
  return tree.map((node) => {
    if (node.id === nodeId) {
      return { ...node, ...updates };
    }
    if (node.children) {
      return {
        ...node,
        children: updateNodeInTree(node.children, nodeId, updates),
      };
    }
    return node;
  });
}

function addNodeToTree(
  tree: TreeNode[],
  parentId: string | null,
  newNode: TreeNode
): TreeNode[] {
  if (!parentId) {
    return [...tree, newNode];
  }
  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToTree(node.children, parentId, newNode),
      };
    }
    return node;
  });
}

function removeNodeFromTree(tree: TreeNode[], nodeId: string): TreeNode[] {
  return tree.filter((node) => {
    if (node.id === nodeId) {
      return false;
    }
    if (node.children) {
      node.children = removeNodeFromTree(node.children, nodeId);
    }
    return true;
  });
} 