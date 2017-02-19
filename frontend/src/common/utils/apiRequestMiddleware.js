export default () => next => (action) => {
  if (!action.promise) {
    return next(action);
  }

  function makeAction(status, data) {
    const newAction = { ...action, ...{ type: `${action.type}_${status}` }, ...data };
    delete newAction.promise;
    return newAction;
  }

  next(makeAction('REQUEST'));
  return action.promise.then(
    (response) => {
      if (response.ok) {
        return response.json().then(
          json => next(makeAction('SUCCESS', { response, json })),
          () => next(makeAction('SUCCESS', { response }))
        );
      }

      return response.json().then(
        json => next(makeAction('FAILURE', { response, json })),
        () => next(makeAction('FAILURE', { response }))
      );
    },
    error => {
      next(makeAction('ERROR', { error }));
      console.error(error);
    }
  );
};
