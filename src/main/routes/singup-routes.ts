import { Router } from "express";
import {makeSingUpController} from '../factories/singup/signup'
import { adpatRoute } from '../adapters/express-route-adapter'

export default (router: Router):void => { 
    router.post('/signup', adpatRoute(makeSingUpController()))
}