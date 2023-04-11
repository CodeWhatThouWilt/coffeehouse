import './CreateServerForm.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createServer } from '../../store/servers';
import { useHistory } from 'react-router-dom';

const CreateServerForm = ({ setShowModal }) => {
    const [image, setImage] = useState();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors([]);

        if (name.length < 1 || name.length > 100) {
            return;
        };

        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('image', image);
        dispatch(createServer(formData))
            .then(res => history.push(`/${res.id}/${Object.values(res.Channels)[0].id}`))
            .then(() => setShowModal(false))
            .catch(async res => {
                const data = await res.json();
                data.errors && setErrors(data.errors);
            });
    };

    const buttonStyling = () => {
        if (name.length < 1 || name.length > 100) {
            return 'create-server-submit-button-disabled'
        } else {
            return 'create-server-submit-button-enabled'
        }
    };

    return (
        <div className='create-server-form-container'>
            <div className='create-server-top-text-container'>
                <div className='create-server-top-text-header'>
                    Create your server
                </div>
                <div className='create-server-top-text'>
                    Give your new server a personality with a name and an icon.
                    You can always change it later.
                </div>
            </div>
            <form onSubmit={e => submitHandler(e)} className='create-server-form-area' id='server-form'>
                <div className='create-server-upload-icon-container'>
                    <label htmlFor='image'>
                        {!image &&
                            <div className='create-server-upload-icons'>
                                <div className='create-server-blue-circle'>
                                    <i className="fa-regular fa-plus create-server-blue-circle-plus" />
                                </div>
                                <div className='create-server-camera-text-container'>
                                    <i className="fa-solid fa-camera create-server-camera-icon" />
                                    <div className='create-server-upload-text'>UPLOAD</div>
                                </div>
                            </div>
                        }
                        {image &&
                            <img
                                src={URL.createObjectURL(image)}
                                alt='uploaded'
                                className='create-server-uploaded-image'
                            />
                        }
                    </label>
                </div>
                <input
                    id='image'
                    type='file'
                    accept='image/*'
                    hidden={true}
                    onChange={e => setImage(e.target.files[0])}
                />
                <div className='create-server-name-input-container'>
                    <div className='create-server-name-input-label'>
                        SERVER NAME
                    </div>
                    <input
                        type='text'
                        value={name}
                        maxLength={100}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </form>
            <div className='create-server-button-container'>
                <div onClick={() => setShowModal(false)} className='create-server-back-button'>
                    Back
                </div>
                <div className='create-server-error-container'>
                    {errors.map((error, index) => (
                        <div key={index} className='create-server-error'>{error}</div>
                    ))}
                </div>
                <div onClick={e => submitHandler(e)} className={buttonStyling()} form='server-form'>
                    Create
                </div>
            </div>
        </div >
    );
};

export default CreateServerForm;