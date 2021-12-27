import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegister } from "../query/reactquery";

export default function Register() {
    const navigate = useNavigate();
    const { mutate, isLoading, error, isSuccess } = useRegister();
    const [input, setInput] = useState({});
    const [file, setFile] = useState(null);

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name.includes('education')) {
            if (name.split('.')[1] === 'level') setInput(prev => ({ ...prev, education: { ...prev.education, level: value } }));
            if (name.split('.')[1] === 'field') setInput(prev => ({ ...prev, education: { ...prev.education, field: value } }));
            if (name.split('.')[1] === 'institute') setInput(prev => ({ ...prev, education: { ...prev.education, institute: value } }));
            if (name.split('.')[1] === 'year') setInput(prev => ({ ...prev, education: { ...prev.education, year: value } }));
        } else if (name === 'hobbies') {
            setInput(prev => ({ ...prev, hobbies: value.split(',') }));
        } else if (name !== 'hobbies') {
            setInput(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, firstName, lastName, education, hobbies } = input;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('education[level]', education.level);
        formData.append('education[field]', education.field);
        formData.append('education[institute]', education.institute);
        formData.append('education[year]', education.year);
        hobbies.forEach((item, i) => (formData.append(`hobbies[${i}]`, item)));
        formData.append('profile', file);
        mutate(formData);
    };

    let profileImage;
    if (file) {
        profileImage = URL.createObjectURL(file);
    }

    if (isLoading) return <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>;
    if (isSuccess) { navigate(0); navigate("/"); }

    return (
        <div style={styles.signUp}>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Sign up</h1>

                <div style={styles.formLayout}>
                    <div style={styles.registerBox}>
                        <div className="form-floating">
                            <input type="email" className="form-control" placeholder="sample" name="email"
                                value={input.email} onChange={handleInput}
                            />
                            <label>Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" placeholder="sample" name="password"
                                value={input.password} onChange={handleInput}
                            />
                            <label>Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" placeholder="sample" name="confirmPassword"
                                value={input.confirmPassword} onChange={handleInput}
                            />
                            <label>Confirm Password</label>
                        </div>
                        <div style={{ marginTop: '10px', display: 'flex' }}>
                            <input style={styles.none} type="file" id="avatar" onChange={(e) => setFile(e.target.files[0])} />
                            <label style={styles.label} htmlFor="avatar">
                                <img style={styles.img} src={file ? profileImage : "/profile.png"} alt="profile" />
                            </label>
                        </div>
                    </div>
                    <div style={styles.registerBox}>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="sample" name="firstName"
                                value={input.firstName} onChange={handleInput}
                            />
                            <label>First name</label>
                        </div>
                        <div className="form-floating" style={{ marginBottom: '10px' }}>
                            <input type="text" className="form-control" placeholder="sample" name="lastName"
                                value={input.lastName} onChange={handleInput}
                            />
                            <label>Last name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="sample" name="education.level"
                                value={input.education?.level} onChange={handleInput}
                            />
                            <label>Highest Level</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="sample" name="education.field"
                                value={input.education?.field} onChange={handleInput}
                            />
                            <label>Study Field</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="sample" name="education.institute"
                                value={input.education?.institute} onChange={handleInput}
                            />
                            <label>Institute</label>
                        </div>
                        <div className="form-floating" style={{ marginBottom: '10px' }}>
                            <input type="text" className="form-control" placeholder="sample" name="education.year"
                                value={input.education?.year} onChange={handleInput}
                            />
                            <label>Graduate Year</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="sample" name="hobbies"
                                value={input.hobbies} onChange={handleInput}
                            />
                            <label>Hobbies</label>
                        </div>
                    </div>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>

                <div style={{ width: '100%', textAlign: 'center', marginTop: '5px' }}>
                    {error &&
                        error.response.data?.map((err, i) => (
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
    signUp: {
        width: '900px',
        margin: '0 auto'
    },
    formLayout: {
        display: 'flex'
    },
    registerBox: {
        width: '100%',
        margin: '0 10px 0 0'
    },
    none: {
        display: 'none'
    },
    label: {
        borderRadius: '50%',
        padding: '0',
        width: '135px',
        height: '135px',
        margin: '0 auto'
    },
    img: {
        borderRadius: '50%',
        width: '135px',
        height: '135px',
        border: '2px solid #ccc',
        padding: '3px',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        fontSize: '12px'
    }
};