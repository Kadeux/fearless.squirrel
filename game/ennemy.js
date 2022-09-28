var Ennemy = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 3;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 1;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
        });

    var singleGeometry = new THREE.Geometry();
    jQuery('#'+this.name+' >.life').text(this.life);

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

};

Ennemy.prototype.dead = function () {
    scene.remove(this.graphic);
    this.life--;
    if (this.life <= 0) {
        jQuery('#'+this.name+' >.life').text("Il est mort !!! il a donc 0");
    }
    else {
        // modify html div
        jQuery('#'+this.name+' >.life').text(this.life);
        this.position.x = Math.random() * WIDTH - WIDTH / 2;
        this.position.y = Math.random() * HEIGHT - HEIGHT / 2;
        scene.add(this.graphic);
    }
}

Ennemy.prototype.move = function () {
    var moveTo = new THREE.Vector3(
        this.speed * Math.cos(this.direction) + this.position.x,
        this.speed * Math.sin(this.direction) + this.position.y,
        this.graphic.position.z
    );

    this.position = moveTo;

    if (this.position.y <= -HEIGHT / 2 && this.direction === - Math.PI / 2)
    {
        this.direction = Math.PI / 2
        this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI);

    }
    if (this.position.y >= HEIGHT / 2 && this.direction === Math.PI / 2)
    {
        this.direction = - Math.PI / 2;
        this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI);
    }
    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
};
