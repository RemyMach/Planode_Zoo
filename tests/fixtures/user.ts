import { SequelizeManager } from "../../models";
import {sign, Secret} from 'jsonwebtoken';

export async function setUpUserTable():Promise <void>{

    const manager = await SequelizeManager.getInstance();

    const user_admin = await manager.user.create({
        name: "eric",
        surname: "delacroix",
        email: "eric@gmail.com",
        password: "azertyuiop"
    });
    const user_admin_s1 = await manager.session.create({
        token: sign({ id: user_admin.id.toString()}, process.env.JWT_SECRET as Secret)
    });
    await user_admin_s1.setUser(user_admin);

    const user_normal= await manager.user.create({
        name: "Jean",
        surname: "tom",
        email: "tom@gmail.com",
        password: "azertyuiop"
    });

    const user_normal_s1 = await manager.session.create({
        token: sign({ id: user_normal.id.toString()}, process.env.JWT_SECRET as Secret)
    });
    await user_normal_s1.setUser(user_normal);
}