import {type Request,type Response} from "express";
import userService, {UserService} from "../service/user-service.mjs";

class UserController {
    constructor(private readonly userService : UserService) {
    }
    getUser = (c:Request, w:Response):void =>{
        const users: string[]|null = this.userService.getUser(1,10)

        if(users === null){
            w.status(404).json({
                status:404,
                error:"No user found."
            })
            return;
        }

        w.status(200).json({data:users, status:200});
    }
}

export default new UserController(userService);