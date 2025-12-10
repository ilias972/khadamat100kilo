"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["CLIENT"] = "CLIENT";
    Role["PRO"] = "PRO";
    Role["ADMIN"] = "ADMIN";
    Role["MODERATOR"] = "MODERATOR";
})(Role || (exports.Role = Role = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["QUOTED"] = "quoted";
    BookingStatus["ACCEPTED"] = "accepted";
    BookingStatus["SCHEDULED"] = "scheduled";
    BookingStatus["IN_PROGRESS"] = "in_progress";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["DISPUTED"] = "disputed";
    BookingStatus["CANCELLED"] = "cancelled";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
//# sourceMappingURL=api.js.map