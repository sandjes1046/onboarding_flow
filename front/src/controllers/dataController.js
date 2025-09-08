import {fetchData} from '../models/dataSlice'


export const getData = () => async (dispatch) => {
  await dispatch(fetchData());
};

