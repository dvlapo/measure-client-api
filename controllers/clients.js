const Client = require('../models/Clients');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllClients = async (req, res) => {
  const clients = await Client.find({ createdBy: req.user.userID }).sort(
    '-createdAt'
  );
  res.status(StatusCodes.OK).json({ clients, count: clients.length });
};

const getClient = async (req, res) => {
  const {
    user: { userID },
    params: { id: clientID },
  } = req;

  const client = await Client.findOne({
    _id: clientID,
    createdBy: userID,
  });

  if (!client) {
    throw new NotFoundError(`No client with id ${clientID}`);
  }

  res.status(StatusCodes.OK).json({ client });
};

const createClient = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const client = await Client.create(req.body);
  res.status(StatusCodes.CREATED).json({ client });
};

const updateClient = async (req, res) => {
  const {
    user: { userID },
    params: { id: clientID },
  } = req;

  const client = await Client.findByIdAndUpdate(
    { _id: clientID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );

  if (!client) {
    throw new NotFoundError(`No client with id ${clientID}`);
  }

  res.status(StatusCodes.OK).json({ client });
};

const deleteClient = async (req, res) => {
  const {
    user: { userID },
    params: { id: clientID },
  } = req;

  const client = await Client.findOneAndRemove({
    _id: clientID,
    createdBy: userID,
  });

  if (!client) {
    throw new NotFoundError(`No client with id ${clientID}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
