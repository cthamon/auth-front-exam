import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNewPassword } from "../query/reactquery";

export default function Password() {
    const navigate = useNavigate();
    const { mutate, isLoading, error, isSuccess } = useNewPassword();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (isLoading) return <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>;
    if (isSuccess) navigate("/");

    return (
        <div className="form-signin">
            <form onSubmit={(e) => { e.preventDefault(); mutate({ currentPassword, newPassword, confirmPassword }); }}>
                <h1 className="h3 mb-3 fw-normal">Change Password</h1>

                <div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="sample"
                            value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Current Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="sample"
                            value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">New Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="sample"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Change Password</button>

                <div style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>
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
