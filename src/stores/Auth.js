import { defineStore } from "pinia";

export const useAuthStore = defineStore("Auth", {
    state: () => ({
        token: localStorage.getItem("token"),
    }),

    getters: {
        USER_DATA(state) {
            if (state.token) {
                const base64Url = state.token ? state.token.split(".")[1] : " ";
                const base64 = base64Url
                    ? base64Url.replace(/-/g, "+").replace(/_/g, "/")
                    : "";
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split("")
                        .map(function (c) {
                            return (
                                "%" +
                                ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                            );
                        })
                        .join("")
                );
                return JSON.parse(jsonPayload);
            } else {
                return {
                    id: "",
                    name: "",
                    role: "",
                };
            }
        },
        USER_ID() {
            return this.USER_DATA.ID;
        },
        USER_NAME() {
            return this.USER_DATA.Name;
        },
        USER_ROLE() {
            const Role = this.USER_DATA?.Role;
            if (Role) {
                const RoleNameLists = [];
                Role.map((item) => {
                    RoleNameLists.push(item.Name);
                });
                return RoleNameLists.join(", ");
            }
        },
        USER_BRANCH() {
            return this.USER_DATA.BranchID;
        },
    },

    actions: {},
});
