import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Text {
  constructor(x, y, label, scene, callback) {
    super(scene, x, y, label, { backgroundColor: "#75ceb3" });

    this.setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: "#75ceb3" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => callback())
      .on("pointerover", () => this.setStyle({ fill: "#000" }))
      .on("pointerout", () => this.setStyle({ fill: "#fff" }));

    scene.add.existing(this);
  }
}