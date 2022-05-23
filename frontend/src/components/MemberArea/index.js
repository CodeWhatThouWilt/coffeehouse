import './MemberArea.css';
import MemberCard from '../MemberCard';

const MemberArea = ({ members, server }) => {

    return (
        <div className='member-area-container'>
            <div className='member-area-header'>Members</div>
            {members.map(member => (
                <MemberCard key={member.id} member={member} server={server}/>
            ))}
        </div>
    );
};

export default MemberArea;