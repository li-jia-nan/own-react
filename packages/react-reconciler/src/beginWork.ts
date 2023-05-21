import { mountChildFibers, reconcileChildFibers } from './childFiber';
import { FiberNode } from './fiber';
import { processUpdateQueue } from './updateQueue';
import { HostComponent, HostRoot, HostText } from './workTags';

// 递归中的递阶段
export const beginWork = (wip: FiberNode) => {
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip);
    case HostComponent:
      return updateHostComponent(wip);
    case HostText:
      return null;
    default:
      break;
  }
};

function updateHostRoot(wip: FiberNode) {
  const baseState = wip.memoizedState;
  const updateQueue = wip.updateQueue;
  const pending = updateQueue.shared.pending;
  updateQueue.shared.pending = null;
  const { memoizedState } = processUpdateQueue(baseState, pending);
  wip.memoizedState = memoizedState;
  const nextChildren = wip.memoizedState;
  reconcileChildren(wip, nextChildren);
  return wip.child;
}

function updateHostComponent(wip: FiberNode) {
  // 根据element创建fiberNode
  const nextProps = wip.pendingProps;
  const nextChildren = nextProps.children;
  reconcileChildren(wip, nextChildren);
  return wip.child;
}

function reconcileChildren(wip: FiberNode, children: any) {
  const current = wip.alternate;
  if (current !== null) {
    wip.child = reconcileChildFibers(wip, current.child, children);
  } else {
    wip.child = mountChildFibers(wip, null, children);
  }
}
