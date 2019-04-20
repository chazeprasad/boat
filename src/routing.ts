
import {AppController} from './controller/AppController';
import { AuthController } from './controller/AuthController';
import { UserController } from './controller/UserController';

const appCtrl = new AppController();
const authCtrl = new AuthController()
const userCtrl = new UserController()

const Routes = [
    { path: '/', router: appCtrl.router },
    { path: '/', router: authCtrl.router },
    { path: '/', router: userCtrl.router },
]

export { Routes }