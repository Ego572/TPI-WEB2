import { user } from "../models/user.js";


/**
 * @param {express.Request} req
 * @param {express.Response} res
 */


export async function signupForm(req, res) {
    res.render('../views/register.pug')
    
}

export async function signup(req, res) {
    const {username,gmail,password,confirm_password } = req.body 

    const username = username.trim();
    const mail = gmail.trim();
    const pass = password.trim();
    const confirmpass = password.trim();

    //TODO completar esto 




}



