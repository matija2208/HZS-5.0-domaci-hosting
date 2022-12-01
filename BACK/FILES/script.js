// Three.js - Align HTML Elements to 3D Globe
// from https://r105.threejsfundamentals.org/threejs/threejs-align-html-elements-to-3d-globe.html

'use strict';
const LINK = "http://localhost";

/* global THREE, dat */
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 60;
  const aspect = 2;
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
    const texture = loader.load('https://i.imgur.com/HNSt0AC.jpg', render, function ( err ) {
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
    countryInfos = await loadJSON("https://api.npoint.io/8767e8bed731ec360373");
    //countryInfos = await loadJSON('https://api.npoint.io/2285ff3b25060b7c8dd2');  
    /*https://r105.threejsfundamentals.org/threejs/resources/data/world/country-info.json*/

    const lonFudge = Math.PI * 1.5;
    const latFudge = Math.PI;

    const lonHelper = new THREE.Object3D();

    const latHelper = new THREE.Object3D();
    lonHelper.add(latHelper);

    const positionHelper = new THREE.Object3D();
    positionHelper.position.z = 1;
    latHelper.add(positionHelper);

    const labelParentElem = document.querySelector('#labels');
    for (const countryInfo of countryInfos) {
      const {lat, lon, min, max, name} = countryInfo;


      lonHelper.rotation.y = THREE.Math.degToRad(lon) + lonFudge;
      latHelper.rotation.x = THREE.Math.degToRad(lat) + latFudge;

      positionHelper.updateWorldMatrix(true, false);
      const position = new THREE.Vector3();
      positionHelper.getWorldPosition(position);
      countryInfo.position = position;


      const width = max[0] - min[0];
      const height = max[1] - min[1];
      const area = width * height;
      countryInfo.area = area;

      const elem = document.createElement('div');

      elem.classList = "naziv";
      elem.textContent = name;
      elem.style.zIndex = 999;
      elem.id = name;
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

    normalMatrix.getNormalMatrix(camera.matrixWorldInverse);

    camera.getWorldPosition(cameraPosition);
    for (const countryInfo of countryInfos) {
      const {position, elem, area} = countryInfo;

      if (area < large) {
        elem.style.display = 'none';
        continue;
      }


      tempV.copy(position);
      tempV.applyMatrix3(normalMatrix);

      cameraToPoint.copy(position);
      cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize();

      const dot = tempV.dot(cameraToPoint);


      if (dot > settings.maxVisibleDot) {
        elem.style.display = 'none';
        continue;
      }


      elem.style.display = '';

      tempV.copy(position);
      tempV.project(camera);

      const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
      const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

      elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

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

  canvas.addEventListener('mouseup', async function(event){
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
        
        izlistajPesme(labele[shortestDistId].id);

      }
    }
  })


}

async function izlistajPesme(x)
{
        let list = (await axios.get(LINK + "/api/music")).data.lista;
        console.log(list);
        let songs=[];

        for(let i=0;i<list.length;i++)
        {
          if(list[i].region===x)
          {
            songs.push(list[i]);
          }
        }
        console.log(songs);

        let div =`
        <h1>${x}</h1>
        `;
        if(songs.length==0)
        {
          div+=`<div class = "SveZaNaturizam">Nažalost nema ponuđenih pesama za zadati Region/Jezik</div>`;
        }
        else
        {
          for(let i=0;i<songs.length;i++)
          {
            div+=`<div class = "SveZaNaturizam" onclick='pustiPesmu("${songs[i].path}","${songs[i].naziv}", "${songs[i].autor}")'>${songs[i].naziv} - ${songs[i].autor}</div><br>`;
          }
        }

        document.getElementById("kumZorzo").innerHTML = div;
}

async function pustiPesmu(path,naziv,autor)
{
  let div =`
        <h1>${naziv}</h1>
        ${autor}<br><br>
        <audio controls autoplay class="pesma">
              <source  src="${LINK+"/api/music/"+path}" type="audio/mpeg">
              Pesma nije dostupna.
        </audio><br>
        `;

  document.getElementById("kumZorzo").innerHTML = div;
}


main();


