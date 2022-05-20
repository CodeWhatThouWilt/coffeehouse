import './MemberCard.css';

const MemberCard = ({ member }) => {

    return (
        <div key={member.id} className='member-card'>
            <img src={member.User.profilePicture} alt='pfp' />
            <div className='member-card-name'>{member.User.username}</div>
        </div>
    );
};

export default MemberCard;