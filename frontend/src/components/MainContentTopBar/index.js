import "./MainContentTopBar.css";

const MainContentTopBar = ({ channel, setShowMembers, showMembers }) => {
	return (
		<div className="main-content-top-bar">
			{channel && (
				<>
					<div className="main-content-top-header-container">
						<i className="fa-solid fa-hashtag  main-content-hashtag" />
						<h3>{channel.name}</h3>
					</div>
					<div
						onClick={() => setShowMembers(!showMembers)}
						className="main-content-top-icon-tray"
					>
						<i className="fa-solid fa-user-group" />
					</div>
				</>
			)}
		</div>
	);
};

export default MainContentTopBar;
