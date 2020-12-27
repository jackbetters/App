import { setCookie, getCookie, removeCookie } from '@/utils/cookie';
import { setSession, getSession, removeSession } from '@/utils/sessionStore';
import { login } from '@/api/user';
import { getToken, getUserInfo, refreshToken } from '@/plugins/sdk';

const state = {
  tokenX: getCookie('tokenX') || '',
  userVo: getSession('userVo') || null,
};

const getters = {
  getTokenX: state => state.tokenX,
  getUserVo: state => state.userVo,
};

const mutations = {
  setTokenX(state, token) {
    state.tokenX = token;
    setCookie('tokenX', token);
  },
  setUserVo(state, userVo) {
    state.userVo = userVo;
    setSession('userVo', userVo);
  },
  removeTokenX(state) {
    state.tokenX = '';
    removeCookie('tokenX');
  },
  removeUserVo(state) {
    state.userVo = null;
    removeSession('userVo');
  },
};

const actions = {
  // 获取授权及用户信息
  async getAuth({ commit }, { isH5 = false, userName = '', password = '' } = {}) {
    const preMsg = isH5 ? '客户端授权' : '登录接口';
    try {
      console.info('正在获取授权及用户信息...');
      const { accessToken, userVo } = isH5
        ? { accessToken: await getToken(), userVo: await getUserInfo() }
        : await login({ userName, password });
      commit('setTokenX', accessToken);
      commit('setUserVo', userVo);
      return { status: 1, message: `${preMsg}调用成功...` };
    } catch (err) {
      const message = `${preMsg}调用失败...`;
      console.info(message);
      console.error(err);
      return { status: 0, message };
    }
  },

  // 刷新授权及用户信息
  async reflushAuth({ commit }, { isH5 = false, userName = '', password = '' } = {}) {
    const preMsg = isH5 ? '客户端授权' : '登录接口';
    try {
      console.info('正在刷新授权及用户信息...');
      const { accessToken, userVo } = isH5
        ? { accessToken: await refreshToken(), userVo: await getUserInfo() }
        : await login({ userName, password });
      commit('setTokenX', accessToken);
      commit('setUserVo', userVo);
      return { status: 1, message: `${preMsg}调用成功...` };
    } catch (err) {
      const message = `${preMsg}调用失败...`;
      console.info(message);
      console.error(err);
      return { status: 0, message };
    }
  },

  // 清楚授权及用户信息
  clearAuth({ commit }) {
    commit('removeTokenX');
    commit('removeUserVo');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
