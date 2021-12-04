import { keycloak } from '@/keycloak';
import { createStore, ActionContext } from 'vuex'
import { PostDto, CreateProfileDto, ProfileDto, _Api, PostCreateDto } from '../api'
import { FormStateReg, FormStatePost } from "./models";

interface User {
  nickname: string,
  status?: string,
}

interface CurrentUser extends User {
  userId?: string
}
interface State {
  user: User | null,
  currentUser: CurrentUser | null,
  userId?: string,
  authorized: boolean,
  posts: PostDto[]
}

function currentUserMutation(state: State, user: CurrentUser) {
  state.currentUser = user;
}

function updatePostsMutation(state: State, posts: PostDto[]) {
  state.posts = posts
}

async function updatePostsAction(ctx: ActionContext<State, State>) {

  const posts = await new _Api().getUsingGET();
  ctx.commit('updatePostsMutation', posts);
}

function profileMutation(state: State, profile: ProfileDto) {
  state.user = {
    nickname: profile.nickname,
    status: profile.status
  }
}

async function fetchOtherProfileInfo(ctx: ActionContext<State, State>, id: string) {
  const api = new _Api()
  const profile = await api.getUsingGET1(id);
  ctx.commit("currentUserMutation", {
    userId: profile.ownerName,
    nickname: profile.nickname,
    status: profile.status
  } as CurrentUser)
}

async function fetchProfileInfo(ctx: ActionContext<State, State>) {
  if (keycloak.token) {
    const api = new _Api({accessToken: keycloak.token!})
    const profile = await api.getUsingGET2();
    ctx.commit("profileMutation", profile)
  }
  else {
    throw new Error("Unauthorized")
  }
}

async function register(ctx: ActionContext<State, State>, data: FormStateReg) {

  const dto: CreateProfileDto = {
    nickname: data.username,
    password: data.password
  }
  await new _Api().registerUsingPOST(dto);
  keycloak.login()

}

async function post(ctx: ActionContext<State, State>, data: FormStatePost) {

  if (keycloak.token) {
    const dto = {
      title: data.title,
      text: data.text,
      image: data.image
    } as PostCreateDto
    await new _Api({accessToken: keycloak.token!}).createUsingPOST(dto);
    ctx.dispatch("updatePostsAction")
  }
  else {
    throw new Error("Unauthorized")
  }
}

export default createStore({
  state: {
    user: null,
    authorized: false,
    posts: [] as PostDto[]
  } as State,
  mutations: {
    updatePostsMutation,
    profileMutation,
    currentUserMutation
  },
  actions: {
    register,
    updatePostsAction,
    post,
    fetchProfileInfo,
    fetchOtherProfileInfo
  },
  modules: {
  }
})
