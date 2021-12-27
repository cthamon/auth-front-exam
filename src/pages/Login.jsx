import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../query/reactquery";

export default function Login() {
    const navigate = useNavigate();
    const { mutate, isLoading, error, isSuccess } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (isLoading) return <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>;
    if (isSuccess) navigate(0);

    return (
        <div className="form-signin">
            <form onSubmit={(e) => { e.preventDefault(); mutate({ email, password }); }}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div>
                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="sample"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="sample"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

                <div style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>
                    No account ? <a href="" className="text-primary text-decoration-underline" onClick={() => navigate("/register")}> Sign Up!</a>

                    {error &&
                        error.response.data.map((err, i) => (
                            <p key={i} style={styles.error}>
                                {err.message}
                            </p>))
                    }
                </div>

            </form>
        </div>
    );
}

const styles = {
    error: {
        color: 'red',
        fontSize: '12px'
    }
};
