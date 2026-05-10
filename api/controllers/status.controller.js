const getStatus = (req, res) => {
  return res.status(200).json({
    ok: true,
  });
};

module.exports = { getStatus };
