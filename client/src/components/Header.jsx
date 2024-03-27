import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { useStore } from '../store'
import { LOGOUT_USER } from '../graphql/mutations'
import logo from '../assets/instalLasagnaLogo.svg'

export default function Header() {
    const { state, setState } = useStore()
    const navigate = useNavigate()

    const [logoutUser] = useMutation(LOGOUT_USER)

    const handleLogout = async () => {
        try {
             await logoutUser()
        } catch (error) {
            console.log(error)
        }

        setState({
            ...state,
            user: null
        })

        navigate('/')
    }

    return (
        <header className="flex flex-wrap items-center ph3 pv2 justify-between">
            <span className="flex items-center">
                <div className="logo-wrapper">
                    <img src={logo} alt="" />
                </div>
                <div className="flex flex-column items-start">
                    <h1 className="pb0 mv0 f2">
                        InstalLasagna
                    </h1>
                    {state.user?.username && <p className="pt0 mt0 ml3">Welcome back, {state.user?.username}</p>}

                </div>
            </span>


            <div >
                {
                    state.user ? (
                        <>
                            <span onClick={() => handleLogout()} className="btn mr2">Logout</span>
                        </>
                    ) : (
                        <>
                            <NavLink className="btn mr2" to="/auth">Login | Sign Up</NavLink>

                        </>
                    )
                }
            </div>
        </header>
    )
}