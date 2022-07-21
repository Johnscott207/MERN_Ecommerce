import { createGlobalState } from 'react-hooks-global-state';

const initialState = { login: false, username: undefined, email: undefined, id: null };
const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;