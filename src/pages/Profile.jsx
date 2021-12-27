import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from '../query/axios';
import { useUserUpdate } from "../query/reactquery";

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { mutate, isLoading, error } = useUserUpdate();

    const [input, setInput] = useState({
        firstName: user.firstName[0].toUpperCase() + user.firstName.slice(1),
        lastName: user.lastName[0].toUpperCase() + user.lastName.slice(1),
        education: user.education,
        hobbies: user.hobbies,
    });
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
        } else if (name !== 'hobbies' && !name.includes('education')) {
            setInput(prev => ({ ...prev, [name]: value }));
        }
    };

    let profileImage;
    if (file) {
        profileImage = URL.createObjectURL(file);
    }

    const changeProfile = async (e) => {
        const formData = new FormData();
        setFile(e.target.files[0]);
        formData.append('profile', e.target.files[0]);
        await axios.patch('/profile', formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    };

    if (isLoading) return <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={styles.signUp}>
            <form onSubmit={(e) => {
                e.preventDefault();
                const { firstName, lastName, education, hobbies } = input;
                mutate({ firstName, lastName, education, hobbies });
            }}>
                <h1 className="h3 mb-3 fw-normal">Profile</h1>

                <div style={styles.formLayout}>
                    <div style={styles.registerBox}>
                        <div style={{ marginBottom: '10px', display: 'flex' }}>
                            <input style={styles.none} type="file" id="avatar" onChange={changeProfile} />
                            <label style={styles.label} htmlFor="avatar">
                                <img style={styles.img} src={file ? profileImage : `http://localhost:8000/static/images/${user.profile}`} alt="profile" />
                            </label>
                        </div>
                        <div className="form-floating">
                            <div style={{ backgroundColor: "#eee" }} type="email" className="form-control">
                                {user.email}
                            </div>
                            <label>Email address</label>
                        </div>
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
                            <a href="" onClick={() => navigate("/password")}>Change Password</a>
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
                                value={input.education.level} onChange={handleInput}
                            />
                            <label>Highest Level</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="sample" name="education.field"
                                value={input.education.field} onChange={handleInput}
                            />
                            <label>Study Field</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="sample" name="education.institute"
                                value={input.education.institute} onChange={handleInput}
                            />
                            <label>Institute</label>
                        </div>
                        <div className="form-floating" style={{ marginBottom: '10px' }}>
                            <input type="text" className="form-control" placeholder="sample" name="education.year"
                                value={input.education.year} onChange={handleInput}
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

                <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>

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
    layout: {
        width: '1200px',
        margin: '0 auto',
        display: 'flex'
    },
    img: {
        borderRadius: '50%'
    },
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