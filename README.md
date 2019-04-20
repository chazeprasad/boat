# Boat Framework for API development

### Rest API for Web and Mobile apps.

It features the following technologies:


- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) as optional database
- [Mongoose ORM](https://mongoosejs.com/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) s library to help you hash passwords.
- [dotenv](https://github.com/motdotla/dotenv) to loads environment variables from a .env file
- [gulp](https://github.com/gulpjs/gulp) for Development Task Automation 
- [joi](https://github.com/hapijs/joi) as schema validator for JavaScript objects
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)An implementation of JSON Web Tokens
- [babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)
- [supertest](https://github.com/visionmedia/supertest) for Api Testing
- [TypeScript](https://www.typescriptlang.org/)

### How to run the server
Clone the repo
```
git clone https://github.com/chazeprasad/boat
npm install
gulp dev
```

### How to create a CRUD API
Create a controller file under src/controller.
eg: TodoController.ts


```javascript
import { Request, Response, NextFunction } from 'express'
import { ActionController, Get, Api, Post, Put, Status } from "@appengine/airship";

@Api('/todo')
export class TodoController extends ActionController {
   
    constructor() {
        super();
        
    }

    @Post('/', [validateUser])
    async create(req:Request, res:Response, next:NextFunction) {
        res.status(Status.CREATED).json({
           task: 'Buy milk',
           done: false
        })
    }

    @Get('/')
    async index(req:Request, res:Response, next:NextFunction) {
       let todoList = [
           { todo: 'Stop working and enjoy the Holidays :-)', done: false },
           { todo: 'Eat food', done: false }
       ] 
        res.json({
            content: { todo: 'Stop working and enjoy the Holidays :-)', done: false }
        });

    }

    @Get('/:id')
    async show(req:Request, res:Response, next:NextFunction) {
        let id = request.params.id
        res.json({
            content: { todo: 'Stop working and enjoy the Holidays :-)', done: false },
        });
    }

    @Put('/:id')
    async update(req:Request, res:Response, next:NextFunction) {
        let id = request.params.id
        let userParams = req.body
        // Update
        res.sendStatus(Status.NO_CONTENT);
    }

    @Delete('/:id')
    async destroy(req:Request, res:Response, next:NextFunction) {
        let id = request.params.id
        let userParams = req.body
        // Delete
        res.sendStatus(Status.NO_CONTENT);
    }
}

```
