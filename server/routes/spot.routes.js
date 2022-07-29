const SpotController = require('../controllers/spot.controller');

module.exports = (app) => {
    app.get('/api/test', SpotController.testApi);
    app.get('/api/spots', SpotController.allSpots);
    app.get('/api/spots/:id', SpotController.getSpot);
    app.get('/api/spots/zip/:zipCode', SpotController.getSpotByZipCode);
    app.get('/api/spots/neighborhood/:neighborhood', SpotController.getSpotByNeighborhood);
    app.post('/api/spots', SpotController.addSpot);
    app.put('/api/spots/:id', SpotController.updateSpot);
    app.delete('/api/spots/:id', SpotController.deleteSpot);
}