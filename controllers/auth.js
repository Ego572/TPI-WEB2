import  user  from "../models/user.js";
import express, { text } from 'express'


/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export async function loginForm(req, res) {
    res.render('login')



}

export async function login(req, res) {
    const { username, password } = req.body

    const user = username.trim();
    const pass = password.trim();


    if (!username || !pass) {
        res.status(400).render('login', {
            alert: {
                status: "error",
                text: "no deben haber campos vacios "
            },
            formValues: req.body
        })
        return;
    }

    try {
        const user = await user.findOne({ where: { username: user } })

        if (!user) {
            res.status(400).render('login', {
                alert: {
                    status: "error",
                    text: "Usuario no encontrado"
                },
                formValues: req.body
            })
            return;
        }
        const isValidated = await user.validatePassword(pass)

        if (!isValidated) {
             res.status(400).render('login', {
                alert: {
                    status: "error",
                    text: "Usuario o contraseña incorrectas"
                },
                formValues: req.body
            })
            return;
        }

        req.session.user = {
            id: user.id,
        };
    } catch (error) {
        console.error('error en login', error);
        return res.status(500).render('login', {
            alert: {
                status: "error",
                text: "Error al iniciar sesión"
            },
            formValues: req.body
        })
        return;
    }
    res.redirect('/index')

}

    export async function signupForm(req, res) {
        res.render('register')



    }
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */


    export async function signup(req, res) {
        const { username, gmail, password, confirm_password } = req.body

        const usernameClean = username.trim();
        const mail = gmail.trim();
        const pass = password.trim();
        const confirmpass = confirm_password.trim();

        if (!username || !mail || !pass || !confirmpass) {
            return res.status(400).render('register', {
                alert: {
                    status: "error",
                    text: "no deben haber campos vacios "
                },
                formValues: req.body


            })

        }

        if (pass !== confirmpass) {
            return res.status(400).render('register', {
                alert: {
                    status: "error",
                    text: "las contraseñas no coinciden "
                },
                formValues: req.body


            })
        }

        try {
            const newUser = await user.create({
                userName: usernameClean,
                email: mail,
                password: pass
            })
        } catch (error) {
            console.error(error);
             return res.status(500).render('register', {
                alert: {
                    status: "error",
                    text: "Error al crear el usuario"
                },
                formValues: req.body
            })
            return;
        }

        /* res.redirect('/index') */










    }

    export async function logout(req, res) {
        if(req.session){
            await req.session.destroy();
            res.redirect('/index')
            return;
        }
    }


