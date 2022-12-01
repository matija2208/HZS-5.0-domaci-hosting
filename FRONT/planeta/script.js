// Three.js - Align HTML Elements to 3D Globe
// from https://r105.threejsfundamentals.org/threejs/threejs-align-html-elements-to-3d-globe.html

'use strict';

/* global THREE, dat */
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 60;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 10;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2.5;

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 4;
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#00000000');

  {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://i.imgur.com/2OYQZCH.jpg', render, function ( err ) {
      console.error( 'An error happened.' );
    });
    /*https://r105.threejsfundamentals.org/threejs/resources/data/world/country-outlines-4k.png*/
    const geometry = new THREE.SphereBufferGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({map: texture});
    scene.add(new THREE.Mesh(geometry, material));
  }

  async function loadJSON(url) {
    const req = await fetch(url);
    return req.json();
  }


  let countryInfos;
  async function loadCountryData() {
    countryInfos = await loadJSON('https://api.npoint.io/2285ff3b25060b7c8dd2');  
    /*https://r105.threejsfundamentals.org/threejs/resources/data/world/country-info.json*/

    const lonFudge = Math.PI * 1.5;
    const latFudge = Math.PI;
    // these helpers will make it easy to position the boxes
    // We can rotate the lon helper on its Y axis to the longitude
    const lonHelper = new THREE.Object3D();
    // We rotate the latHelper on its X axis to the latitude
    const latHelper = new THREE.Object3D();
    lonHelper.add(latHelper);
    // The position helper moves the object to the edge of the sphere
    const positionHelper = new THREE.Object3D();
    positionHelper.position.z = 1;
    latHelper.add(positionHelper);

    const labelParentElem = document.querySelector('#labels');
    for (const countryInfo of countryInfos) {
      const {lat, lon, min, max, name} = countryInfo;

      // adjust the helpers to point to the latitude and longitude
      lonHelper.rotation.y = THREE.Math.degToRad(lon) + lonFudge;
      latHelper.rotation.x = THREE.Math.degToRad(lat) + latFudge;

      // get the position of the lat/lon
      positionHelper.updateWorldMatrix(true, false);
      const position = new THREE.Vector3();
      positionHelper.getWorldPosition(position);
      countryInfo.position = position;

      // compute the area for each country
      const width = max[0] - min[0];
      const height = max[1] - min[1];
      const area = width * height;
      countryInfo.area = area;

      // add an element for each country
      const elem = document.createElement('div');

      elem.classList = "naziv";
      elem.textContent = name;
      elem.style.zIndex = 999;
      elem.id = name;
      //elem.onclick = te;
      labelParentElem.appendChild(elem);
      countryInfo.elem = elem;
    }
    requestRenderIfNotRequested();
  }

  loadCountryData();

  const tempV = new THREE.Vector3();
  const cameraToPoint = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  const settings = {
    minArea: 0,
    maxVisibleDot: 0.3,
  };

  function updateLabels() {
    if (!countryInfos) {
      return;
    }

    const large = settings.minArea * settings.minArea;
    // get a matrix that represents a relative orientation of the camera
    normalMatrix.getNormalMatrix(camera.matrixWorldInverse);
    // get the camera's position
    camera.getWorldPosition(cameraPosition);
    for (const countryInfo of countryInfos) {
      const {position, elem, area} = countryInfo;
      // large enough?
      if (area < large) {
        elem.style.display = 'none';
        continue;
      }

      // Orient the position based on the camera's orientation.
      // Since the sphere is at the origin and the sphere is a unit sphere
      // this gives us a camera relative direction vector for the position.
      tempV.copy(position);
      tempV.applyMatrix3(normalMatrix);

      // compute the direction to this position from the camera
      cameraToPoint.copy(position);
      cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize();

      // get the dot product of camera relative direction to this position
      // on the globe with the direction from the camera to that point.
      // -1 = facing directly towards the camera
      // 0 = exactly on tangent of the sphere from the camera
      // > 0 = facing away
      const dot = tempV.dot(cameraToPoint);

      // if the orientation is not facing us hide it.
      if (dot > settings.maxVisibleDot) {
        elem.style.display = 'none';
        continue;
      }

      // restore the element to its default display style
      elem.style.display = '';

      // get the normalized screen coordinate of that position
      // x and y will be in the -1 to +1 range with x = -1 being
      // on the left and y = -1 being on the bottom
      tempV.copy(position);
      tempV.project(camera);

      // convert the normalized position to CSS coordinates
      const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
      const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

      // move the elem to that position
      elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

      // set the zIndex for sorting
      elem.style.zIndex = (-tempV.z * .5 + .5) * 100000 | 0;
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let renderRequested = false;

  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();

    updateLabels();

    renderer.render(scene, camera);
  }
  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener('change', requestRenderIfNotRequested);
  window.addEventListener('resize', requestRenderIfNotRequested);


  var mousestartX; var mousestartY;
  canvas.addEventListener('mousedown', function(event){
    mousestartX = event.offsetX; mousestartY = event.offsetY;
  })

  canvas.addEventListener('mouseup', function(event){
    var mouseX = event.offsetX; var mouseY = event.offsetY;

    if(Math.sqrt((mousestartX-mouseX)*(mousestartX-mouseX) + (mousestartY-mouseY)*(mousestartY-mouseY)) <= 5){
      var labele = document.getElementById("labels").children;
      var shortestDist=Infinity; var shortestDistId;
      var totalDist;
  
      for (var i = 0; i < labele.length; i++){   
        if(!(labele[i].style.display === "none")){
          
          var labelX = (new WebKitCSSMatrix(window.getComputedStyle(labele[i]).transform)).m41;
          var labelY = (new WebKitCSSMatrix(window.getComputedStyle(labele[i]).transform)).m42;
  
          totalDist = Math.sqrt((labelX-mouseX)*(labelX-mouseX) + (labelY-mouseY)*(labelY-mouseY));
          if(totalDist<=shortestDist && totalDist<=40){
            shortestDist = totalDist;
            shortestDistId = i;
          }
        }
      }
      if(shortestDist<=40){
        alert("Closest to: " + labele[shortestDistId].id);
      }
    }
  })

  
  // let lab = document.getElementsByClassName("naziv");
  // console.log(lab.length);
  // for(let i=0; i<lab.length; i++) {
  //   lab[i].addEventListener('click', () => {
  //     //lab.style.Color = 'red';
  //     console.log("1");
  //   });
  // }
  
}



main();



