
import { createSelector } from "reselect";

const getServersById = (state) => state.servers.byId;
const getAllServerIds = (state) => state.servers.allIds;

export const getServers = createSelector(
    [getServersById, getAllServerIds],
    (byId, allIds) => {
        return allIds.map((id) => byId[id]);
    }
);