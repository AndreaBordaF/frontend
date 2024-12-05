import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../../services/types/project';

interface ProjectsState {
  projectID: number;
  viewedProjects: Project[];
}

const initialState: ProjectsState = {
  projectID: 0,
  viewedProjects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectID(state, action: PayloadAction<number>) {
      state.projectID = action.payload;
    },

    addViewedProject(state, action: PayloadAction<Project>) {
      const projectExists = state.viewedProjects.some(
        (project) => project.id === action.payload.id
      );

      if (!projectExists) {
        state.viewedProjects = [action.payload, ...state.viewedProjects]
          .slice(0, 5);
      }
    },
  },
});

export const { setProjectID, addViewedProject } = projectSlice.actions;
export default projectSlice.reducer;
