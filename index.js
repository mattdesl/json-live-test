var model = require('./test.json')
var Point = require('verlet-point/3d')
var random = require('randf')
var THREE = require('three')
var createOrbitViewer = require('three-orbit-viewer')(THREE)
 
var app = createOrbitViewer({
    clearColor: 0xe0e0e0,
    clearAlpha: 1.0,
    fov: 45,
    position: new THREE.Vector3(40, 40, -50)
})
 
app.renderer.shadowMapEnabled = true
app.renderer.shadowMapType = THREE.PCFSoftShadowMap

var hemi = new THREE.HemisphereLight(0xcfcfcf, 0xd38d8d, 0.45)
app.scene.add(hemi)

var light = new THREE.PointLight("rgb(100, 80, 80)", 1, 500)
light.position.set(15, 100, -2)
// app.scene.add(light)

var dir = new THREE.DirectionalLight(0xcfcfcf, 1)
dir.position.set(2, 10, 0)
dir.shadowMapWidth = dir.shadowMapHeight = 2048
dir.shadowCameraNear = 1
dir.castShadow = true
dir.shadowDarkness = 0.1
dir.shadowCameraFar = 1000
app.scene.add(dir)

var floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshPhongMaterial({ 
        shininess: 0, metal: true, color: 0xe0e0e0 })
)
floor.receiveShadow = true
floor.frustumCulled = false
floor.rotation.x = -Math.PI/2
app.scene.add(floor)

var geo = new THREE.SphereGeometry(1, 32, 32)
var mat = new THREE.MeshLambertMaterial({ color: 0x2f93e7 })
var ball = new THREE.Mesh(geo, mat)
ball.frustumCulled = false
ball.position.y = 1
 
var system = require('verlet-system/3d')({
    gravity: model.gravity || [0, 0, 0],
    min: [null, 0, null],
    friction: model.friction
})

var points = require('array-range')(100).map(function() {
    var bound = 50
    return Point({
        mass: random(0.1, 2),
        radius: random(0.15, 2)
    }).place([random(-bound, bound), random(1, 100), random(-bound, bound)])
})

points.forEach(function(point) {
    var mesh = ball.clone()
    mesh.castShadow = true
    app.scene.add(mesh)
    mesh.scale.multiplyScalar(point.radius)
    mesh.position.fromArray(point.position)
    point.mesh = mesh
})

app.on('tick', function(dt) {
    system.gravity = model.gravity || [0, 0, 0]
    system.friction = model.friction || 0.98
    system.integrate(points, 1/60)

    points.forEach(function(point) {
        point.mesh.position.fromArray(point.position)
        point.mesh.material.color.setStyle(model.ballColor||'#fff')
        point.addForce(model.force||[0,0,0])
    })

    floor.material.color.setStyle(model.floorColor || '#e0e0e0')
    dir.shadowDarkness = model.shadowDarkness || 0
})