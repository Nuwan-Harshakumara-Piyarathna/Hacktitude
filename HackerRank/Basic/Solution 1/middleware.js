module.exports = (req, res, next) => {
  const params = req.query;
  const createdContext = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 3,
    searchTerm: params.q,
  };
  createdContext.skip = (createdContext.page - 1) * createdContext.limit;
  createdContext.search = new RegExp(`${createdContext.searchTerm}`, "gi");
  req.context = createdContext;
  //   console.log("middleware context = ", req.context);
  next();
};
