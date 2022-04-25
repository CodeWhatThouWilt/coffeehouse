import './MemberArea.css';

const MemberArea = ({ members }) => {
    const membersArr = Object.values(members);

    return (
        <div className='member-area-container'>
            <div className='member-area-header'>Members</div>
            {membersArr.map(member => (
                <div key={member.id} className='member-area-member'>
                    <img src={member.User.profilePicture} alt='pfp' />
                    <div className='member-area-name'>{member.User.username}</div>
                </div>
            ))}
        </div>
    );
};

export default MemberArea;