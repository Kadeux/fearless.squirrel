var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00,
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    }

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < player1.bullets.length; i++){
        for (var j = 0; j < ennemies.length; j++)
        {
            if (Math.abs(player1.bullets[i].position.x - ennemies[j].graphic.position.x) < 10 &&
                Math.abs(player1.bullets[i].position.y - ennemies[j].graphic.position.y) < 10)
            {
                scene.remove(player1.bullets[i]);
                ennemies[j].dead();
                player1.bullets.splice(i, 1);
            }
        }
    }

}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;

    // collision between player and ennemies
    for (var i = 0; i < ennemies.length; i++)
    {
        if (Math.abs(player1.graphic.position.x - ennemies[i].graphic.position.x) < 10 &&
            Math.abs(player1.graphic.position.y - ennemies[i].graphic.position.y) < 10)
        {
            player1.dead();
        }
    }

}

function player_falling()
{

    for (var i = 0; i < length; i++) {
        var x = player1.graphic.position.x;
        var y = player1.graphic.position.y;
        var element = noGround[i];
        var beginTileX = (element[0]) - sizeOfTileX / 2;
        var beginTileY = (element[1]) - sizeOfTileY / 2;
        var endTileX = (element[0] + sizeOfTileX / 2);
        var endTileY = (element[1] + sizeOfTileY / 2);

        if (x > beginTileX && x < endTileX && y > beginTileY && y < endTileY){
            player1.dead()
        }

    }
}
