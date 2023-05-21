import type { Props, Key, Ref } from 'shared/ReactTypes';
import type { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from './hostConfig';

export class FiberNode {
  tag: WorkTag;
  key: Key;
  pendingProps: Props | null;
  momeizedProps: Props | null;
  momeizedState: any;
  stateNode: any;
  type: null;
  ref: Ref;
  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  alternate: FiberNode | null;
  flags: Flags;
  updataQueue: unknown;
  index: number;
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    this.stateNode = null;
    this.type = null;

    // 构成树结构
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;
    this.ref = null;

    // 作为工作单元
    this.pendingProps = pendingProps;
    this.momeizedProps = null;
    this.momeizedState = null;
    this.alternate = null;
    this.updataQueue = null;

    // 副作用
    this.flags = NoFlags;
  }
}

export class FiberRootNode {
  container: Container;
  current: FiberNode;
  finishedWork: FiberNode | null;
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container;
    this.current = hostRootFiber;
    hostRootFiber.stateNode = this;
    this.finishedWork = null;
  }
}

export const createWorkInProgress = (current: FiberNode, pendingProps: Props): FiberNode => {
  let wip = current.alternate;

  if (wip === null) {
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.type = current.type;
    wip.stateNode = current.stateNode;
    wip.alternate = current;
    current.alternate = wip;
  } else {
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
  }
  wip.type = current.type;
  wip.updataQueue = current.updataQueue;
  wip.child = current.child;
  wip.momeizedProps = current.momeizedProps;
  wip.momeizedState = current.momeizedState;
  return wip;
};
