import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {ImageInstance, ImageUpdateProps} from "../models/image.model";
import {ImageRepository} from "../repositories/image.repository";

export class ImageController {

    image: ModelCtor<ImageInstance>;

    private static instance: ImageController;

    public static async getInstance(): Promise<ImageController> {
        if(ImageController.instance === undefined) {
            const { image } = await SequelizeManager.getInstance();
            ImageController.instance = new ImageController(image);
        }
        return ImageController.instance;
    }

    private constructor(image: ModelCtor<ImageInstance>) {
        this.image = image;
    }

    public async createImage(props: ImageUpdateProps): Promise<ImageInstance | null> {
        return await ImageRepository.createImage(props);
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<ImageInstance[]> {
        limit = limit || 30;
        offset = offset || 0;

        const res = await ImageRepository.getAllImages(offset, limit);

        if(res.length > 0) {
            return res;
        }

        return [];
    }

    public async getImageById(id: number): Promise<ImageInstance | null> {
        const image = await ImageRepository.getImageById(id);

        if(image !== null) {
            return image;
        }

        return null;
    }

    public async updateImage(id: number, props: ImageUpdateProps): Promise<ImageInstance | null> {
        return await ImageRepository.updateImage(id, props);
    }

    public async deleteImage(id: number): Promise<boolean> {
        return await ImageRepository.deleteImage(id);
    }
}