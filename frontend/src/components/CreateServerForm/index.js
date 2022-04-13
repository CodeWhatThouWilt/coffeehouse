import './CreateServerForm.css';
import { useState } from 'react';

const CreateServerForm = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('form data', image, name)
    }

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
            <form className='create-server-form-area' id='server-form'>
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
                <div className='create-server-back-button'>
                    Back
                </div>
                <div className='create-server-submit-button' form='server-form'>
                    Create
                </div>
            </div>
        </div >
    );
};

export default CreateServerForm;