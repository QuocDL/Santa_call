// action types
import {
  FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_LOGOUT_SUCCESS,
  UPDATE_USER_AVATAR,
} from "../action/userAction";

// trạng thái ban đầu
const INITIAL_STATE = {
  account: {
    id_user: "",
    link_avatar: "",
    user_name: "",
    birthday: "",
    gender: "",
    address: "",
    phone: "",
    ip_register: "",
    device_register: "",
    email: "",
    count_sukien: "",
    count_comment: "",
    count_view: "",
    token: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          ...action?.payload,
        },
        isAuthenticated: true,
      };

    case FETCH_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          id_user: "",
          link_avatar: "",
          user_name: "",
          birthday: "",
          gender: "",
          address: "",
          phone: "",
          ip_register: "",
          device_register: "",
          email: "",
          count_sukien: "",
          count_comment: "",
          count_view: "",
          token: "",
        },
        isAuthenticated: false,
      };

    case UPDATE_USER_AVATAR:
      return {
        ...state,
        account: {
          ...state.account,
          link_avatar: action?.payload,
        },
      };

    default:
      return state; // Trả về trạng thái hiện tại nếu không có action nào khớp
  }
};

export default userReducer;
