import Matter from "matter-js"

const Jump = (entities, {touches, time, screen, layout, events}) => {
    if (typeof Jump.standOnFloor == "undefined") {
        Jump.standOnFloor = true;
        Jump.standOnWall = true;
        Jump.jumpCount = 0;
    }
    let player = entities.player.body;
    let defaultFloor = entities.defaultFloor.body;
    if (events != undefined && events.length != 0) {
        for(e in events){
            if(events[e].type === "floorStand"){
                Jump.standOnFloor = true;
                Jump.jumpCount = 0;
            }
            if(events[e].type === "wallStand"){
                Jump.standOnWall = true;
                Jump.jumpCount = 0;
            }
        }
    }
    touches.filter(t => t.type === "press").forEach(t => {
        if(Jump.standOnFloor === true || 
            Jump.standOnWall === true ||
            Jump.jumpCount <=1){
            Matter.Body.applyForce(player, player.position, {x:0, y:-0.055});
            Jump.jumpCount = Jump.jumpCount+1;
            Jump.standOnFloor = false;
            Jump.standOnWall = false;
        }
    });

    return entities;
}

export default Jump;