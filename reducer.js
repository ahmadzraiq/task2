import {AsyncStorage} from 'react-native';
export default function reducer(state, action) {
  switch (action.type) {
    case 'addProject': {
      let newProject = [
        ...state,
        {
          id: new Date().getTime(),
          title: action.payload.title,
          desc: action.payload.desc,
          tasks: [],
        },
      ];
      AsyncStorage.setItem('state', JSON.stringify(newProject));
      return newProject;
    }
    case 'setState': {
      return [...action.payload];
    }
    case 'addTask': {
      const getProjectIndex = state.findIndex((p) => p.id == action.payload.id);
      const getProject = state.find((p) => p.id == action.payload.id);
      state.splice(getProjectIndex, 1);
      getProject.tasks.push({
        id: new Date().getTime(),
        title: action.payload.title,
        desc: action.payload.desc,
        date: action.payload.date,
        checked: false,
      });
      state.push(getProject);
      AsyncStorage.setItem('state', JSON.stringify(state));

      return [...state];
    }
    case 'deleteProject': {
      const newProjects = state.filter((p) => p.id != action.payload.id);
      AsyncStorage.setItem('state', JSON.stringify(newProjects));
      return [...newProjects];
    }

    case 'editProject': {
      const getProject = state.find((p) => p.id == action.payload.id);
      state.splice(getProject, 1);
      state.push(action.payload.project);
      AsyncStorage.setItem('state', JSON.stringify(state));

      return [...state];
    }
    case 'deleteTask': {
      const getProject = state.find((p) => p.id == action.payload.projectId);
      const getProjectIndex = state.findIndex(
        (p) => p.id == action.payload.projectId,
      );
      state.splice(getProjectIndex, 1);
      const getNewTask = getProject.tasks.filter(
        (t) => t.id != action.payload.id,
      );
      getProject.tasks = getNewTask;
      state.splice(getProjectIndex,0,getProject);
      AsyncStorage.setItem('state', JSON.stringify(state));

      return [...state];
    }

    case 'editTask': {
      const getProject = state.find((p) => p.id == action.payload.projectId);
      state.splice(getProject, 1);
      const getTask = getProject.tasks.find((t) => t.id == action.payload.id);
      getProject.tasks.splice(getTask, 1);
      getProject.tasks.push(action.payload.task);
      state.push(getProject);
      AsyncStorage.setItem('state', JSON.stringify(state));

      return [...state];
    }
    case 'changeCheckBox': {
      const getProject = state.find((p) => p.id == action.payload.projectId);
      const getProjectIndex = state.findIndex(
        (p) => p.id == action.payload.projectId,
      );
      state.splice(getProjectIndex, 1);
      const getTask = getProject.tasks.find(
        (t) => t.id == action.payload.taskId,
      );
      const getTaskIndex = getProject.tasks.findIndex(
        (t) => t.id == action.payload.taskId,
      );
      getProject.tasks.splice(getTaskIndex, 1);
      getTask.checked = action.payload.value;
      getProject.tasks.splice(getTaskIndex, 0, getTask);
      state.splice(getProjectIndex, 0, getProject);
      AsyncStorage.setItem('state', JSON.stringify(state));

      return [...state];
    }
    default: {
      return state;
    }
  }
}
