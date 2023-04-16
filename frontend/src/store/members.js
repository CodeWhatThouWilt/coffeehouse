import { csrfFetch } from "./csrf";
const GET_MEMBERS = "servers/getMembers";
const REMOVE_MEMBER = "servers/removeMember";


const getMembers = (members, serverId) => {
	return {
		type: GET_MEMBERS,
		payload: { members, serverId },
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
		dispatch(getMembers(members, serverId));
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
    byServerId: {},
    // byUserId: {}
}
// TODO get double renders of members fixed. Check other states for the same issue

const membersReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case GET_MEMBERS: {
            const { members, serverId } = action.payload;

            const membersById = members.reduce((acc, member) => {
                acc[member.id] = member;
                return acc;
            }, {});

            // const membersByUserId = members.reduce((acc, member) => {
            //     acc[member.userId] = member
            //     return acc;
            // }, {});

            const byServerId = members.map((member) => {
                return member.id;
            });

            return {
                byId: { ...state.byId, ...membersById },
                byServerId: { ...state.byServerId, [serverId]: byServerId},
                // byUserId: { ...state.byUserId, ...membersByUserId }
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