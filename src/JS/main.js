var scene,
    camera,
    renderer,  
    controls,
    light;

function start(){
    initScene();
    sound();
    animate();
}

function initScene(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("visual") });

    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0xffffff, 0, 750);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);
    const gridHelper = new THREE.GridHelper(0,0,0xD0000,0xD0000);
    scene.add(gridHelper)
    renderer.setSize(window.innerWidth, window.innerHeight - 4);
    renderer.setSize(800,800)

    camera.position.set(0,10,-10)

    general = './src/MODELS/'
    mtlpath = 'Laptop.mtl'
    objpath = 'Laptop.obj'
    //import obj model
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(general );
    mtlLoader.setPath(general);
    mtlLoader.load(mtlpath, function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(general);
        objLoader.load(objpath, function (object) {
            modelLoad = object;
            scene.add(modelLoad);
            object.scale.set(35, 35, 35);
            object.position.y = -20;
            object.position.x = 40;
            object.position.z = 35;
        });
    });

}

function sound(){
    var audio = new Audio(['./src/AUDIO/1.mp3']);
    audio.play();
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    audio.update();
}

