export function checkControls ({ hk, keys }){
    const isHkTouchingDown = hk.body.touching.down;
    const isLeftKeyDown = keys.left.isDown;
    const isRightKeyDown = keys.right.isDown;
    const isUpKeyDown = keys.up.isDown;
    
    if (hk.isDead) return; 

    if (isLeftKeyDown) {
        isHkTouchingDown && hk.anims.play('hk-walk', true);
        hk.setVelocityX(-225); 
        hk.flipX = false;
    } else if (isRightKeyDown) {
        isHkTouchingDown && hk.anims.play('hk-walk', true);
        hk.setVelocityX(225); 
        hk.flipX = true;
    } else {
        hk.setVelocityX(0);
        isHkTouchingDown && hk.anims.play('hk-idle', true);
    }

    if (isUpKeyDown && isHkTouchingDown && !hk.isJumping) {
        hk.setVelocityY(-800);
        hk.anims.play('hk-jump', true);
        hk.isJumping = true;  
    }

    // Resetear el estado de salto cuando toque el suelo
    if (!isUpKeyDown) {
        hk.isJumping = false;
    }

}
