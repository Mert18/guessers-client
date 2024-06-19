
export const betSlipStatusMapper = (status) => {
    switch (status) {
        case "IN_PROGRESS":
            return "inProgress";
        case "WON":
            return "won";
        case "LOST":
            return "lost";
        case "CANCELLED":
            return "cancelled";
        default:
            return "unknown";
    }
}