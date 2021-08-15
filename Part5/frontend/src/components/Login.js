import React, { useState } from 'react';
import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = ({ addUser, sendNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        const user = await loginService.login({
            username, password
        })

        window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(user)
        )
        addUser(user)
        blogService.setToken(user.token)
        sendNotification("Logged In")
        setUsername('')
        setPassword('')

        // try {
        //     const user = await loginService.login({
        //         username, password
        //     })

        //     window.localStorage.setItem(
        //         'loggedBlogAppUser', JSON.stringify(user)
        //     )
        //     addUser(user)
        //     sendNotification("Logged In")
        //     setUsername('')
        //     setPassword('')
        // } catch (exception) {
        //     console.log('Wrong credentials');
        // }
    }

    return (
        <div>
            <h2>log into application</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login