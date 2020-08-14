import Matter from "matter-js"
import * as Constants from "../assets/const/constants";

const Jump = (entities, {touches, time, screen, layout, events}) => {
    if (typeof Jump.standOnFloor == "undefined") {
        Jump.standOnFloor = true;
        Jump.standOnWall = true;
        Jump.jumpCount = 0;
    }
    let player = entities.player.body;
    let world = entities.physics.world;
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

    let hadTouches = false;
    //touches.filter(t => t.type === "press").forEach(t => {
    if(touches.find((t) => t.type === "press")){
        if(Jump.standOnFloor === true || 
            Jump.standOnWall === true ||
            Jump.jumpCount <=1){
                if(!hadTouches){
                    hadTouches = true;
                    /*
                    if(world.gravity === 0){
                        world.gravity=1.2;
                    }*/
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x,
                        y: -Constants.defaultPlayerJumpHeight,
                    })
                }
            Jump.jumpCount = Jump.jumpCount+1;
            Jump.standOnFloor = false;
            Jump.standOnWall = false;
        }
    };
    //);

    return entities;
}

export default Jump;