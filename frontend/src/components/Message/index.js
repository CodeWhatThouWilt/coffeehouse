import "./Message.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const Message = ({ message, emitEditMessage, user }) => {
	const [showHover, setShowHover] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState(message.content);

	useEffect(() => {
		if (isEditing) {
			const keyPressHandler = (e) => {
				const key = e.key;
				if (key === "Escape") {
					setIsEditing(false);
					setContent(message.content);
				}
			};
			document.addEventListener("keydown", keyPressHandler);
			return () =>
				document.removeEventListener("keydown", keyPressHandler);
		}
	}, [isEditing, message.content]);

	const divRef = useRef(null);
	useEffect(() => {
		divRef.current.scrollIntoView();
	}, []);

	const changeToEdit = () => {
		setIsEditing(true);
		setShowHover(false);
	};

	const cancelEdit = () => {
		setIsEditing(false);
		setContent(message.content);
	}

    const editMessage = (e) => {
        e.preventDefault();
        const payload = { id: message.id, content }
        emitEditMessage(payload);
        setIsEditing(false);
    }
    // TODO add styling for editing
    // TODO add edited text if a message has been edited
	return !isEditing ? (
		<div
			ref={divRef}
			className="message-container"
			onMouseLeave={() => setShowHover(false)}
			onMouseMove={() => setShowHover(true)}
		>
			{showHover && user.id === message.userId && (
				<div className="message-hover-ctn">
					<div onClick={changeToEdit}>
						<i className="fa-solid fa-pencil" />
					</div>
				</div>
			)}
			<img src={message.User.profilePicture} alt="pfp" />
			<div className="message-text-container">
				<div className="message-username">{message.User.username}</div>
				<div className="message-content">{message.content}</div>
			</div>
		</div>
	) : (
		<div
			ref={divRef}
			className={`message-container editing-message`}
			onMouseEnter={() => setShowHover(true)}
			onMouseLeave={() => setShowHover(false)}
		>
			<img src={message.User.profilePicture} alt="pfp" />
			<div className="message-text-container">
				<div className="message-username">{message.User.username}</div>
				{/* <div className="message-content">{message.content}</div> */}
				<form onSubmit={(e) => editMessage(e)}>
					<input
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</form>
				<div className="edit-message-footer">
					escape to <span onClick={cancelEdit}>cancel</span> • enter to <span onClick={editMessage}>save</span>
				</div>
			</div>
		</div>
	);
};

export default Message;
