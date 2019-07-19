/**
 * Created by slipkinem on 3/22/2018 at 5:55 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { TreeNode } from 'element-ui/types/tree'

export declare interface PkTreeNode extends TreeNode {
  parent: PkTreeNode
  treeNodeType: any
  data: {
    children: PkTreeNode[]
  }
}
