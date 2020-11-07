/**
 * action types
 */
export const SET_CARGANDO = 'SET_CARGANDO';

/*
 * action creators
 */
export function setCargando(cargando) {
  return { type: SET_CARGANDO, payload: cargando };
}
