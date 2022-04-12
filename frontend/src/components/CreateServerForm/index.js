import './CreateServerForm.css';

const CreateServerForm = () => {

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
            <div className='create-server-upload-icon-container'>
                <div className='create-server-upload-icons'>
                    <div className='create-server-blue-circle'></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default CreateServerForm;