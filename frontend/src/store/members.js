import { csrfFetch } from "./csrf";
const GET_MEMBERS = "servers/getMembers";
const REMOVE_MEMBER = "servers/removeMember";


const getMembers = (members) => {
	return {
		type: GET_MEMBERS,
		payload: { members },
	};
};

const removeMember = (serverId, memberId) => {
	return {
		type: REMOVE_MEMBER,
		payload: { serverId, memberId },
	};
};

export const getServerMembers = (serverId) => async (dispatch) => {
	const res = await csrfFetch(`/api/servers/${serverId}/members`);

	if (res.ok) {
		const members = await res.json();
		dispatch(getMembers(members));
		return members;
	}
};

export const deleteMember = (payload) => async (dispatch) => {
	const { serverId, memberId } = payload;
	const res = await csrfFetch(
		`/api/servers/${serverId}/members/${memberId}`,
		{
			method: "DELETE",
		}
	);

	if (res.ok) {
		const { serverId, memberId } = await res.json();
		dispatch(removeMember(serverId, memberId));
	}
};

const initialState = {
    byId: {},
    byServerId: {}
}

const membersReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_MEMBERS: {
            const { members } = action.payload;
            const serverId = members[0].serverId;

            const membersById = members.reduce((acc, member) => {
                acc[member.id] = member;
                return acc;
            }, {});

            const membersByServerId = { ...state.byServerId, [serverId]: members};

            return {
                byId: membersById,
                byServerId: membersByServerId
            }
        }
        case REMOVE_MEMBER: {
            const { serverId, memberId } = action.payload;

            const remainingMembersById = { ...state.byId };
            delete remainingMembersById[memberId];

            const remainingMembersByServerId = state.byServerId[serverId].filter((member) => {
                return member.id !== memberId
            });

            return {
                byId: remainingMembersById,
                byServerId: { ...state.byServerId, [serverId]: remainingMembersByServerId }
            }
        }
        default: {
            return state;
        }
    }
};

export default membersReducer;