import { Router } from "express";
import { adpatRoute } from '../adapters/express/express-route-adapter'
import { makeLoginController } from "../factories/controllers/login/login/login-controller-factory";
import {makeSingUpController} from '../factories/controllers/login/singup/signup-controller-factory'

export default (router: Router):void => { 
    router.post('/signup', adpatRoute(makeSingUpController()))
    router.post('/login', adpatRoute(makeLoginController()))
}