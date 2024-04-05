const express = require('express');
const cameraController = require('../controllers/cameraController');

const router = express.Router();

router.get('/', cameraController.getAllCameras);
router.get('/:id', cameraController.getCameraById);
router.post('/', cameraController.addCamera);
router.put('/:id', cameraController.updateCamera);
router.delete('/:id', cameraController.deleteCamera);
router.get('/nearby', cameraController.getNearbyCameras);
router.get('/details/:id', cameraController.getCameraDetailsById);
router.get('/cameraId/:cameraId', cameraController.getCameraByCameraId);
router.put('/cameraId/:cameraId', cameraController.updateCameraByCameraId);
router.delete('/cameraId/:cameraId', cameraController.deleteCameraByCameraId);
router.get('/details/cameraId/:cameraId', cameraController.getCameraDetailsByCameraId);
router.get('/details/cameraId/:cameraId', cameraController.getCameraDetailsByCameraId);
module.exports = router;
