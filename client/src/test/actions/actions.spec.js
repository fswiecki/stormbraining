// import expect from 'expect'
// //import * as actions from '../actions/index.js'
// //import * as types from '../../constants/ActionTypes'

// describe('actions', () => {
//   it('should create an action to add a todo', () => {
//     const text = 'Finish docs'
//     const expectedAction = {
//       type: types.ADD_TODO,
//       text
//     }
//     expect(actions.addTodo(text)).toEqual(expectedAction)
//   })
// })


// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import * as actions from '../../actions/counter'
// import * as types from '../../constants/ActionTypes'
// import nock from 'nock'
// import expect from 'expect'; // You can use any testing library

// const middlewares = [ thunk ]
// const mockStore = configureMockStore(middlewares)

// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll()
//   })

//   it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
//     nock('http://example.com/')
//       .get('/todos')
//       .reply(200, { body: { todos: ['do something'] }})

//     const expectedActions = [
//       { type: types.FETCH_TODOS_REQUEST },
//       { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
//     ]
//     const store = mockStore({ todos: [] })

//     return store.dispatch(actions.fetchTodos())
//       .then(() => { // return of async actions
//         expect(store.getActions()).toEqual(expectedActions)
//       })
//   })
// })