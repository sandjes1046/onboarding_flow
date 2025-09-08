import { fetchUser, fetchStep, saveUserStep, setStep } from '../models/userSlice';

export const getUser = ({ email, password, navigateLogin = null, navigateWizard = null }) => async (dispatch) => {
  const resultAction = await dispatch(fetchUser({ email, password }));

  if (fetchUser.fulfilled.match(resultAction)) {
    const userData = resultAction.payload;
    if (userData.complete && navigateLogin) {
      navigateLogin();
    } else if (navigateWizard) {
      navigateWizard();
    }
  }
};

export const getStep = ({ email, step }) => async (dispatch) => {
  await dispatch(fetchStep({ email, step }));
};

export const saveUser = ({ email, step, answers, complete = false, navigateLogin }) => async (dispatch) => {
  await dispatch(saveUserStep({ email, step, answers,complete }));
  dispatch(setStep({ email, step, answers, complete }));

  if (complete && navigateLogin) navigateLogin();
};
