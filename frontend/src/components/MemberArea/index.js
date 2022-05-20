import './MemberArea.css';
import MemberCard from '../MemberCard';

const MemberArea = ({ members, server }) => {
    const membersArr = Object.values(members);

    return (
        <div className='member-area-container'>
            <div className='member-area-header'>Members</div>
            {membersArr.map(member => (
                <MemberCard key={member.id} member={member} server={server}/>
            ))}
        </div>
    );
};

export default MemberArea;