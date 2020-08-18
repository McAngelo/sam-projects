import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse} from 'tsoa';
import { User, UsersService, UserCreationParams} from '../models/';

@Route('users')
export class UsersController extends Controller{
    /* constructor(parameters) {
        
    } */

    @Get("{userId}")
    public async getUser(@Path() userId: any, @Query() name?: string): Promise<User>{ 
        return new UsersService().get(userId, name);
    }

    @SuccessResponse("201", "Created")
    @Post()
    public async createUser (@Body() requestBody: UserCreationParams): Promise<void>{
        this.setStatus(201);
        new UsersService().create(requestBody);
        return;
    }
}