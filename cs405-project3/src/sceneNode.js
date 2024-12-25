/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * Task 1: Implement the draw function for the SceneNode class.
         */

        const localTransform = this.trs.getTransformationMatrix(); 
        const transformedModelMatrix = MatrixMult(modelMatrix, localTransform);
        const transformedModelView = MatrixMult(modelView, localTransform);
        const transformedNormalMatrix = MatrixMult(normalMatrix, localTransform);

        const transformedMvp = MatrixMult(mvp, localTransform);

        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormalMatrix, transformedModelMatrix);
        }

        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormalMatrix, transformedModelMatrix);
        }
    }
}
