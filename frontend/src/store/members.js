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
// TODO get double renders of members fixed. Check other states for the same issue

const membersReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case GET_MEMBERS: {
            const { members } = action.payload;
            const serverId = members[0].serverId;

            const membersById = members.reduce((acc, member) => {
                acc[member.id] = member;
                return acc;
            }, {});

            const byServerId = { ...state.byServerId };
            members.forEach((member) => {
                if (!byServerId[member.serverId]) {
                    byServerId[member.serverId] = [];
                }
                byServerId[member.serverId].push(member.id)
            });

            return {
                byId: { ...state.byId, ...membersById },
                byServerId
            }
        }
        case REMOVE_MEMBER: {
            const { serverId, memberId } = action.payload;
            const member = state.byId[memberId]

            const remainingMembersById = { ...state.byId };
            delete remainingMembersById[memberId];

            const remainingMembersByServerId = {
                ...state.byServerId,
                [serverId]: state.byServerId[serverId].filter(
                    (id) => id !== memberId
                )
            };

            return {
                byId: remainingMembersById,
                byServerId: remainingMembersByServerId
            }
        }
        default: {
            return state;
        }
    }
};

export default membersReducer;