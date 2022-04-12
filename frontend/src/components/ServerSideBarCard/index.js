import './ServerSidebarCard.css';

const ServerSidebarCard = ({server}) => {
    console.log(server.iconURL)
    return (
        <div>
            <img src={server.iconURL} alt='icon' />
        </div>
    );
};

export default ServerSidebarCard;