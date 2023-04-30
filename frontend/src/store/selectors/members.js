import { createSelector} from "reselect";

const getMembersById = (state) => state.members.byId;
const getMembersByServerId = (state) => state.members.byServerId;
const getServerId = (_, serverId) => serverId;

export const getMembersByServer = createSelector(
    [getMembersById, getMembersByServerId, getServerId],
    (byId, byServerId, serverId) => {
        const memberIds = byServerId[serverId] || [];
        return memberIds.map((id) => byId[id])
    }
);