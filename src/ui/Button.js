import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Text {
  constructor(x, y, label, scene, callback) {
    super(scene, x, y, label, { backgroundColor: "#f9bb00" });

    this.setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: "#f9bb00" })
      .setInteractive({ useHandCursor: true })
      .setStroke('#000', 5)
      .on("pointerdown", () => callback())

    scene.add.existing(this);
  }
}