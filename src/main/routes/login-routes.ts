import { Router } from "express";
import { adpatRoute } from '../adapters/express/express-route-adapter'
import { makeLoginController } from "../factories/login/login-factory";
import {makeSingUpController} from '../factories/singup/signup-factory'

export default (router: Router):void => { 
    router.post('/signup', adpatRoute(makeSingUpController()))
    router.post('/login', adpatRoute(makeLoginController()))
}