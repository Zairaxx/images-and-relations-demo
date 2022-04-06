module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '181f82d09b73366455ca1da63d7e6e00'),
  },
});
