import {fetchAdmin,saveAdminFields} from '../models/adminSlice'


export const getAdmin = () => async (dispatch) => {
  await dispatch(fetchAdmin());
};

export const saveAdmin = ({fields}) => async (dispatch) => {
  await dispatch(saveAdminFields({fields}));

};
