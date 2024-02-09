export default function yaMaps() {
  let check_if_load = false;
  function init() {
    let myMapTemp = new ymaps.Map('map-yandex', {
      center: [55.849432, 37.447432],
      zoom: 16,
      controls: ['zoomControl'],
    });
    let layer = myMapTemp.layers.get(0).get(0);
    waitForTilesLoad(layer).then(function() {
    });
    myMapTemp.behaviors.disable('scrollZoom');
  }
  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function(resolve) {
      let tc = getTileContainer(layer), readyAll = true;
      tc.tiles.each(function(tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once('ready', function() {
          resolve();
        });
      }
    });
  }
  function getTileContainer(layer) {
    for (var k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
          || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }
  function loadScript(url, callback){
    let script = document.createElement('script');
    if (script.readyState){
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' ||
          script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function() {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  let ymap = function() {
    if (!check_if_load) {
      check_if_load = true;
      loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1', function() {
        ymaps.load(init);
      });
    }
  };
  $(function() {
    if ($('.ymap-container').length > 0) {
      ymap();
    }
  });
}
if ($('.ymap-container').length > 0) {
  yaMaps();
}