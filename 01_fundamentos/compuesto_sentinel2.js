
var roi = ee.Geometry.Point([-76.53, 3.45]);

var sentinel = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(roi)
  .filterDate('2024-01-01', '2024-06-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

print('Cantidad de imágenes encontradas:', sentinel.size());

var compuestoLimpio = sentinel.median();

var visColorVerdadero = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000
};

var visFalsoColor = {
  bands: ['B8', 'B4', 'B3'],
  min: 0,
  max: 4000
};

Map.centerObject(roi, 11);

Map.addLayer(compuestoLimpio, visColorVerdadero, 'Sentinel-2 Color Natural (B4/B3/B2)');

Map.addLayer(compuestoLimpio, visFalsoColor, 'Sentinel-2 Falso Color (B8/B4/B3)');

// Enlace de ejecución directa en GEE: https://code.earthengine.google.com/06271799be884d98fd3e9b5e9fb0bb7f
