// Inspired by: https://github.com/ourcade/memory-match-template-phaser3/blob/master/src/scenes/CountdownController.js

export default class CountdownController {
    /** @type {Phaser.Scene} */
    scene;
    /** @type {Phaser.GameObjects.Text} */
    label;
    /** @type {Phaser.Time.TimerEvent} */
    timerEvent;
    
    duration = 0;
    
    /**
     * @param {Phaser.Scene} scene 
     * @param {Phaser.GameObjects.Text} label 
     */
    constructor(scene, label) {
        this.scene = scene;
        this.label = label;
    }

    /**
     * Inicia el contador de tiempo.
     * @param {() => void} callback - Función que se ejecuta cuando el contador llega a 0.
     * @param {number} duration - Duración en milisegundos (default: 300000 = 5 minutos).
     */
    start(callback, duration = 300000) {
        this.stop();

        this.finishedCallback = callback;
        this.duration = duration;

        this.timerEvent = this.scene.time.addEvent({
            delay: 1000, // Cada 1 segundo
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        });
    }

    stop() {
        if (this.timerEvent) {
            this.timerEvent.remove();
            this.timerEvent = undefined;
        }
    }

    updateTime() {
        this.duration -= 1000; // Reducir en 1 segundo
        const seconds = Math.floor(this.duration / 1000);
        this.label.setText(String(seconds).padStart(3, '0')); // Formato de 3 dígitos

        if (seconds <= 0) {
            this.stop();
            if (this.finishedCallback) {
                this.finishedCallback();
            }
        }
    }
}
