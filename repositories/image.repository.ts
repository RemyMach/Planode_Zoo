import {ImageInstance, ImageUpdateProps} from "../models/image.model";
import {ImageController} from "../controllers/image.controller";

export class ImageRepository {

    public static async createImage(props: ImageUpdateProps): Promise<ImageInstance | null> {
        const imageController = await ImageController.getInstance();
        return await imageController.image.create(props);
    }

    public static async getAllImages(offset: number, limit: number): Promise<ImageInstance[]> {
        const imageController = await ImageController.getInstance();
        return await imageController.image.findAll({
            attributes: ['id', 'image'],
            offset,
            limit
        });
    }

    public static async getImageById(id: number): Promise<ImageInstance | null> {
        const imageController = await ImageController.getInstance();

        return  await imageController.image.findOne({
            attributes: ['id', 'image'],
            where: {
                id
            }
        });
    }

    public static async updateImage(id: number, props: ImageUpdateProps): Promise<ImageInstance | null> {
        const imageController = await ImageController.getInstance();
        const image = await imageController.getImageById(id);

        const props_convert = JSON.parse(JSON.stringify(props));

        if(image === undefined || image?.id === undefined) {
            return null;
        }
        await imageController.image.update(
            props_convert,
            {
                where: {
                    id: image.id
                }
            });

        return await imageController.getImageById(id);
    }

    public static async deleteImage(id: number): Promise<boolean> {
        const imageController = await ImageController.getInstance();
        await imageController.image.destroy({
            where: {
                id
            }
        });

        const image = await imageController.getImageById(id);
        return image === null;
    }
}