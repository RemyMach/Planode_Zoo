import {SequelizeManager} from "../../models";
import {fixture} from "./fixture";
import {ImageInstance} from "../../models/image.model";

export class ImageFixture implements fixture{

    savanna_image?: ImageInstance;
    aviary_image?: ImageInstance;

    private static instance: ImageFixture;

    public static async getInstance(): Promise<ImageFixture> {
        if(ImageFixture.instance === undefined) {
            ImageFixture.instance = new ImageFixture();
        }
        return ImageFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();

        this.savanna_image = await manager.image.create({
            image: "https://thesafariworld.com/wp-content/uploads/2018/10/savana.jpg"
        });
        this.aviary_image = await manager.image.create({
            image: "https://cdn.unitycms.io/image/ocroped/1200,1200,1000,1000,0,0/OzJRL7sZFak/D9p0F8EoaZj9x5aViGxuKl.jpg"
        });
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.area.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.image.destroy({
            truncate: true,
            force: true
        });
    }
}